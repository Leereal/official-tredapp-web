import Sidebar from "./_components/Sidebar";
export default function RootLayout({ children }) {
  return (
    <main className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </main>
  );
}
