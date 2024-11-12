import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../../auth/presentation/state/hooks/useAuthState";
import { useApi } from "../apiContext";

const AddPostPage: React.FC = () => {
  const { authentication } = useAuthState();
  const navigate = useNavigate();
  const api = useApi();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();

    // check if accouhnt is okay to add post
    if (!authentication.state.id) {
      alert("You do not have permission to add a post.");
      return;
    }

    // request sent to back end API
    api.addPost({ title, content, author: authentication.state.username })
      .then((response) => {
        if (response.ok) {
          navigate("/"); // Redirect to home
        } else {
          alert("Failed to add post.");
        }
      })
      .catch((error) => console.error("Error adding post:", error));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Post</h2>
      <form onSubmit={handleAddPost} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          Add Post
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    height: "200px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AddPostPage;
