import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

// npm i supabase --save-dev (might have to do -g), npx supabase login
/*
npx supabase gen types typescript --project-id "ecdbtfvywgzyoexkpgkj" --schema public > ./src/db/database.types.ts
*/

// for angular .env, use ng add @ng-env/builder
// add to angular.json: "build": "@ngx-env/builder:application"
// define variables starting with NG_APP
// add types in env.d.ts
const supabase = createClient<Database>(
    import.meta.env["NG_APP_SUPABASE_URL"],
    import.meta.env["NG_APP_SUPABASE_KEY"]
);

export default supabase;