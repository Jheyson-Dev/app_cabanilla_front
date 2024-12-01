import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProductById } from "@/hooks/useProduct";
import { Label } from "@radix-ui/react-label";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, Toaster } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProduct } from "@/types";
import { Loader } from "lucide-react";
import { updateProduct } from "@/service";

// Definir el esquema de validación con yup
const schema = yup.object().shape({
  name: yup.string().required("El nombre del producto es obligatorio"),
  description: yup.string().optional(),
});

export const EdithProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useProductById(id || "");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProduct>({
    resolver: yupResolver(schema),
  });

  const updateProductMutation = useMutation({
    mutationFn: async (data: UpdateProduct) => {
      const response = await updateProduct(id!, data);
      return response;
    },
    onSuccess: () => {
      toast.success(`Producto actualizado exitosamente`);
      queryClient.invalidateQueries({
        queryKey: ["product", `${id}`],
        exact: true,
      });
      navigate("/app/product");
    },
    onError: (data) =>
      toast.error(
        `Error al actualizar el producto: ${JSON.stringify(
          (data as any).response.data.message
        )}`
      ),
  });

  const onSubmit: SubmitHandler<UpdateProduct> = async (data) => {
    try {
      await updateProductMutation.mutate(data);
    } catch (error) {
      const msg = (error as any)?.response?.data?.message;
      toast.error(`Error al actualizar el producto: ${msg}`);
    }
  };

  // Reset form with product data when product is loaded
  //   if (data) {
  //     reset(data);
  //   }

  return (
    <div>
      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Editar Producto</CardTitle>
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
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    defaultValue={data.description}
                    {...register("description")}
                    required
                  />
                  {errors.description && (
                    <span className="text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>
              <Button
                className="mt-4"
                type="submit"
                disabled={updateProductMutation.isPending}
              >
                {updateProductMutation.isPending ? (
                  <span className="flex justify-center items-center gap-4">
                    <Loader className="animate-spin" />
                  </span>
                ) : (
                  "Actualizar Producto"
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
