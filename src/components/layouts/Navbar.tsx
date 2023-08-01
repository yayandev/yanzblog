"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Navbar() {
  const router = useRouter();
  const [userActive, setUserActive] = useState(false);
  const [categories, setCategories] = useState([{ _id: "", name: "" }]);
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
  });

  const getDataUser = async () => {
    const response = await axios.get("/api/users/me");
    if (response.data.success) {
      setUserActive(true);
      setUser(response.data.data);
    } else {
      setUserActive(false);
    }
  };

  const getAllCategories = async () => {
    const response = await axios.get("/api/categories");
    if (response.data.success) {
      setCategories(response.data.data);
    }
  };
  useEffect(() => {
    getDataUser();
    getAllCategories();
  }, [userActive]);

  const handleLogout = async () => {
    const response = await axios.get("/api/users/logout");
    if (response.data.success) {
      router.push("/login");
      setUserActive(false);
    } else {
      console.log(response.data.message);
    }
  };
  return (
    <nav className="navbar shadow bg-slate-800">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <a>Category</a>
              <ul className="p-2">
                {categories.map((category: any) => (
                  <li key={category._id}>
                    <a>{category.name}</a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          YANZBLOG
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Category</summary>
              <ul className="p-2">
                {categories.map((category: any) => (
                  <li key={category._id}>
                    <a>{category.name}</a>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {userActive ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/kucing.png" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-slate-800 rounded-box w-52"
            >
              <li>
                <Link href="/dashboard" className="justify-between">
                  Dashboard
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link href="/posts">Posts</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
