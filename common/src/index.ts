import  z  from "zod";

export const signUpBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string()
})

export type SignUpBody = z.infer<typeof signUpBody>

export const signInBody = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export type SigninBody = z.infer<typeof signInBody>

export const createPostBody = z.object({
    title: z.string(),
    content: z.string(),
    authorId: z.string()
})

export type CreatePostBody = z.infer<typeof createPostBody>

export const updatePostBody = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
})

export type UpdatePostBody = z.infer<typeof updatePostBody> 