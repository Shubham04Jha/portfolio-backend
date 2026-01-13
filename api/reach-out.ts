import type { VercelRequest, VercelResponse } from "@vercel/node";
import { EmailBody } from "../src/types.js";
import sendMail from "../src/reachOut/main.js";

export default async function handler(req:VercelRequest, res:VercelResponse){
    const parsedResult = EmailBody.safeParse(req.body);
    if(!parsedResult.success){
        return res.status(400).json({error: parsedResult.error.message});
    }
    try {
        await sendMail(parsedResult.data);
        return res.status(200).json({message: 'success'});
    } catch (error) {
        if(error instanceof Error) return res.status(500).json({error: error.message??'Error Occurred'});
        return res.status(500).json({error: "Unexpected Error!"});
    }
}