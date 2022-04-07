# Problem Statement

> Create a task-list dashboard for a **user**. 
1. Users can create/view/edit their **task** with *Task Title*, *Description*, *AprrovedBy* (array), and any other fields you think should be there.
1. A user can have multiple **reviewers**

> Create an **admin**. Admin can perform following tasks:
1. Create new users
1. View all users
1. View tasks and task status of any user
1. Assign/remove reviewers for a user
1. Admin can also assign himself as reviewer for a user
1. Admin is a user himself
1. Admin can assign role of reviewer to multiple users for a particular user

> **Reviewer** can perform following tasks:
1. Reviewer can view users assigned to him and their tasks, task status and approve a task
1. Only a reviewer can mark a task as approved, not even admin (Unless he is also a reviewer for the user)

# Setup Postman

1. Open Postman
1. Click on *Import*, then click on *Link*
1. Paste [Postman Collection URL] and click on continue
1. Click on *Import*
1. Click on *Manage Environments*, then click on *Import*, then click on *Choose Files*
1. Choose both the JSON files in *PostmanEnvironment* directory inside root directory, and click on *Open*
1. Choose *Heroku* as environment variable
1. Start with Login API in UnAuthed API, on successful response, it'll automatically set *accessToken* environment variable for other authed APIs

# APIs
## Auth
> Login

>> POST {{host}}/login

>>> body

    {
        "email": "vishal194kumar@gmail.com",
        "password": "123456"
    }

## User

> Logout

>> POST {{host}}/logout

>>> header

    {
        "authorization": "Bearer accessToken",
    }

> Create Task

>> POST {{host}}/task

>>> header

    {
        "authorization": "Bearer accessToken",
    }

>>> body

    {
        "taskId": "taskId",
        "title": "Deployment server",
        "description": "Heroku"
    }

> Update Task

>> PUT {{host}}/task

>>> header

    {
        "authorization": "Bearer accessToken",
    }

>>> body

    {
        "taskId": "taskId",
        "title": "Deployment server",
        "description": "Heroku"
    }

> Get Task by Task ID

>> GET {{host}}/task/:taskID

>>> header

    {
        "authorization": "Bearer accessToken",
    }

## Reviewer

> Get all assigned users

>> GET {{host}}/reviewer/users

>>> header

    {
        "authorization": "Bearer accessToken",
    }

> Get tasks by User ID

>> GET {{host}}/reviewer/:userId/tasks

>>> header

    {
        "authorization": "Bearer accessToken",
    }

> Approve Task

>> PUT {{host}}/reviewer/approve-task

>>> header

    {
        "authorization": "Bearer accessToken",
    }

>>> body

    {
        "taskId": "taskId",
    }

## Admin

> Get all users

>> GET {{host}}/admin/users

>>> header

    {
        "authorization": "Bearer accessToken",
    }

> Get User by ID

>> GET {{host}}/user/:userId

>>> header

    {
        "authorization": "Bearer accessToken",
    }

> Create New User

>> POST {{host}}/admin/user

>>> header

    {
        "authorization": "Bearer accessToken",
    }

>>> body

    {
        "firstName": "firstName",
        "lastName": "lastName",
        "email": "vishal@funGyaan.com",
        "password": "123456#"
    }

> Get Tasks by User ID

>> GET {{host}}/admin/:userId/tasks

>>> header

    {
        "authorization": "Bearer accessToken",
    }

> Assign Reviewers to a User

>> POST {{host}}/admin/assignReviewers

>>> header

    {
        "authorization": "Bearer accessToken",
    }

>>> body

    {
        "userId": "userId",
        "reviewerId": ["reviewerId1", "reviewerId2"]
    }

# License

AGPL-3.0-or-later 

# Meet The Maker
[Vishal Kumar] - Software Engineer 👨‍💻 and an Aspiring Entrepreneur👨‍💼

[Vishal Kumar]: <https://www.linkedin.com/in/the-vishal-kumar/>
[Postman Collection URL]: <https://www.getpostman.com/collections/96e990730c7fb6263360>