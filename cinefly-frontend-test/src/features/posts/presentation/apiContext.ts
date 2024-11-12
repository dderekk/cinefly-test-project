import React, { createContext, useContext } from "react";

const API_BASE_URL = "http://localhost:3001/api";

// Define the Post type
type Post = {
  title: string;
  content: string;
  author: string;
};

// Define the ApiContext type
type ApiContextType = {
  fetchPosts: () => Promise<Post[]>;
  fetchPostById: (postId: string) => Promise<Post>;
  addPost: (post: Post) => Promise<Response>;
};

export const ApiContext = createContext<ApiContextType>({
  fetchPosts: () => fetch(`${API_BASE_URL}/posts`).then((res) => res.json()),
  fetchPostById: (postId: string) => fetch(`${API_BASE_URL}/posts/${postId}`).then((res) => res.json()),
  addPost: (post: Post) => fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }),
});

export const useApi = () => useContext(ApiContext);
