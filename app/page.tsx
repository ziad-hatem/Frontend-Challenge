import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
export default async function Home() {
  // Use getServerSession for server-side authentication to avoid client-side requests
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }
}
