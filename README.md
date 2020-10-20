# Backend

# User Login / Sign Up Endpoints

| HTTP method | to             | Description                    |
| ----------- | -------------- | ------------------------------ |
| POST        | /auth/register | POST user to the DB            |
| POST        | /auth/login    | Returns the username and token |

# Public Issue Endpoint

| HTTP Method | to     | Description                                   |
| ----------- | ------ | --------------------------------------------- |
| GET         | /issue | Resolves to a title, description and location |

# Issue Endpoints

- The user needs to be "signed in" to use these!!

| HTTP method | to                      | Description                                       |
| ----------- | ----------------------- | ------------------------------------------------- |
| POST        | /issue                  | POST issue to the DB                              |
| PUT         | /issue/:id              | Updates an issue based on its Id                  |
| GET         | /issue/private/:id      | Resolves to all the posts basted on that users ID |
| GET         | /issue/private/post/:id | Resolves to one post by that user and issue ID    |
| DELETE      | /issue/:id              | Removes an issue based on its Id                  |
