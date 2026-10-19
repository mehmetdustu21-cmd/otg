UPDATE site_settings
SET setting_value = 'info@orchardtoglobal.com', updated_at = NOW()
WHERE setting_key = 'contact_email'
  AND setting_value = 'hello@orchardtoglobal.com.tr';
