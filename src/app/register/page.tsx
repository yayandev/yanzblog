"use client";
import axios from "axios";
import Image from "next/image";
import React from "react";
export default function RegisterPage() {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [notif, setNotif] = React.useState("");
  const [bgnotif, setBgnotif] = React.useState("");
  const [isProsses, setIsProsses] = React.useState(false);

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProsses(true);
    const response: any = await axios.post("/api/users/register", user);
    if (response.data.success) {
      setIsProsses(false);
      setNotif(response.data.message);
      setBgnotif("bg-green-500");
      setUser({
        name: "",
        email: "",
        password: "",
      });
    } else {
      setIsProsses(false);
      setNotif(response.data.message);
      setBgnotif("bg-red-500");
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center container">
      <div className="w-full px-3 py-5 rounded md:flex block justify-around items-center">
        <div className="md:w-2/4 w-full">
          <Image
            src="/kucing.png"
            alt="Kucing Hitam Kece"
            className="w-full"
            width={300}
            height={300}
          />
        </div>
        <div className="md:w-2/5 w-full">
          <form className="w-full" onSubmit={onRegister}>
            <h1 className="font-bold text-center text-2xl">Create Acount!</h1>
            <h3 className={`p-3 text-center text-white rounded  ${bgnotif}`}>
              {notif}
            </h3>
            <input
              required
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
              value={user.name}
              type="text"
              className="w-full p-3 rounded border my-3"
              placeholder="Name"
            />

            <input
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              value={user.email}
              required
              type="email"
              className="w-full p-3 rounded border my-3"
              placeholder="Email"
            />
            <input
              type="password"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              value={user.password}
              required
              className="w-full p-3 rounded border my-3"
              placeholder="Password"
            />
            <button
              className="w-full p-3 rounded bg-blue-500 text-white my-3"
              disabled={isProsses}
              type="submit"
            >
              {isProsses ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
