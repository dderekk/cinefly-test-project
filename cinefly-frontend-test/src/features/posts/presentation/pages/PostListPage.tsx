import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "../../../auth/presentation/state/hooks/useAuthState";
import { useQuery } from '@tanstack/react-query';

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
};

const PostListPage: React.FC = () => {
  const { updateAuthentication, authentication } = useAuthState();

  // use useQuery get data and cache
  const { data: posts = [], isLoading, error } = useQuery<Post[], Error>({
    queryKey: ['posts'], 
    queryFn: async () => {
      const response = await fetch("http://localhost:3001/api/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      return response.json();
    }
  });

  const handleLogout = () => {
    updateAuthentication({ id: "", username: "", role: "editor" });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{`Hi There, ${authentication.state.username}`}</h2>
      {authentication.state.role === "admin" && (
        <h2 style={styles.heading}>I see that you're an admin user</h2>
      )}

      <Link to="/add-post">
        <button style={styles.button}>Add New Post</button>
      </Link>

      {/* show blogs list */}
      <div style={styles.postContainer}>
        {posts.map((post: Post) => (
          <div key={post.id} style={styles.post}>
            <h3 style={styles.postTitle}>{post.title}</h3>
            <p style={styles.postContent}>{post.content.slice(0, 100)}...</p>
            <Link to={`/${post.id}`} style={styles.readMoreLink}>Read More</Link>
          </div>
        ))}
      </div>

      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column" as const,
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  postContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    width: "80%",
    maxWidth: "600px",
  },
  post: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "15px",
    marginBottom: "10px",
    width: "100%",
  },
  postTitle: {
    fontSize: "20px",
    fontWeight: "bold" as const,
  },
  postContent: {
    fontSize: "16px",
    color: "#555",
  },
  readMoreLink: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#007bff",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default PostListPage;
