import { getDb } from "@/lib/db";

export type SiteSettings = {
  contact_email: string;
  phone_primary: string;
  phone_secondary: string;
  contact_locations: string;
};

export const defaultSiteSettings: SiteSettings = {
  contact_email: "info@orchardtoglobal.com",
  phone_primary: "+41 78 336 04 25",
  phone_secondary: "+90 536 847 6521",
  contact_locations: "Zurich · Istanbul · Aydın"
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const sql = getDb();
    const rows = await sql< { setting_key: string; setting_value: string }[] >`
      SELECT setting_key, setting_value
      FROM site_settings
      WHERE setting_key IN ('contact_email', 'phone_primary', 'phone_secondary', 'contact_locations')
    `;
    const settings = { ...defaultSiteSettings };
    for (const row of rows) {
      if (row.setting_key in settings && row.setting_value.trim()) {
        settings[row.setting_key as keyof SiteSettings] = row.setting_value.trim();
      }
    }
    return settings;
  } catch {
    return defaultSiteSettings;
  }
}
