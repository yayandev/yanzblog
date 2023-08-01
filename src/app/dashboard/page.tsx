"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
export default function DashboardPage() {
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    isAdmin: false,
  });

  const [jumlahPost, setJumlahPost] = useState(null);

  const getJumlahPost = async () => {
    const response = await axios.get("/api/posts/user");
    setJumlahPost(response.data.data);
  };

  const getDataUser = async () => {
    const response = await axios.get("/api/users/me");
    setUser(response.data.data);
  };
  useEffect(() => {
    getDataUser();
    getJumlahPost();
  }, []);

  return (
    <div className="hero min-h-screen bg-base-200">
      {user._id !== "" ? (
        <div className="hero-content flex-col lg:flex-row">
          <img src="/kucing.png" className="max-w-sm rounded-lg" />
          <div>
            <h1 className="text-5xl font-bold my-3">{user.name}</h1>
            <div className="w-full p-3 my-3 rounded shadow">
              <h1 className="font-bold">
                Posts :
                {jumlahPost === null ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  jumlahPost
                )}
              </h1>
            </div>
            {user.isAdmin ? (
              <Link href="/add-categories" className="btn mx-1 btn-success">
                Add Categories
              </Link>
            ) : null}
          </div>
        </div>
      ) : (
        <span className="loading loading-bars loading-lg"></span>
      )}
    </div>
  );
}
