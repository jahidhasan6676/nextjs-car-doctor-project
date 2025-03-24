"use client";
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";


export default function SocialLogin() {
  const router = useRouter();
  const session = useSession();

  const handleSocialLogin = (providerName) => {
     signIn(providerName);
  };

  useEffect(()=>{
    if(session?.status == "authenticated"){
      router.push("/");
      toast.success("Successfully Logged In")
    }
  },[session?.status])

  
  return (
    <div className="flex justify-center gap-8">
      <p
        onClick={() => handleSocialLogin("google")}
        className="bg-slate-200 rounded-full p-3 cursor-pointer"
      >
        <FaGoogle type="button" />
      </p>
      <p
        onClick={() => handleSocialLogin("github")}
        className="bg-slate-200 rounded-full p-3 cursor-pointer"
      >
        <FaGithub type="button " />
      </p>
    </div>
  );
}