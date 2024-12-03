"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// Components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
// Services
import { supabase } from "@/utils/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState();

  const router = useRouter();

  const { toast } = useToast();

  const handledSubmit = async () => {
    setError("");
    if (email === "" || password === "") {
      setError("Ingrese sus datos de usuario");
      return;
    }
    setLoading(true);
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (res.error) {
      toast({
        title: "Error",
        description: res.error.message,
        variant: "destructive",
      });
    } else {
      localStorage.setItem("access_token", res.data.session.access_token);
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen w-72 m-auto">
      <div>
        <h1 className="font-bold text-3xl text-center mt-8">Iniciar sesión</h1>
      </div>

      <section className="mt-8 w-full flex flex-col">
        <Form>
          <Label>
            Email
            <Input
              required
              name="email"
              type="email"
              className="mb-4"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Input>
          </Label>
          <Label>
            Contraseña
            <Input
              name="password"
              type="password"
              required
              className="mb-4"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Input>
          </Label>
          {error && <p className="text-red-500">{error}</p>}
          <Button onClick={handledSubmit}>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </Form>
      </section>
      <Toaster></Toaster>
    </div>
  );
}
