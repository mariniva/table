import React, { FC, useState } from "react";
import ProductRow from "../ProductRow/ProductRow";
import { useAppSelector } from "../hooks/hooks";
import { TableItem } from "../store/reducers/TableReducer";
import styles from "./ProductTable.module.css";

const ProductTable: FC = () => {
  const [sortColumn, setSortColumn] = useState<"name" | "price">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const products = useAppSelector((state) => state.table.data);

  const handleSort = (column: "name" | "price") => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (typeof aValue === "string" && typeof bValue === "string") {
      // Sorting strings
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      // Sorting numbers
      return sortDirection === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }
  });

  return (
    <table className={styles.table_container}>
      <thead>
        <tr>
          <th onClick={() => handleSort("name")}>
            Name
            {sortColumn === "name" && (
              <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
            )}
          </th>
          <th onClick={() => handleSort("price")}>
            Price
            {sortColumn === "price" && (
              <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
            )}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {sortedProducts.map((product: TableItem) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
