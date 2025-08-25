import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function AddListing() {
  const [form, setForm] = useState({
    professional_type: "",
    company_name: "",
    license_number: "",
    experience_years: "",
    specializations: "",
    consultation_fee: "",
    bio: "",
    office_address: "",
    website_url: "",
    linkedin_profile: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const record = {
      ...form,
      experience_years: form.experience_years ? Number(form.experience_years) : null,
      consultation_fee: form.consultation_fee ? Number(form.consultation_fee) : null,
      specializations: form.specializations ? form.specializations.split(",").map(s => s.trim()) : null,
    };
    const { error } = await supabase.from("professional_profiles").insert([record]);
    setLoading(false);
    if (!error) router.push("/browse");
    // Handle error as needed
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Add Professional Listing</h1>
      <form onSubmit={handleSubmit}>
        <input required name="professional_type" placeholder="Professional Type" value={form.professional_type} onChange={handleChange} /><br />
        <input name="company_name" placeholder="Company Name" value={form.company_name} onChange={handleChange} /><br />
        <input name="license_number" placeholder="License Number" value={form.license_number} onChange={handleChange} /><br />
        <input name="experience_years" placeholder="Years of Experience" value={form.experience_years} onChange={handleChange} /><br />
        <input name="specializations" placeholder="Specializations (comma separated)" value={form.specializations} onChange={handleChange} /><br />
        <input name="consultation_fee" placeholder="Consultation Fee" value={form.consultation_fee} onChange={handleChange} /><br />
        <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} /><br />
        <input name="office_address" placeholder="Office Address" value={form.office_address} onChange={handleChange} /><br />
        <input name="website_url" placeholder="Website URL" value={form.website_url} onChange={handleChange} /><br />
        <input name="linkedin_profile" placeholder="LinkedIn Profile" value={form.linkedin_profile} onChange={handleChange} /><br />
        <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Listing"}</button>
      </form>
    </div>
  );
}