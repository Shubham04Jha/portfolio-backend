import type { VercelRequest, VercelResponse } from "@vercel/node";
import { EmailBody } from "../src/types.js";
import sendMail from "../src/reachOut/main.js";

export default async function handler(req:VercelRequest, res:VercelResponse){
    if (req.method === 'OPTIONS') return res.status(204).end();
    const parsedResult = EmailBody.safeParse(req.body);
    if(!parsedResult.success){
        console.log('errorObject: ',parsedResult.error);
        return res.status(400).json({error: parsedResult.error.message,type:'parseError'});
    }
    try {
        await sendMail(parsedResult.data);
        return res.status(200).json({message: 'success'});
    } catch (error) {
        console.log('error caught');
        console.log(error);
        if(error instanceof Error) return res.status(500).json({errorMessage: error.message??'Error Occurred'});
        return res.status(500).json({errorMessage: "Unexpected Error!"});
    }
}