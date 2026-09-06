import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

// npm i supabase --save-dev (might have to do -g), npx login
// npx supabase gen types typescript --project-id "ecdbtfvywgzyoexkpgkj" --schema public > ./src/db/database.types.ts
// ng add @ng-env/builder
const supabase = createClient<Database>(
    import.meta.env["NG_APP_SUPABASE_URL"],
    import.meta.env["NG_APP_SUPABASE_KEY"]
);

export default supabase;