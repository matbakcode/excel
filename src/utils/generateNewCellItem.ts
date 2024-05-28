import {CellItem} from "../types.ts";
import { nanoid } from 'nanoid'
import {getRandomNumberByRange} from "./getRandomNumberByRange.ts";

export function generateNewCellItem(min: number, max: number): CellItem {
    return {
        id: nanoid(),
        value: getRandomNumberByRange(min, max),
        isActive: false,
    }
}