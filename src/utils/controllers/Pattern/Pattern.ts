type Pair = Record<string, string>;

// rows are 0 indexed
//  -index 0 should be color -> base
//  -index 1 should be first row
//  -on color change, index should be color -> row

// colors should be color: hex string

export class Pattern {
    #rows: string[];
    #colors: Pair;
    #sizes: Pair;
    #stitches: Pair;
    #materials: string[];

    constructor(rows: string[], colors: Pair, sizes: Pair, stitches: Pair, materials: string[]) {
        this.#rows = rows;
        this.#colors = colors;
        this.#sizes = sizes;
        this.#stitches = stitches;
        this.#materials = materials;
    }
    
}