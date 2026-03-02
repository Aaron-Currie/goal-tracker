export default async function YearLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ period: string, year: string }>;
}>) {
  const {period, year} = await params;
  return (
    <>
    <header>
      <div>
        <h1>{period}</h1>
      </div>
      <div>
        <h2>{year}</h2>
      </div>
    </header>
        {children}
    </>
  );
}
