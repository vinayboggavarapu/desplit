import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const SessionWrapper = async({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default SessionWrapper;
