"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [isProsses, setIsProsses] = React.useState(false);
  const [notif, setNotif] = React.useState("");

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProsses(true);
    const response: any = await axios.post("/api/users/login", user);
    if (response.data.success) {
      router.push("/dashboard");
    } else {
      setNotif(response.data.message);
      setIsProsses(false);
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center container">
      <div className="w-full px-3 py-5 rounded  md:flex block justify-around items-center">
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
          <form className="w-full" onSubmit={onLogin}>
            <h1 className="font-bold text-center text-2xl">Welcome Back!</h1>
            {notif && (
              <h3 className="w-full p-3 rounded bg-red-600 text-white">
                {notif}
              </h3>
            )}
            <input
              required
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="text"
              className="w-full p-3 rounded border my-3"
              placeholder="Email"
            />
            <input
              required
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              className="w-full p-3 rounded border my-3"
              placeholder="Password"
            />
            <button
              className="w-full p-3 rounded font-bold bg-blue-500 text-white my-3"
              type="submit"
              disabled={isProsses}
            >
              {isProsses ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
            <div className="w-full text-center">
              <Link href="/register">You dont have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
