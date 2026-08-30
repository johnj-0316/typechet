import { createClient } from "@supabase/supabase-js";

//ng add @ng-env/builder
const supabase = createClient(
    import.meta.env["NG_APP_SUPABASE_URL"],
    import.meta.env["NG_APP_SUPABASE_KEY"]
);

export default supabase;