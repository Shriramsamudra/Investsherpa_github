import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { ProfessionalProfile } from "../../types/professional_profile";

export default function ListingDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState<ProfessionalProfile | null>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("professional_profiles")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) setProfile(data);
    }
    fetchProfile();
  }, [id]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{profile.company_name || "No Company"}</h1>
      <h2>{profile.professional_type}</h2>
      <p>{profile.bio}</p>
      {profile.linkedin_profile && (
        <p>
          LinkedIn: <a href={profile.linkedin_profile}>{profile.linkedin_profile}</a>
        </p>
      )}
      {profile.website_url && (
        <p>
          Website: <a href={profile.website_url}>{profile.website_url}</a>
        </p>
      )}
      <p>Status: {profile.status}</p>
      <p>Experience: {profile.experience_years} years</p>
      <p>Rating: {profile.rating} ({profile.total_reviews} reviews)</p>
    </div>
  );
}