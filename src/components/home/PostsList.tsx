"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
const PostsList = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await axios.get("/api/posts");
    setPosts(response.data.data);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="w-full container min-h-screen" id="posts">
      <h1 className="font-bold text-2xl">All Posts</h1>
      <div className="w-full my-2 flex flex-col gap-3">
        {posts.map((post: any) => (
          <div className="w-full p-3 rounded shadow bg-base-200" key={post._id}>
            <h1 className="text-bold">{post.title}</h1>
            <p>{post.author}</p>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;
