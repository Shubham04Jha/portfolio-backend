### CDN Caching Verification

<table>
  <tr>
    <td align="center">
      <strong>Serverless Function Invocation: 40</strong><br/>
      <img width="630" height="418" src="https://github.com/user-attachments/assets/bb7ccf25-53bd-4f09-b3ba-2d231a6ddd39" />
    </td>
    <td align="center">
      <strong>Serverless Function Invocations: 40</strong><br/>
      <img width="599" height="390" alt="image" src="https://github.com/user-attachments/assets/5857c317-0c99-42da-bb7b-1ff59c7ca7ec" />
    </td>
  </tr>
</table>

**Observation:**  
Function invocations are significantly lower than edge responses because the CDN caches the response for 30 minutes. During this window, the serverless function and the external API are invoked only once, while subsequent requests are served directly from the edge cache.


putting this header in response header: "Cache-Control: public, s-maxage=1800, stale-while-revalidate=10"

Behavior:

The first request within a 30-minute window invokes the Serverless Function.
The function calls the external API exactly once.
The response is cached at the Vercel CDN (edge).
All subsequent requests during the next 30 minutes are served directly from the edge cache.
The origin function is not re-invoked during this period.
After TTL expiry, a single revalidation request refreshes the cache.

Impact:
Layer	Calls per 30 min window, 
Browser Requests	N, 
Vercel Edge Responses	N, 
Serverless Function Invocations	1, 
External API Calls	1


# notes

the endpoints were made to follow UTC date format. 
well but upon some considerations such as the purpose of activity calendar is to understand how active the 
user was in there local time more than it is to know exactly the moment of date in which the user was 
active. and also the reason that calendarApi does not provide datetime so no way to confirm the bucket of 
the data.

so It should be the local date Time of the user be it github or codeforces. 

since codeforces only uses UTC you can easily convert it to your local Time bucket.
while github just gives it to you.





# purpose
act as a middleman for portfolio frontend.
1) Mails me the lets connect messages.
2) Fetch and aggregate coding activity




# todos


# done
1) update cors policy after hosting frontend. (not needed)
2) cache response. (once per 30 mins should be fine ig. if I get the continuous traffic then I might consider reducing it) (done)
3) secret-header key not working... I mean it works when /api is between but why was I able to access earlier? (XXX)
4) Reach-out api. (done)
# important
check the type of coding activity required by the frontend.
(thinking of making it just date and count arrays and let the frontend decide on the levels. 
otherwise if incase in the future I decide to change I would have to change in both repos.) (done)



# observations
so yea 53 weeks at max 
and they might have a validator which checks if the days exceed perhaps 370ish days...
so in normal case 53 weeks gets you from say 2025 jan 10 (fri) to 2026 jan 10 (sat) (by 53 weeks I mean 53 
week object of the graphql... like 52 to take you 2-3 days back from today and the last one to consider any 
offsets but case where:
2025 jan 10 to 2026 jan 10 already took 53 week objects where only fri and sat was use of the first week 
but now jan 11 2026 will cause one more week object to come. which will shift the previous window
so what's the solution? this can also arise in leap year even more...
like I might consider lets forget previous year same date lets go +1 but due to leap year same condition 
can apply so only way to do this is 
1) take 2 days off
2) dont take days off just query twice ones with a range of start - 7days to start
but if its just start the days between the new start due to week limit and the start may be lost.
if I take a bit more offset then there is a potential of overcounting...
or what if I make sure that my first query always stays within 364 or 360 say for safety and then other 
query from start to the new start?
3) or dont do anything... like what's the worst that can happen 
10jan2026 someone sees oh 8 activity on 10jan2025 and on 11jan2026 github ones disappears... making it say 4


considerations...
1) people want to see what you were doing since one year... do they have to do it from the same date 
previous
year? perhaps yes. but mostly no.
so starting from 364 days does sound correct but then it will be easier to notice.
and the method that will require the least code without wasting the api resources will be ostrich method and just rely on coddforces activity for that boundary case.

2) some basic form of rate limiting| caching| secret-header is required. 

Used Github's GraphQL api.

search type User (cause query has viewer of type User)

in there there is:

"""
The collection of contributions this user has made to different repositories.
"""
 contributionsCollection(
    """
    Only contributions made at this time or later will be counted. If omitted, defaults to a year ago.
    """
    from: DateTime

    """
    The ID of the organization used to filter contributions.
    """
    organizationID: ID

    """
    Only contributions made before and up to (including) this time will be
    counted. If omitted, defaults to the current time or one year from the
    provided from argument.
    """
    to: DateTime
  ): ContributionsCollection!
  then ContributionCollection had contributionCalendar in which there was weeks in which contributionDays in which date and count. we needed date and count;
