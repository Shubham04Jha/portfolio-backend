import type { VercelRequest, VercelResponse } from "@vercel/node";
import main from "../src/codingCalendar/main.js";

// let globalInFlightPromise: Promise<any>|null = null; // keeping this just for example sake. request coalescing

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // if(globalInFlightPromise){
    //     const data = await globalInFlightPromise;
    //     // res.setHeader("Cache-Control","Public, s-maxage=100, stale-while-revalidate=10");
    //     return res.status(200).json({data});
    // }
    // globalInFlightPromise = (async () => {
    //     const data = await main();   // GitHub + Codeforces calls
    //     return data;
    // })();
    try{
        // const data = await globalInFlightPromise;
        const data = await main();
        // res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=10");
        res.status(200).json({data});
    }catch(err){
        res.status(500).json({error: "Failed to compute activity"});
    }finally{
        // globalInFlightPromise=null;
    }
}
