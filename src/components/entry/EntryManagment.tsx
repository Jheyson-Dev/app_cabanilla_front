import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { CreateEntry, Entry, Office, Product } from "@/types";
import { CirclePlus, Search, SlidersHorizontal } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createEntry } from "@/service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllOffices } from "@/hooks/useOffice";
import { useAllProducts } from "@/hooks/useProduct";

const columnHelper = createColumnHelper<Entry>();

interface Props {
  data: Entry[];
}

// Definir el esquema de validación con yup
const schema = yup.object().shape({
  officeId: yup
    .string()
    .required("El ID del producto de oficina es obligatorio"),
  productId: yup.string().required("El ID del producto es obligatorio"),
  quantity: yup
    .number()
    .required("La cantidad es obligatoria")
    .positive("La cantidad debe ser positiva"),
});

export const EntryManagement: FC<Props> = ({ data }) => {
  const queryClient = useQueryClient();
  const { data: offices } = useAllOffices();
  const { data: products } = useAllProducts();

  const columns = [
    columnHelper.accessor("OfficeProduct.Office.name", {
      header: () => <span>Oficina</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("OfficeProduct.Product.name", {
      header: () => <span>Producto</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("quantity", {
      header: () => <span>Cantidad</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("observation", {
      header: () => <span>Observación</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("createdAt", {
      header: () => <span>Fecha de Entrada</span>,
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      footer: (info) => info.column.id,
    }),
  ];

  const [filtering, setFiltering] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
      columnVisibility,
      pagination,
    },
    onGlobalFilterChange: setFiltering,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<CreateEntry>({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateEntry) => {
      const response = await createEntry(data);
      reset();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"], exact: true });
    },
  });

  const onSubmit: SubmitHandler<CreateEntry> = async (data) => {
    console.log(data);
    setIsDialogOpen(false);
    const promesa = mutation.mutateAsync(data);
    toast.promise(promesa, {
      loading: "Cargando....",
      success: "Entrada creada correctamente",
      error: "Ocurrió un error al crear la entrada",
      duration: 1000,
    });
  };

  return (
    <div className="p-2">
      <h1 className="mb-2 text-xl font-bold">Administración de Entradas</h1>
      <div className="flex justify-between py-4 font-semibold text-ellipsist-xl">
        <div className="flex gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <Input
              type="search"
              placeholder="Buscar entrada"
              className="pl-10"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Filter <SlidersHorizontal className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant={"default"}>
                <CirclePlus className="w-4 h-4 mr-2" />
                Crear Entrada
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Nueva Entrada</DialogTitle>
                <DialogDescription>
                  Ingrese los detalles de la nueva entrada a crear.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="officeId" className="text-sm font-medium">
                        Producto de Oficina
                      </Label>
                      <Select
                        onValueChange={(value) => setValue("officeId", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un producto de oficina" />
                        </SelectTrigger>
                        <SelectContent>
                          {offices?.map((office: Office) => (
                            <SelectItem key={office.id} value={office.id}>
                              {office.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.officeId && (
                        <span className="text-red-600 text-xs">
                          El producto de oficina es requerido
                        </span>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="productId"
                        className="text-sm font-medium"
                      >
                        Producto
                      </Label>
                      <Select
                        onValueChange={(value) => setValue("productId", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un producto" />
                        </SelectTrigger>
                        <SelectContent>
                          {products?.map((product: Product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.productId && (
                        <span className="text-red-600 text-xs">
                          El producto es requerido
                        </span>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="quantity" className="text-sm font-medium">
                        Cantidad
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="Ingrese la cantidad..."
                        {...register("quantity", { required: true })}
                      />
                      {errors.quantity && (
                        <span className="text-red-600 text-xs">
                          La cantidad es requerida
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Crear Entrada
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: `${header.getSize()}px` }}
                    className="relative group"
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No hay datos disponibles
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center py-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
