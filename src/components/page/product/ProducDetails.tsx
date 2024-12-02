import { useProductById } from "@/hooks/useProduct";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Entry, Exit, Loan, Return } from "@/types";

const columnHelper = createColumnHelper<Entry>();

const entryColumns = [
  //   columnHelper.accessor((row) => row.OfficeProduct.Office.name, {
  //     id: "officeName",
  //     header: () => <span>Oficina</span>,
  //     cell: (info) => info.getValue(),
  //   }),
  columnHelper.accessor("quantity", {
    header: () => <span>Cantidad</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("observation", {
    header: () => <span>Observación</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: () => <span>Fecha de Creación</span>,
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
];

export const ProductDetails: FC = () => {
  const { id } = useParams();
  const { data } = useProductById(id || "");
  console.warn(data);

  const tableEntries = useReactTable({
    data: data?.OfficeProduct.flatMap((op: any) => op.Entry) || [],
    columns: entryColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableExits = useReactTable({
    data: data?.OfficeProduct.flatMap((op: any) => op.Exit) || [],
    columns: entryColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableLoans = useReactTable({
    data: data?.OfficeProduct.flatMap((op: any) => op.Loan) || [],
    columns: entryColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableReturns = useReactTable({
    data: data?.OfficeProduct.flatMap((op: any) => op.Return) || [],
    columns: entryColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1 className="mb-2 text-xl font-bold">Product Details</h1>
      {data && (
        <div className=" flex flex-col gap-8">
          <div className="border-2 p-4 rounded-xl">
            <h2 className="mb-2 text-lg font-bold">Entradas</h2>
            <Table>
              <TableHeader>
                {tableEntries.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {tableEntries.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="border-2 p-4 rounded-xl">
            <h2 className="mb-2 text-lg font-bold">Salidas</h2>
            <Table>
              <TableHeader>
                {tableExits.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {tableExits.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="border-2 p-4 rounded-xl">
            <h2 className="mb-2 text-lg font-bold">Préstamos</h2>
            <Table>
              <TableHeader>
                {tableLoans.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {tableLoans.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="border-2 p-4 rounded-xl">
            <h2 className="mb-2 text-lg font-bold">Devoluciones</h2>
            <Table>
              <TableHeader>
                {tableReturns.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {tableReturns.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};
