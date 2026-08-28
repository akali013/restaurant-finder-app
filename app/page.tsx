import { Suspense } from "react";
import ImageScroller from "./ui/login/ImageScroller";
import LoginForm from "./ui/login/LoginForm";
import { Metadata } from "next";

export default function LoginPage() {
  return (
    <div className="lg:grid lg:grid-cols-2">
      <Suspense>
        <LoginForm />
      </Suspense>
      <ImageScroller />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Login"
};