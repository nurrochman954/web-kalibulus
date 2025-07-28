// JANGAN pakai "use client" di sini, biarkan jadi Server Component
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import InfografisSecondBar from "@/components/InfografisSecondBar";
import InfografisBalita from "@/components/InfografisBalita"; // ✅ Tanpa props

const PosyanduPage = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <InfografisSecondBar currentPage="posyandu" />
      <InfografisBalita /> 
      <Footer />
    </main>
  );
};

export default PosyanduPage;
