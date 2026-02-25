export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{border: "1px solid red"}}>
        {children}
        <form action="/auth/signout" method="post">
          <button type="submit">Sign out</button>
        </form>
    </div>
  );
}
