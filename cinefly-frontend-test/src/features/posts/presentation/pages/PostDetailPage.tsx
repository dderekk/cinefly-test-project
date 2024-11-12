import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "../../../auth/presentation/state/hooks/useAuthState";
import { useApi } from "../apiContext";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
};

type Comment = {
  id: string;
  content: string;
  author: string;
};

const PostDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const { authentication } = useAuthState();
  const api = useApi();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post?.title || "");
  const [editContent, setEditContent] = useState(post?.content || "");

  // get post Details
  useEffect(() => {
    fetch(`http://localhost:3001/api/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setEditTitle(data.title);  
        setEditContent(data.content);  
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [postId]);

  // get comments
  useEffect(() => {
    fetch(`http://localhost:3001/api/comments/${postId}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [postId]);

  // add mew comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newComment,
        author: authentication.state.username,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add comment.");
        }
      })
      .then((comment) => {
        setComments([...comments, comment]);
        setNewComment("");
      })
      .catch((error) => console.error(error));
  };

  // switch edit mode
  const handleEdit = () => setIsEditing(true);

  // save edit content 
  const handleSaveEdit = () => {
    fetch(`http://localhost:3001/api/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    })
      .then((response) => {
        if (response.ok) {
          setIsEditing(false);
          setPost({ ...post, title: editTitle, content: editContent } as Post);
        } else {
          alert("Failed to save changes.");
        }
      })
      .catch((error) => console.error("Error saving post:", error));
  };

  // delete post
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      fetch(`http://localhost:3001/api/posts/${postId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            navigate("/"); // back to blog pages
          } else {
            alert("Failed to delete post.");
          }
        })
        .catch((error) => console.error("Error deleting post:", error));
    }
  };

  if (!post) {
    return <div style={styles.container}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {isEditing ? (
        // Edit mode
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={styles.input}
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            style={styles.textarea}
          />
          <button onClick={handleSaveEdit} style={styles.button}>
            Save
          </button>
          <button onClick={() => setIsEditing(false)} style={styles.button}>
            Cancel
          </button>
        </div>
      ) : (
        // view mode
        <div>
          <h2 style={styles.heading}>{post.title}</h2>
          <p style={styles.content}>{post.content}</p>
          <p style={styles.author}>Author: {post.author}</p>

          {/* only user itself CAN delete and edit, or admin */}
          {(authentication.state.username === post.author || authentication.state.role === "admin") && (
            <div>
              <button onClick={handleEdit} style={styles.button}>
                Edit
              </button>
              <button onClick={handleDelete} style={styles.button}>
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      <h3 style={styles.subheading}>Comments</h3>
      <ul style={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id} style={styles.commentItem}>
            <p>{comment.content}</p>
            <p style={styles.commentAuthor}>— {comment.author}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddComment} style={styles.form}>
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          Add Comment
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  content: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  author: {
    fontStyle: "italic",
    color: "#555",
    marginBottom: "20px",
  },
  subheading: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  commentList: {
    listStyleType: "none" as const,
    padding: 0,
    marginBottom: "20px",
  },
  commentItem: {
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
    marginBottom: "10px",
  },
  commentAuthor: {
    fontStyle: "italic",
    color: "#555",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
  },
  textarea: {
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    height: "100px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    width: "100%",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#17a2b8",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    alignSelf: "flex-start" as const,
    marginRight: "10px",
  },
};

export default PostDetailPage;
