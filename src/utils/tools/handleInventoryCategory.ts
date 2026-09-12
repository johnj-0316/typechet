export const categories = ["material", "hook", "tool", "ami", "other"] as const;
export type categoryTypes = typeof categories[number];

const MATERIALS = ["yarn", "thread", "plarn", "twine", "hemp", "jute", "floss", "wire", "strips", "raffia", "paracord"];
const TOOLS = ["scissor", "needle", "marker", "pin"];
const AMI = ["eye", "stuffing"];

export function handleInventoryCategory(category: string = "", item: string): categoryTypes {
    const i = item.trim().toLowerCase();
    const c = category.trim().toLowerCase() as categoryTypes;

    // given category is valid
    if (categories.includes(c))
        return c;

    // contains keyword hook
    if (i.includes("hook"))
        return "hook";

    // contains keyword yarn
    if (MATERIALS.some(material => i.includes(material)))
        return "material";

    if (TOOLS.some(tool => i.includes(tool)))
        return "tool";

    if (AMI.some(ami => i.includes(ami)))
        return "ami";

    return "other";
}

