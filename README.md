# Applifting Blog Engine fullstack exercise

You should be able to run server part from docker, but client part was not as successful as server. Please run client with `npm run dev` in client folder.

Database is seeded with two users

|username|password|
| ------------ | ------------ |
|admin|admin|
|public|public|

Some api routes (as well as client routes) are available only for user with admin role.
Authentification is JWT based with access and refresh tokens.

Voting system is not implemented, because of time. In case of having more time I would implement it this way:

- connect to ws on page load
- have handler that emit an event with necessary things like ip address, commentId
- handle saving of ip in database (check if combination of ip/commentId is already present in db)
- in case of new vote emit event, which sends back to all clients current state of votes for particular comment (user giving the vote would not see this as the change will be optimistic)

I tried to implement swagger, but it is kinda not working as it should.

Unfortunately, I was not able to provide any tests, as it did not work as I expected (unit tests) and deeper troubleshooting was needed, but no time left. I do not have any experience with e2e / client tests.

And of course, I will use nestjs's config service for storing sensitive data as secrets for tokens, db connection links or any magic numbers in code to have one point where is possible to update application configuration.