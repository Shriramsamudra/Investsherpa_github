import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import { ProfessionalProfile } from "../types/professional_profile";

export default function Browse() {
  const [profiles, setProfiles] = useState<ProfessionalProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfiles() {
      const { data, error } = await supabase
        .from("professional_profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setProfiles(data);
      setLoading(false);
    }
    fetchProfiles();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Browse Professionals</h1>
      <Link href="/add-listing">Add Listing</Link>
      <ul>
        {profiles.map((pro) => (
          <li key={pro.id}>
            <Link href={`/listing/${pro.id}`}> 
              <b>{pro.company_name || "No Company"}</b> — {pro.professional_type}
            </Link>
            <br />
            <span>Status: {pro.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}