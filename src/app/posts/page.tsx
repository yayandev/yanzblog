"use client";
import { useEffect, useState } from "react";
import axios from "axios";
export default function PostsPage() {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState({
    title: "",
    body: "",
    categories: "",
  });
  const [isProsses, setIsProsses] = useState(false);
  const [notif, setNotif] = useState("");
  const [msg, setMsg] = useState("");

  const getCategories = async () => {
    const response = await axios.get("/api/categories");
    setCategories(response.data.data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const onPosts = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProsses(true);
    const response = await axios.post("/api/posts", posts);
    if (response.data.success) {
      setPosts({
        title: "",
        body: "",
        categories: "",
      });
      setNotif("success");
      setMsg(response.data.message);
      setIsProsses(false);
    } else {
      setNotif("error");
      setMsg(response.data.message);
      setIsProsses(false);
    }
  };
  return (
    <>
      <div className="w-full flex my-5 justify-center items-center container">
        <form
          className="w-full p-3 rounded shadow bg-slate-800"
          onSubmit={onPosts}
        >
          <h1 className="font-bold text-center text-2xl ">Create Posts</h1>
          {notif ? (
            <div className={`alert alert-${notif}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{msg}</span>
            </div>
          ) : null}
          <input
            type="text"
            required
            value={posts.title}
            onChange={(e) => setPosts({ ...posts, title: e.target.value })}
            placeholder="Enter Your title Posts"
            className="input input-bordered w-full my-3"
          />
          <select
            className="select w-full my-3"
            value={posts.categories}
            onChange={(e) => setPosts({ ...posts, categories: e.target.value })}
          >
            {categories.map((category: any) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <textarea
            required
            value={posts.body}
            onChange={(e) => setPosts({ ...posts, body: e.target.value })}
            className="textarea my-3 w-full"
            placeholder="Enter Your Body posts"
          ></textarea>
          <button
            type="submit"
            className="btn btn-primary my-3"
            disabled={isProsses}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
