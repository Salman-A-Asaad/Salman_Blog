import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  CreatePost,
  Dashboard,
  Home,
  PostPage,
  Projects,
  Search,
  Signin,
  Signup,
  UpdatePost,
} from "./pages";
import {
  Header,
  FooterComponent,
  PrivateRoute,
  OnlyAdminPrivateRoute,
  ScrollToTop,
} from "./components";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/search" element={<Search />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      <FooterComponent />
      <Toaster />
    </>
  );
}

export default App;
