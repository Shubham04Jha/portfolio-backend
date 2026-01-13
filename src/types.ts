import * as z from 'zod';


export const EmailBody = z.object({
    email: z.email(),
    message: z.string(),
})
