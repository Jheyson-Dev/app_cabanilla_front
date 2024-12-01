import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useOfficeById } from "@/hooks/useOffice";
import { Label } from "@radix-ui/react-label";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, Toaster } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateOffice } from "@/types";
import { Loader } from "lucide-react";
import { updateOffice } from "@/service";

// Definir el esquema de validación con yup
const schema = yup.object().shape({
  name: yup.string().required("El nombre de la oficina es obligatorio"),
  location: yup.string().optional(),
});

export const EdithOfficePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useOfficeById(id || "");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateOffice>({
    resolver: yupResolver(schema),
  });

  const updateOfficeMutation = useMutation({
    mutationFn: async (data: UpdateOffice) => {
      const response = await updateOffice(id!, data);
      return response;
    },
    onSuccess: () => {
      toast.success(`Oficina actualizada exitosamente`);
      queryClient.invalidateQueries({
        queryKey: ["office", `${id}`],
        exact: true,
      });
      navigate("/app/office");
    },
    onError: (data) =>
      toast.error(
        `Error al actualizar la oficina: ${JSON.stringify(
          (data as any).response.data.message
        )}`
      ),
  });

  const onSubmit: SubmitHandler<UpdateOffice> = async (data) => {
    try {
      await updateOfficeMutation.mutate(data);
    } catch (error) {
      const msg = (error as any)?.response?.data?.message;
      toast.error(`Error al actualizar la oficina: ${msg}`);
    }
  };

  return (
    <div>
      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Editar Oficina</CardTitle>
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
                  <Label htmlFor="location">Ubicación</Label>
                  <Textarea
                    id="location"
                    defaultValue={data.location}
                    {...register("location")}
                    required
                  />
                  {errors.location && (
                    <span className="text-red-500">
                      {errors.location.message}
                    </span>
                  )}
                </div>
              </div>
              <Button
                className="mt-4"
                type="submit"
                disabled={updateOfficeMutation.isPending}
              >
                {updateOfficeMutation.isPending ? (
                  <span className="flex justify-center items-center gap-4">
                    <Loader className="animate-spin" />
                  </span>
                ) : (
                  "Actualizar Oficina"
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
