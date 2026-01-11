const token = process.env.GITHUB_AUTH_TOKEN;

const fetchGithub=async ()=>{
    const to = new Date();
    const from = new Date();
    from.setFullYear(from.getFullYear() - 1);
    const response = await fetch('https://api.github.com/graphql',{
        method:'POST',
        headers: {
            "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            query: `
                query {
                    viewer {
                        contributionsCollection(
                            from: "${from.toISOString()}"
                            to: "${to.toISOString()}"
                        ) {
                        contributionCalendar {
                            weeks {
                                    contributionDays {
                                        date
                                        contributionCount
                                    }
                                }
                            }
                        }
                    }
                }
            `
        })
    })
    const data = await response.json();
    return data;
}

export const getGithubActivity = async(map: Map<string, number>)=>{
    const data = await fetchGithub();
    const weeks = data.viewer.contributionsCollection.contributionCalendar.weeks;
    for (const week of weeks) {
        for (const day of week.contributionDays) {
            const key = day.date; // already "YYYY-MM-DD" as that's how github returns it.
            const count = day.contributionCount;
            map.set(key, (map.get(key) ?? 0) + count);
        }
    }
}