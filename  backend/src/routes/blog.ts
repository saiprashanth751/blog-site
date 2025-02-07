import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createPostBody, updatePostBody } from "@saiprashanth7/medium-common";

export const bookRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWTSECRET: string
    },
    Variables: {
        userId: string
    }
}>()

bookRouter.use("/*", async (c, next) => {

    const authHeader = c.req.header("authorization")
    const token = authHeader?.split(" ")[1];

    if(!token){
        c.status(403)
        return c.json({
            message: "Invalid User"
        })
    }

    const payload = await verify(token, c.env.JWTSECRET) as {id: string}
    
    if(!payload){ 
        c.status(403)
        return c.json({
            message: "Invalid User"
        })
    }

    // check what to do later
    c.set("userId", payload.id)
    
    await next()
    
})

bookRouter.post("/", async (c) => {
    
    const body = await c.req.json()
        // const { success } = createPostBody.safeParse(body)
        // if (!success) {
        //     c.status(403)
        //     return c.json({
        //         message: "Invalid inputs"
        //     })
        // }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const authorId = c.get("userId")
    
    const post = await prisma.post.create({
        //check what to do later
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })
    return c.json({
        id: post.id
    })
})

bookRouter.put("/", async (c) => {
    // const userId = c.get("userId")
    const body = await c.req.json()
        const { success } = updatePostBody.safeParse(body)
        if (!success) {
            c.status(403)
            return c.json({
                message: "Invalid inputs"
            })
        }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    
    const post = await prisma.post.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.json({
        message: "Post Updated",
        id: post.id
    })
})

bookRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })

    c.status(200)
    return c.json({
        posts
    })
})


bookRouter.get("/:id", async (c) => {
    const id = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const post = await prisma.post.findFirst({
        where: {
            id: id
        },
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })

    return c.json({
        post
    })
})