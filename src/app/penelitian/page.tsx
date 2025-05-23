import ResearchMain from "@/components/Research/ResearchBody";
import ResearchHeader from "@/components/Research/ResearchHeader";

export const metadata = {
  title: "Penelitian | Teknik Sipil Unsoed",
};

// Komponen utama halaman penelitian
export default function DownloadPage() {
  return (
    <main>
      <ResearchHeader />
      <ResearchMain />
    </main>
  );
}
