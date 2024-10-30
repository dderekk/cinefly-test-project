# Blog Dashboard Project: Frontend Instructions

This project is a frontend implementation of a Blog Dashboard application. The server provides backend functionality, which includes endpoints for managing blog posts, comments, and user authentication. Your task is to build a simple frontend that interacts with this server according to the provided schema below.

Authentication has been set up to give you a template of how to complete the rest of the functionality. The test is to guage your understanding of the logic and how to inject it into the UI, so the styling of the components is NOT a priority. As long as it works, you can make this as simple as you like, even using AI to generate the styles.

## Objective

Your goal is to create a frontend interface for users to:

1. **Log in** and simulate different user roles.
2. **View, create, edit, and delete blog posts**.
3. **Add and view comments** for each post.

In your implementation, focus on the following:

- Usage of **Dependency Injection** to give access to functionalities throughout the application.
- Efficient use of **React Context API** for state management and role-based authentication.
- Use of **React Query (Tanstack)** for data fetching and caching.
- Application of **Clean Architecture patterns** to organize your code.
- Minimize unnecessary **re-renders** for efficient local state management.
- Use of **custom hooks** to encapsulate logic where appropriate.
- Integration with **React-Router-Dom** for routing and navigation.

## API Schema

Use the following schema to define your frontend endpoints and interactions.

### Authentication

| Method | Endpoint           | Description          | Request Body                    |
|--------|---------------------|----------------------|-----------------------------------------|
| POST   | `/api/auth/login`  | Logs in a user                  | `{ "username": String }`      |
| POST   | `/api/auth/signUp` | Signsup and logins in a user    | `{ "username": String }`      |


### Blog Posts

| Method | Endpoint           | Description                 | Request Body           |
|--------|---------------------|-----------------------------|-----------------------------------------------------------|
| GET    | `/api/posts`       | Retrieves all posts         | None                                                      |
| GET    | `/api/posts/:id`   | Retrieves a single post     | None                                                      |
| POST   | `/api/posts`       | Creates a new post          | `{ "title": String, "content": String, "author": String }` |
| PUT    | `/api/posts/:id`   | Updates an existing post    | `{ "title": String, "content": String }`      |
| DELETE | `/api/posts/:id`   | Deletes a post by ID        | None                                                      |

### Comments

| Method | Endpoint                  | Description                    | Request Body                           |
|--------|----------------------------|--------------------------------|----------------------------------------|
| GET    | `/api/comments/:postId`    | Gets comments for a post       | None                                   |
| POST   | `/api/comments/:postId`    | Adds a comment to a post       | `{ "content": String, "author":  String}` |

## Requirements

Your frontend should implement:

- **Login Page**: Allow users to log in with a username. Use React Context to manage and share the authenticated user’s state across components.
- **Post List Page**: Display a list of blog posts. Allow the creation of new posts and provide options to edit or delete existing posts.
- **Post Details Page**: Show post details and a list of comments. Allow users to add new comments.
- **Routing**: Use React Router to create navigable routes, including nested routes for comments on each post.
  
**Note**: Ensure that role-based access is respected on the frontend, e.g., only admins can delete posts.

Use the above schema and objectives to complete the frontend project.
