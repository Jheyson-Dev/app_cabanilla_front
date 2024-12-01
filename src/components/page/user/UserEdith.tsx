import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUserById } from "@/hooks/useUser";
import { Label } from "@/components/ui/label";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, Toaster } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUser } from "@/types";
import { Loader } from "lucide-react";
import { updateUser } from "@/service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export const EdithUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useUserById(id || "");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateUser>({
    resolver: yupResolver(schema),
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: UpdateUser) => {
      const response = await updateUser(id!, data);
      return response;
    },
    onSuccess: () => {
      toast.success(`Usuario actualizado exitosamente`);
      queryClient.invalidateQueries({
        queryKey: ["user", `${id}`],
        exact: true,
      });
      navigate("/app/user");
    },
    onError: (data) =>
      toast.error(
        `Error al actualizar el usuario: ${JSON.stringify(
          (data as any).response.data.message
        )}`
      ),
  });

  const onSubmit: SubmitHandler<UpdateUser> = async (data) => {
    try {
      await updateUserMutation.mutate(data);
    } catch (error) {
      const msg = (error as any)?.response?.data?.message;
      toast.error(`Error al actualizar el usuario: ${msg}`);
    }
  };

  return (
    <div>
      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Editar Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    defaultValue={data.name}
                    {...register("name")}
                    required
                  />
                  {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastname">Apellido</Label>
                  <Input
                    id="lastname"
                    defaultValue={data.lastname}
                    {...register("lastname")}
                    required
                  />
                  {errors.lastname && (
                    <span className="text-red-500">
                      {errors.lastname.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dni">DNI</Label>
                  <Input
                    id="dni"
                    defaultValue={data.dni}
                    {...register("dni")}
                    required
                  />
                  {errors.dni && (
                    <span className="text-red-500">{errors.dni.message}</span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    defaultValue={data.email}
                    {...register("email")}
                    required
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    defaultValue={data.phone}
                    {...register("phone")}
                    required
                  />
                  {errors.phone && (
                    <span className="text-red-500">{errors.phone.message}</span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Rol</Label>
                  <Select
                    onValueChange={(value) => setValue("role", value)}
                    defaultValue={data.role}
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
                    <span className="text-red-500">{errors.role.message}</span>
                  )}
                </div>
              </div>
              <Button
                className="mt-4"
                type="submit"
                disabled={updateUserMutation.isPending}
              >
                {updateUserMutation.isPending ? (
                  <span className="flex justify-center items-center gap-4">
                    <Loader className="animate-spin" />
                  </span>
                ) : (
                  "Actualizar Usuario"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            error: "bg-red-400 text-white",
            success: "bg-green-400 text-white",
            warning: "text-yellow-400",
            info: "bg-blue-400",
            loading: "bg-blue-400 text-white",
          },
        }}
      />
    </div>
  );
};
