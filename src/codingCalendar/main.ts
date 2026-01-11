import { getCodeForcesActivity } from "./getCodeforces.js";
import { getGithubActivity } from "./getGithub.js";

const getData = (map: Map<string, number>)=>{
    const data: {date: string,count: number}[] = [];
    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata"
    });

    const d = new Date();
    const todayKey = formatter.format(d);
    d.setFullYear(d.getFullYear() - 1);
    const prevYearKey = formatter.format(d);

    map.set(todayKey,map.get(todayKey)??0);
    map.set(prevYearKey,map.get(prevYearKey)??0);

    for(const [date,count] of map){
        if(prevYearKey.localeCompare(date)<=0) data.push({
            date: date,
            count: count,
        })
    }
    data.sort((a,b)=>a.date.localeCompare(b.date));
    return data;
}



const main = async ()=>{
    const map = new Map<string, number>();
    await getCodeForcesActivity(map);
    await getGithubActivity(map);
    return getData(map);
}
export default main;