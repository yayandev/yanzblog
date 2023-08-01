"use client";
import axios from "axios";
import React from "react";
export default function AddCategoriesPage() {
  const [name, setName] = React.useState("");
  const [isProsses, setIsProsses] = React.useState(false);
  const [notif, setNotif] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProsses(true);
    const response = await axios.post("/api/categories", {
      name: name,
    });

    if (response.data.success) {
      setName("");
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
    <div className="w-full flex my-5 justify-center items-center container">
      <form onSubmit={onAdd} className="w-full p-3 rounded shadow bg-slate-800">
        <h1 className="font-bold text-center text-2xl ">Add Categories</h1>
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your name categories"
          className="input input-bordered w-full my-3"
        />
        <button
          disabled={isProsses}
          className="btn btn-primary my-3"
          type="submit"
        >
          {isProsses ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
