import { formatter } from "./utils/localeDateFormatter.js";

const calendarQuery = `
query userProfileCalendar($username: String!,$year: Int){
    matchedUser(username: $username) {
        userCalendar(year: $year) {
            activeYears
            submissionCalendar
        }
    }
}
`;

interface LeetCodeData {
    activeYears: number[], 
    submissionCalendar: string
}

const getLeetcodeData = async (username: string, year?: number): Promise<LeetCodeData> =>{
    const response = await fetch('https://leetcode.com/graphql',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: calendarQuery,
            variables: year ? { username, year } : { username }
        }),
    });
    return (await response.json()).data.matchedUser.userCalendar;
}

export const getLeetcodeActivity = async (all=false, map: Map<string,number>)=>{
    const username = process.env.LEETCODE_USERNAME!
    const response =  await getLeetcodeData(username);
    const years = response.activeYears;
    if(all){
        for(const year of years){
            const yearResponse = await getLeetcodeData(username, year)
            const raw = yearResponse.submissionCalendar;
            const activity = JSON.parse(raw);
            aggregate(activity,map)
        }
    }else{
        const raw = response.submissionCalendar;
        const activity = JSON.parse(raw);
        aggregate(activity,map);
    }
}

const aggregate = (submissionData: Record<string,number>,map: Map<string,number>)=>{
    Object.entries(submissionData).forEach(([timeStamp,count])=>{
        const key = formatter.format(new Date(parseInt(timeStamp)*1000));
        map.set(key,(map.get(key)??0)+count);
    })
}