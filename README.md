# notes

the endpoints were made to follow UTC date format. 
well but upon some considerations such as the purpose of activity calendar is to understand how active the 
user was in there local time more than it is to know exactly the moment of date in which the user was 
active. and also the reason that calendarApi does not provide datetime so no way to confirm the bucket of 
the data.

so It should be the local date Time of the user be it github or codeforces. 

since codeforces only uses UTC you can easily convert it to your local Time bucket.
while github just gives it to you.



# todos
1) update cors policy after hosting frontend.


# important
check the type of coding activity required by the frontend.
(thinking of making it just date and count arrays and let the frontend decide on the levels. 
otherwise if incase in the future I decide to change I would have to change in both repos.)

# purpose
act as a middleman for portfolio frontend.
1) Mails me the lets connect messages.
2) Fetch and aggregate coding activity


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
people want to see what you were doing since one year... do they have to do it from the same date previous
year? perhaps yes. but mostly no.
so starting from 364 days does sound correct but then it will be easier to notice.
and the method that will require the least code without wasting the api resources will be ostrich method and just rely on coddforces activity for that boundary case.

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