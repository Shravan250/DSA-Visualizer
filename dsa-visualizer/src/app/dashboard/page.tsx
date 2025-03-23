import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="flex flex-col items-center justify-start gap-3 max-w-10 "></div>
        <div></div>
        <div></div>
      </main>
      <Footer />
    </div>
  );
}
