import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ChatHub from "@/components/chat-hub";

export default function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("sb-access-token");

  // SERVER-SIDE PROTECTION: This happens BEFORE any HTML is sent to the browser.
  // It completely eliminates the "Flash of Dashboard" and the redirect loop.
  if (!token) {
    redirect("/auth");
  }

  // Construct a minimal session object for the client to hydrate with
  const session = {
    access_token: token.value,
    refresh_token: cookieStore.get("sb-refresh-token")?.value || ""
  };

  return <ChatHub session={session} />;
}
