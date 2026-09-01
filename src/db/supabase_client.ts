import { createClient } from "@supabase/supabase-js";
import { Database } from "./Database";

//ng add @ng-env/builder
const supabase = createClient<Database>(
    import.meta.env["NG_APP_SUPABASE_URL"],
    import.meta.env["NG_APP_SUPABASE_KEY"]
);

export default supabase;