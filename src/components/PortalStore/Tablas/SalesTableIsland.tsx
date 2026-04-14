import React from "react";
import { selectedRow, activedModal } from '@/store/uistore';
import type { Column } from "@/types/tablas";

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
  keyField: keyof T;
  selectable?: boolean;
  entity: 'venta' | 'cliente';
};

export default function SalesTableIsland<T>({
  columns,
  rows,
  keyField,
  selectable = false,
  entity
}: Props<T>) {

  function handleRowClick(row: T) {
    if (!row) return;

    selectedRow.set({
      entity,
      data: row
    });

    activedModal.set({
      type: entity
    });
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {selectable && (
              <th>
                <input type="checkbox" />
              </th>
            )}
            {columns.map((col, i) => (
              <th key={i}>{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length > 0 ? (
            rows.map((row) => {
              const key = row[keyField];

              if (!key) {
                console.warn("Row sin key válida:", row);
                return null;
              }

              return (
                <tr
                  key={String(key)}
                  className="table-row"
                  onClick={() => handleRowClick(row)}
                >
                  {selectable && (
                    <td>
                      <input
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}

                  {columns.map((col, j) => (
                    <td key={j}>
                      {col.render
                        ? col.render(row)
                        : col.field
                        ? String(row[col.field] ?? '')
                        : ''}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)}>
                SIN DATOS
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}