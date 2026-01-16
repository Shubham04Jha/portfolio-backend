import { formatter } from "./utils/localeDateFormatter.js";

const getCodeForcesSubmissions = async ()=>{
    const API = `https://codeforces.com/api/user.status?handle=${process.env.CODEFORCES_HANDLE||''}`
    const res = await (await fetch(API)).json();
    if(!res||res.status!=='OK'){
        throw new Error(res.comment??'Unknown error');
    }
    return res.result;
}

const aggregate = (submissions: {creationTimeSeconds: number}[],map: Map<string,number>)=>{
    for(const s of submissions){
        const key = formatter.format(new Date(s.creationTimeSeconds * 1000));
        map.set(key,(map.get(key)??0)+1);
    }
}

export const getCodeForcesActivity = async (map: Map<string,number>)=>{
    const submissions = await getCodeForcesSubmissions();
    aggregate(submissions, map);
}