CREATE FUNCTION public.insert_user_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.user_profile(id, name)
    VALUES(new.id, new.raw_user_meta_data ->> 'username');
    RETURN new;
END;
$$;

CREATE TRIGGER on_user_signup
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.insert_user_profile()