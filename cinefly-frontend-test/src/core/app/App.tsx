import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthStateProvider } from "../../features/auth/presentation/state/authStateProvider";
import { DIProvider } from "../dependency_injection/dep_injection";
import AppRouter from "./AppRouter";

function App() {
  const queryClient = new QueryClient();
  return (
    <DIProvider>
      <AuthStateProvider>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </AuthStateProvider>
    </DIProvider>
  );
}

export default App;
