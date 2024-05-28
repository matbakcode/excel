import {generateNewCellItem} from "./generateNewCellItem.ts";
import {MAX_VALUE, MIN_VALUE} from "../contans/config.ts";
import {CellItem} from "../types.ts";

export function generateAllDefaultTable(size: number) {
    const items = [];
    for (let i = 0; i < size; i++) {
        if (items[i]) {
            items[i].push(generateNewCellItem(MIN_VALUE, MAX_VALUE))
        } else {
            const generatedCells: CellItem[] = [];
            for (let k = 0; k < size; k++) {
                generatedCells.push(generateNewCellItem(MIN_VALUE, MAX_VALUE));
            }
            items.push(generatedCells);
        }
    }
    return items;
}