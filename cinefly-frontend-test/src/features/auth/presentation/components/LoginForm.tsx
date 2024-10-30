import { useState } from "react";
import { useHandleLogin } from "../state/hooks/useHandleLogin";
import { useHandleSignUp } from "../state/hooks/useHandleSignUp";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const loginMutation = useHandleLogin();
  const signUpMutation = useHandleSignUp();

  const updateUsername = (newValue: string) => {
    if (!!error) setError(undefined);
    setUsername(newValue);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(username, {
      onError: (error) => setError(error.message),
    });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    signUpMutation.mutate(username);
  };

  return (
    <>
      <form style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => updateUsername(e.target.value)}
          style={styles.input}
        />
        <div style={styles.horizontal}>
          <button
            type="button"
            disabled={loginMutation.isPending}
            onClick={handleLogin} // Call handleLogin for login
            style={styles.button}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
          <button
            type="button"
            disabled={signUpMutation.isPending}
            onClick={handleSignUp} // Call handleSignUp for signup
            style={styles.button}
          >
            {signUpMutation.isPending ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </form>
      <p style={error ? styles.error : styles.hidden}>{error ?? "invisible"}</p>
    </>
  );
};

export default LoginForm;

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "1rem",
    maxWidth: "300px",
    width: "100%",
  },
  input: {
    padding: "0.5rem",
    width: "100%",
    fontSize: "1rem",
  },
  button: {
    padding: "0.5rem",
    margin: "0.5rem",
    width: "100px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "1rem",
  },
  hidden: {
    color: "transparent",
    marginTop: "1rem",
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
  },
};
