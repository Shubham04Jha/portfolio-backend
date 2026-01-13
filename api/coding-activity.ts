import type { VercelRequest, VercelResponse } from "@vercel/node";
import main from "../src/codingCalendar/main.js";

let cachedData:{date: string, count: number}[]|null = null;
let cachedAt = 0;
const CACHE_TTL = 60 * 60 * 1000;

let globalInFlightPromise: Promise<any>|null = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const reqVerificationHeader = req.headers['verification-header'];
    if(!reqVerificationHeader||reqVerificationHeader!=process.env.VERIFICATION_HEADER){
        return res.status(401).json({message:"invalid request"});
    }
    const now = Date.now();
    if (cachedData && now - cachedAt < CACHE_TTL) {
        return res.status(200).json({data: cachedData});
    }
    if(globalInFlightPromise){
        const data = await globalInFlightPromise;
        return res.status(200).json({data});
    }
    globalInFlightPromise = (async () => {
        const data = await main();   // GitHub + Codeforces calls
        cachedData = data;
        cachedAt = Date.now();
        return data;
    })();
    try{
        const data = await globalInFlightPromise;
        res.status(200).json({data});
    }catch(err){
        res.status(500).json({error: "Failed to compute activity"});
    }finally{
        globalInFlightPromise=null;
    }
}
