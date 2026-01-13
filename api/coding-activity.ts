import type { VercelRequest, VercelResponse } from "@vercel/node";
import main from "../src/codingCalendar/main.js";

// let globalInFlightPromise: Promise<any>|null = null; // keeping this just for example sake. request coalescing

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try{
        // if (req.method === 'OPTIONS') return res.status(204).end();
        const data = await main();
        res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=10");
        res.status(200).json({data});
    }catch(err){
        res.status(500).json({error: "Failed to compute activity"});
    }
}
