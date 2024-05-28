import {useEffect, useRef, useState} from "react";
import {DEFAULT_SIZE, MAX_ITEMS, MAX_VALUE, MIN_ITEMS, MIN_VALUE} from "../contans/config.ts";
import {CellItem} from "../types.ts";
import {generateAllDefaultTable} from "../utils/generateAllDefaultTable.ts";
import {generateNewCellItem} from "../utils/generateNewCellItem.ts";

export function useExcel() {
    const [size, setSize] = useState(DEFAULT_SIZE);
    const [items, setItems] = useState<CellItem[][]>(generateAllDefaultTable(DEFAULT_SIZE));
    const isInitialRender = useRef(true);


    const changeCellValue = (value: number, id: string) => {
        const newItems = [...items];
        let newValue = value;
        if (value > MAX_VALUE) {
            newValue = MAX_VALUE;
        } else if (value < MIN_VALUE) {
            newValue = MIN_VALUE;
        } else {
            newValue = value;
        }

        newItems.forEach(row => {
            row.forEach(cell => {
                if (cell.id === id) {
                    cell.value = newValue;
                }
            })
        });
        setItems(newItems);
    }

    const addSize = () => {
        if (size+1 <= MAX_ITEMS) {
            setSize(size => size+1);
        }
    }

    const removeSize = () => {
        if (size-1 >= MIN_ITEMS) {
            setSize(size => size-1);
        }
    }

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
        } else {
            setItems([...updateMatrix()]);
        }
    }, [size]);

    const updateMatrix = () => {
        const newItems = [...items];
        console.log(newItems.length, size);
        if (newItems.length > size) {
            // Delete
            newItems.pop();
            newItems.forEach((row) => {
                row.pop();
            })
            setItems(newItems);
        } else if (newItems.length < size) {
            // Create
            for (let i = 0; i < size; i++) {
                if (newItems[i]) {
                    newItems[i].push(generateNewCellItem(MIN_VALUE, MAX_VALUE));
                } else {
                    const generatedRow: CellItem[] = [];
                    for (let k = 0; k < size; k++) {
                        generatedRow.push(generateNewCellItem(MIN_VALUE, MAX_VALUE));
                    }
                    newItems.push(generatedRow);
                }
            }
        }
        return newItems;
    }

    return {
        items,
        addSize,
        removeSize,
        changeCellValue,

    };
}