"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { LoginInput } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/service";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

// Definir el esquema de validación con yup
const schema = yup.object().shape({
  username: yup.string().required("El nombre de usuario es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

export default function LoginPage() {
  const navigate = useNavigate();

  const { setToken } = useAuthStore();

  // Configurar react-hook-form con yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(schema),
  });

  const LoginMutation = useMutation({
    mutationFn: async (data: LoginInput) => {
      const response = await login(data);
      return response;
    },
    onSuccess: (data) => {
      setToken(data.token);
      toast.success(`Inicio de sesión exitoso`);
      navigate("/app");
    },
    onError: (data) =>
      toast.error(
        `Error al iniciar sesión: ${JSON.stringify(
          (data as any).response.data.message
        )}`
      ),
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      await LoginMutation.mutate(data);

      // navigate("/");
    } catch (error) {
      const msg = (error as any)?.response?.data?.message;
      toast.error(`Error al iniciar sesión: ${msg}`);
    } finally {
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Cabanilla Demo</CardTitle>
          <CardDescription className="text-center">
            Ingrese sus credenciales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  {...register("username")}
                  required
                />
                {errors.username && (
                  <span className="text-red-500">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  required
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <Button
              className="w-full mt-6"
              type="submit"
              disabled={LoginMutation.isPending}
            >
              {LoginMutation.isPending ? (
                <span className="flex justify-center items-center gap-4">
                  <Loader className="animate-spin" />
                </span>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>
        </CardContent>

        {/* FUNNCIONALIDAD PARA REUPERAR CONTRASEÑA */}

        {/* <CardFooter className="flex flex-col">
          <Link
            to="/forgot-password"
            className="text-sm text-primary underline mt-2"
          >
            Olvido su Contraseña?
          </Link>
        </CardFooter> */}
      </Card>
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
}
