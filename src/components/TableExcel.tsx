import {ChangeEvent, useCallback} from "react";
import {MAX_ITEMS, MAX_VALUE, MIN_ITEMS} from "../contans/config.ts";
import {useExcel} from "../hooks/useExcel.ts";
import {FiPlus, FiMinus} from "react-icons/fi";
import Button from "./ui/Button.tsx";

function TableExcel() {

  const { items, addSize, removeSize, changeCellValue } = useExcel();

  const getSummaryFromColumn = useCallback((column: number) => {
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
      sum += items[i][column]?.value ?? 0;
    }
    return sum;
  }, [items]);

  const getSummaryFromCell = useCallback((cell: number) => {
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
      sum += items[cell][i]?.value ?? 0;
    }
    return sum;
  }, [items]);

  const getSummaryFromCells = useCallback(() => {
    let sum = 0;
    items.forEach((row) => {
      row.forEach((cell) => {
        sum += cell.value;
      })
    })
    return sum;
  }, [items]);

  const handleClickAdd = () => {
    addSize();
  }
  const handleClickRemove = () => {
    removeSize();
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>, id: string) {
    const valueString = e.target.value;
    let value = 0;
    value = valueString.length ? parseInt(valueString) : 0;
    console.log(value);
    changeCellValue(value, id);
  }

  return (
    <section className={""}>
      <div className="relative overflow-x-auto">
        <table className="mt-6 w-full text-sm text-center text-slate-100 border-collapse border border-gray-700">
          <tbody>
            {items.map((row, i) => {
              return (
                <tr key={"row_" + i} className="bg-slate-800">
                  {row.map((cell) => {
                    return (
                      <th
                        key={cell.id}
                        className="border border-slate-600 min-w-12 w-12"
                      >
                        <input
                          size={MAX_VALUE}
                          value={cell.value}
                          onChange={(e) => handleInputChange(e, cell.id)}
                          className={
                            "w-full px-6 py-4 text-slate-200 bg-transparent border-0"
                          }
                        />
                      </th>
                    );
                  })}
                  <th
                    key={"summary_" + i}
                    className="px-6 py-4 border border-slate-600 bg-slate-900 min-w-12 w-12"
                  >
                    {getSummaryFromCell(i)}
                  </th>
                </tr>
              );
            })}
            <tr key={"summary"} className="bg-slate-900">
              {Array.from({ length: items.length }, (_, i) => {
                return (
                  <th
                    key={"summary_" + i}
                    className="px-6 py-4 border border-slate-600 w-12"
                  >
                    {getSummaryFromColumn(i)}
                  </th>
                );
              })}
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={items.length+1} className={"text-center px-6 py-4 border border-slate-600 bg-slate-800"}>
                Summary: {getSummaryFromCells()}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className={"mt-4 flex gap-2 justify-center py-1"}>
          <Button
            onClick={handleClickAdd}
            disabled={items.length === MAX_ITEMS}
          >
            <FiPlus />
          </Button>
          <Button
            onClick={handleClickRemove}
            disabled={items.length === MIN_ITEMS}
          >
            <FiMinus />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default TableExcel;
