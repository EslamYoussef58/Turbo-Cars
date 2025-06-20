"use client";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/auth.validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useRegister from "@/hooks/use-register";
import useLogin from "@/hooks/use-login";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginMutationFn } from "@/lib/fetcher";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const Login = () => {
  const { open, onClose } = useLogin();
  const { onOpen } = useRegister();

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  })

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {

      email: "",
     
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const baseStyle = { padding: "1rem", borderRadius: "0.5rem" };
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["currentUser"],
        });
        toast.success("Sign In successful", {
          description: "You have been logged in successfully",
          style: {
            ...baseStyle,
            backgroundColor: "#2BB389", 
            color: "#FFFFFF", 
          },
        });
        form.reset();
        onClose();
      },
      onError: () => {
        toast.error("Error occurred", {
          description: "Sign In failed. Please try again.",
          style: {
            ...baseStyle,
            backgroundColor: "#DC2626", 
            color: "#FFFFFF", 
          },
        });
      },
    })
  };

  const handleRegisterOpen = () => {
    onClose();
    onOpen();
  }

  return (
    <Dialog open={open} onOpenChange={onClose} >
      <DialogContent className="sm:max-w-[425px] p-8 bg-[#0f172a] text-[#dc2626]  border-[#dc2626]">
        <DialogHeader>
          <DialogTitle className="text-[#dc2626]">
          Sign in to your account
          </DialogTitle>
          <DialogDescription className="text-red-700">
          Enter your email and password to login
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#dc2626]">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mail@example.com"
                      type="email"
                      className="!h-10 text-white border-[#dc2626] "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      type="password"
                      className="!h-10 text-white border-[#dc2626]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="lg" disabled={isPending}  className="w-full bg-[#dc2626] text-[#f5f5f5] hover:bg-red-800 cursor-pointer" type="submit">
              {isPending && <Loader className="w-4 h-4 animate-spin"/>}
              Login
            </Button>
          </form>
        </Form>

        <div className="mt-2 flex items-center justify-center">
          <p className="text-sm text-[#dc2626]">
          Dont't have an account?{" "}
            <button className="!text-[#f5f5f5] cursor-pointer" onClick={handleRegisterOpen} type="button">Sign Up</button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
