import DownloadFAQ from "@/components/Download/DownloadFAQ";
import DownloadHeader from "@/components/Download/DownloadHeader";
import DownloadMain from "@/components/Download/DownloadMain";

// Komponen utama halaman unduhan
export default function DownloadPage() {
  return (
    <main>
      <DownloadHeader />
      <DownloadMain />
      <DownloadFAQ />
    </main>
  );
}
