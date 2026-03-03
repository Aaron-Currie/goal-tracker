import Footer from "@/components/footer/footer";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        {children}
        <Footer />
    </>
  );
}
