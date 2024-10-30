import LoginForm from "../components/LoginForm";

const AuthPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f7f7f7",
  },
};

export default AuthPage;
