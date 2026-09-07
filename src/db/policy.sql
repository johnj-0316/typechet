CREATE FUNCTION get_unique_owners(unique_table TABLE(user_id UUID))
RETURNS TABLE(user_id UUID)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT unique_table.user_id
    FROM owners;
END;
$$;