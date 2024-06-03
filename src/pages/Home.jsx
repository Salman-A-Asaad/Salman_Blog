import React, { useEffect, useState } from "react";
import { PostCard } from "../components";
import { Link } from "react-router-dom";
import { getAllPosts } from "../api/query";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const { data, error, isLoading, isError } = getAllPosts();
  useEffect(() => {
    if (data) setPosts(data.posts);
  }, [data]);
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error error={error} />;
  return (
    <div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg main-color hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
        {posts && posts.length === 0 && (
          <div className="flex justify-center items-center min-h-screen">
            <h1 className="main-color text-2xl font-bold">No post yet</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
