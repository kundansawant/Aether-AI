import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ChatHub from "@/components/chat-hub";

export default function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("aether-session");

  let sessionData = null;
  if (token) {
    try {
      sessionData = JSON.parse(token.value);
    } catch (e) {}
  }

  const session = {
    user: sessionData
  };

  return <ChatHub session={session} />;
}
