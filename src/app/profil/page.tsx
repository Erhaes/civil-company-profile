import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileMain from "@/components/Profile/ProfileMain";

export const metadata = {
  title: "Profil | Teknik Sipil Unsoed",
};

export default function Profile () {

  return (
    <>
      <ProfileHeader />
      <ProfileMain />      
    </>
  );
};
