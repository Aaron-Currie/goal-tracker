import Header from "@/components/header/header";

export default async function YearLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ period: string, year: string }>;
}>) {
  const {period, year} = await params;
  return (
    <>
      <Header period={period} year={year}/>
        {children}
    </>
  );
}
