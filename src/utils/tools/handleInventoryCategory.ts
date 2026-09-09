const TOOLS = ["scissor", "needle", "marker", "pin"];
const AMI = ["eye", "stuffing"];

export function handleInventoryCategory(category: string) {
    const c = category.trim().toLowerCase();

    // contains keyword yarn
    if (c.includes("yarn"))
        return "yarn";

    // contains keyword hook
    if (c.includes("hook"))
        return "hook";

    if (TOOLS.some(tool => c.includes(tool)))
        return "took";

    if (AMI.some(ami => c.includes(ami)))
        return "ami";

    return "other";
}

