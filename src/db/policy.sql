  ((auth.uid() = user_id) AND (EXISTS ( SELECT 1
   FROM owners
  WHERE ((owners.user_id = trackers.user_id) AND (owners.pattern_id = trackers.pattern_id)))))