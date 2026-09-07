 AND (EXISTS ( SELECT 1
   FROM user_profile
  WHERE (user_profile.id = owners.user_id)))