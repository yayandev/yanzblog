import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center flex justify-center">
        <div>
          <h1 className="md:text-4xl text-2xl font-bold">
            Welcome to Yanzblog
          </h1>
          <p className="py-3">
            website yang membahasa seputar dunia programming.
          </p>
          <a href="#posts" className="btn btn-primary mx-1">
            Get Started
          </a>
          <Link href="/register" className="btn btn-outline btn-primary mx-1">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
