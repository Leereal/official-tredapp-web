import Sidebar from "./_components/Sidebar";
import TopNav from "./_components/TopNav";
export default function RootLayout({ children }) {
  return (
    <>
      <Sidebar />
      <main className="p-4 sm:ml-64">
        <TopNav />
        <div className="bg-slate-100 min-h-screen rounded-2xl p-6">
          {children}
        </div>
      </main>
    </>
  );
}
