import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        {children}
        <footer style={{position: "fixed", bottom: 0, width: "100%", display: "flex", justifyContent: "space-between", gap: "20px", padding: "10px", backgroundColor: "#f0f0f0"}}>
          <Link href="/goals/yearly/2026">
            <FontAwesomeIcon size="2x" icon={faBullseye} />
          </Link>
          <form action="/auth/signout" method="post">
            <button type="submit">Sign out</button>
          </form>
        </footer>
    </div>
  );
}
