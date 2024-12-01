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
import { CreateUser, User } from "@/types";
import { CirclePlus, Pencil, Search, SlidersHorizontal } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUser } from "@/service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const columnHelper = createColumnHelper<User>();

interface Props {
  data: User[];
}

// Definir el esquema de validación con yup
const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  lastname: yup.string().required("El apellido es obligatorio"),
  dni: yup.string().required("El DNI es obligatorio"),
  email: yup
    .string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  phone: yup.string().required("El teléfono es obligatorio"),
  role: yup.string().required("El rol es obligatorio"),
});

export const UserManagement: FC<Props> = ({ data }) => {
  const queryClient = useQueryClient();

  const columns = [
    columnHelper.accessor("name", {
      header: () => <span>Nombre</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("lastname", {
      header: () => <span>Apellido</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("dni", {
      header: () => <span>DNI</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("email", {
      header: () => <span>Email</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("phone", {
      header: () => <span>Teléfono</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("role", {
      header: () => <span>Rol</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("actions", {
      header: () => <span>Opciones</span>,
      cell: (row) => (
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                asChild
                className="flex items-center cursor-pointer"
              >
                <Link to={`/app/user/${row.row.original.id}`}>
                  <Pencil size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
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
  } = useForm<CreateUser>({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateUser) => {
      const response = await createUser(data);
      reset();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"], exact: true });
    },
  });

  const onSubmit: SubmitHandler<CreateUser> = async (data) => {
    console.log(data);
    setIsDialogOpen(false);
    const promesa = mutation.mutateAsync(data);
    toast.promise(promesa, {
      loading: "Cargando....",
      success: "Usuario creado correctamente",
      error: "Ocurrió un error al crear el usuario",
      duration: 1000,
    });
  };

  return (
    <div className="p-2">
      <h1 className="mb-2 text-xl font-bold">Administración de Usuarios</h1>
      <div className="flex justify-between py-4 font-semibold text-ellipsist-xl">
        <div className="flex gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <Input
              type="search"
              placeholder="Buscar usuario"
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
                Crear Usuario
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                <DialogDescription>
                  Ingrese los detalles del nuevo usuario a crear.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Nombre
                      </Label>
                      <Input
                        id="name"
                        placeholder="Ingrese el nombre del usuario..."
                        {...register("name", { required: true })}
                      />
                      {errors.name && (
                        <span className="text-red-600 text-xs">
                          El nombre es requerido
                        </span>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastname" className="text-sm font-medium">
                        Apellido
                      </Label>
                      <Input
                        id="lastname"
                        placeholder="Ingrese el apellido del usuario..."
                        {...register("lastname", { required: true })}
                      />
                      {errors.lastname && (
                        <span className="text-red-600 text-xs">
                          El apellido es requerido
                        </span>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="dni" className="text-sm font-medium">
                        DNI
                      </Label>
                      <Input
                        id="dni"
                        placeholder="Ingrese el DNI del usuario..."
                        {...register("dni", { required: true })}
                      />
                      {errors.dni && (
                        <span className="text-red-600 text-xs">
                          El DNI es requerido
                        </span>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        placeholder="Ingrese el email del usuario..."
                        {...register("email", { required: true })}
                      />
                      {errors.email && (
                        <span className="text-red-600 text-xs">
                          El email es requerido
                        </span>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Teléfono
                      </Label>
                      <Input
                        id="phone"
                        placeholder="Ingrese el teléfono del usuario..."
                        {...register("phone", { required: true })}
                      />
                      {errors.phone && (
                        <span className="text-red-600 text-xs">
                          El teléfono es requerido
                        </span>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="role" className="text-sm font-medium">
                        Rol
                      </Label>
                      <Select
                        onValueChange={(value) => setValue("role", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USER">USER</SelectItem>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.role && (
                        <span className="text-red-600 text-xs">
                          El rol es requerido
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Crear Usuario
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
