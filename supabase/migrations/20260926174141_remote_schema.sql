DROP POLICY "Auth users can read from shared patterns" ON "public"."materials";

CREATE POLICY "Auth users can read from shared patterns" ON "public"."materials"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM public.owners
  WHERE ((owners.pattern_id = materials.pattern_id) AND (owners.user_id = auth.uid())))));

