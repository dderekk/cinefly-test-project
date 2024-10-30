import React from "react";
import { useAuthState } from "../../../auth/presentation/state/hooks/useAuthState";

const PostListPage: React.FC = () => {
  const { updateAuthentication, authentication } = useAuthState();

  const handleLogout = () => {
    updateAuthentication({ id: "", username: "", role: "editor" });
  };

  return (
    <div style={styles.container}>
      <h2
        style={styles.heading}
      >{`Hi There, ${authentication.state.username}`}</h2>
      {authentication.state.role === "admin" && (
        <h2 style={styles.heading}>I see that you're an admin user</h2>
      )}

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
  },
};

export default PostListPage;
