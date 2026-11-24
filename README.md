# Simple Social App

A RESTful API for a blog-style social platform, built with Node.js, Express and Sequelize on MySQL. Users can create posts and comments, and the API shows how to use Sequelize models, associations and queries.

## Features

- Users, posts and comments with Sequelize models and associations (one user has many posts and comments, one post has many comments)
- Cascade on delete and update for related rows
- Soft delete for posts (`paranoid`)
- Model validation (email format, name length, role enum) and a hook that checks the name before create
- Create user with `findOrCreate` so duplicate emails are rejected
- Create or update a user by id
- Bulk create comments
- Search comments by a word (`LIKE`)
- Get the 3 newest comments of a post
- List posts with the author name and their comments
- Count comments per post

## Tech stack

Node.js, Express 4, Sequelize 6, MySQL (mysql2)

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/user/adduser` | Add a user |
| POST | `/user/users/:id` | Update a user, or create it if the id does not exist |
| GET | `/user/users/by-email?email=` | Find a user by email |
| GET | `/user/users/:id` | Get a user by id (role hidden) |
| POST | `/post/createpost` | Create a post (`titel`, `content`, `userid`) |
| DELETE | `/post/deletepost/:id` | Delete a post |
| GET | `/post/posts/details` | All posts with author and comments |
| GET | `/post/posts/countcomments` | Comments count per post |
| POST | `/comment/createcomments` | Bulk create comments (`comment` array) |
| PATCH | `/comment/updatecomment/:id` | Update a comment |
| POST | `/comment/find-or-create` | Find a comment or create it |
| GET | `/comment/comments/search?word=` | Search comments by word |
| GET | `/comment/newest/:postId` | Latest 3 comments of a post |
| GET | `/comment/details/:id` | Get one comment |

## Project structure

```
src/
  DB/        connection and models (user, posts, comments)
  modules/   user, posts, commentes (controller + service)
  utils/     router setup
```

## Run locally

1. Install Node.js and MySQL, then create a database.
2. Set the database name, user and password in `src/DB/connection.js`.
3. Run:

```bash
git clone https://github.com/ahmedshaban42/simple-social-app.git
cd simple-social-app
npm install
npm run start:dev
```

The server runs on `http://localhost:3000` and creates the tables on start.

## Note

This was built as a learning project for Sequelize and relational data. It has no login or JWT.

## Author

Ahmed Shaban - [github.com/ahmedshaban42](https://github.com/ahmedshaban42)
