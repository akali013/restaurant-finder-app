import SignUpForm from "@/app/ui/signup/SignupForm";
import { Metadata } from "next";

export default function SignUpPage() {
  return (
    <SignUpForm />
  );
}

export const metadata: Metadata = {
  title: "Create Account"
};