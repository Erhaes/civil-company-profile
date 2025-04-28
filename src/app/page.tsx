import HomepageFacilities from "@/components/Homepage/HomapageFacilities";
import HomepageLaboratories from "@/components/Homepage/HomepageLaboratories";
import HomepageHero from "@/components/Homepage/HomepageHero";
import HomepageAbout from "@/components/Homepage/HomepageAbout";
import HomepageTestimonial from "@/components/Homepage/HomepageTestimonial";
import HomepageCTA from "@/components/Homepage/HomepageCTA";

export const metadata = {
  title: "Beranda | Teknik Sipil Unsoed",
};

export default function Home() {
  return (
    <main>
      <HomepageHero />
      <HomepageAbout />
      <HomepageLaboratories />
      <HomepageFacilities />
      <HomepageTestimonial />
      <HomepageCTA />
    </main>
  );
}
