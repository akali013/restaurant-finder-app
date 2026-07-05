import { Suspense } from "react";
import ImageScroller from "./ui/login/ImageScroller";
import LoginForm from "./ui/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-2">
      <Suspense>
        <LoginForm />
      </Suspense>
      <ImageScroller />
    </div>
  );
}
