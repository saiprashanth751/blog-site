import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { sign } from "hono/jwt"
import { signInBody, signUpBody } from "@saiprashanth7/medium-common"


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWTSECRET: string
    }
}>()

userRouter.post('/signup', async (c) => {

    const body = await c.req.json()
    const { success } = signUpBody.safeParse(body)
    if (!success) {
        c.status(403)
        return c.json({
            message: "Invalid inputs"
        })
    }

    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.create({
            //check what to do later                      

            data: {
                email: body.email,
                password: body.password,
                name: body.name,
            }
        })
        const token = await sign({ id: user.id }, c.env.JWTSECRET)

        return c.json({
            jwt_token: token
        })


    } catch (e) {
        console.log(e)
        c.status(403)
        c.json({
            message: "User Creation Failed"
        })
    }
    // sign({payload},"secret")

})

userRouter.post('/signin', async (c) => {
    const body = await c.req.json()
    const { success } = signInBody.safeParse(body)
    if (!success) {
        c.status(403)
        return c.json({
            message: "Invalid inputs"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        })

        if (!user) {
            c.status(403)
            return c.json({
                message: "Invalid User",
            })
        }

        const token = await sign({ id: user.id }, c.env.JWTSECRET)

        return c.json({
            jwt_token: token
        })

    } catch (e) {
        console.log(e)
        c.status(411)
        c.json({
            message: "Cannot Find User"
        })
    }
})