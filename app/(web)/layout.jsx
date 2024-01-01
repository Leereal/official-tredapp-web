import Header from "./_components/Header";
export default function RootLayout({ children }) {
  return (
    <main className="bg-gradient-to-r from-yellow-400 via-gray-50 to-teal-300">
      <Header />
      {children}
    </main>
  );
}
