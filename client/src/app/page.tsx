import AppNav from "@/components/common/AppNav";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/authOptions";


export default async function Home() {

  const session:CustomSession | null = await getServerSession(authOptions)
  return (
    <div>

      <AppNav session={session}/>
      {JSON.stringify(session)}
    </div>
  );
}
