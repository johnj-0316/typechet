const categories = ["material", "hook", "tool", "ami", "other"] as const;
type categoryTypes = typeof categories[number];

const TOOLS = ["scissor", "needle", "marker", "pin"];
const AMI = ["eye", "stuffing"];

export function handleInventoryCategory(category: string = "", item: string): categoryTypes {
    const i = item.trim().toLowerCase();
    const c = category.trim().toLowerCase() as categoryTypes;

    // given category is valid
    if (categories.includes(c))
        return c;

    // contains keyword yarn
    if (i.includes("material"))
        return "material";

    // contains keyword hook
    if (i.includes("hook"))
        return "hook";

    if (TOOLS.some(tool => i.includes(tool)))
        return "tool";

    if (AMI.some(ami => i.includes(ami)))
        return "ami";

    return "other";
}

