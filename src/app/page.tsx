'use client'
import useAuthRedirect from "@/hooks/useAuthRedirect";
import Link from "next/link";

export default function Home() {

  
  const {isAuthenticated} = useAuthRedirect()

  return (
    <div className="flex items-center justify-center h-[100vh] text-center">
      <Link href={'/login'} className="hover:underline cursor-pointer">Go login</Link>
    </div>
  );
}
