// AppRouter.tsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthPage from "../../features/auth/presentation/pages/AuthPage";
import { useIsSignedIn } from "../../features/auth/presentation/state/hooks/useAuthRedirect";
import PostDetailPage from "../../features/posts/presentation/pages/PostDetailPage";
import PostListPage from "../../features/posts/presentation/pages/PostListPage";
import AddPostPage from "../../features/posts/presentation/pages/AddPostPage"; 

const SignedInRoutes = React.memo(() => (
  <Routes>
    <Route path="/" element={<PostListPage />} />
    <Route path="/add-post" element={<AddPostPage />} /> 
    <Route path="/:postId" element={<PostDetailPage />} />
  </Routes>
));

const SignedOutRoutes = React.memo(() => (
  <Routes>
    <Route path="/" element={<AuthPage />} />
  </Routes>
));

const AppRouter: React.FC = () => {
  const signedIn = useIsSignedIn();
  return <Router>{signedIn ? <SignedInRoutes /> : <SignedOutRoutes />}</Router>;
};

export default AppRouter;
