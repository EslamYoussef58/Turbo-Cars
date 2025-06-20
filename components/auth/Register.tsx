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
import { signupSchema } from "@/validation/auth.validation";
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
import { registerMutationFn } from "@/lib/fetcher";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const Register = () => {
  
  const { open, onClose } = useRegister();
  const { onOpen } = useLogin();

const { mutate, isPending } = useMutation({
  mutationFn: registerMutationFn,
})

  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      shopName: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    const baseStyle = { padding: "1rem", borderRadius: "0.5rem" };
  
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["currentUser"],
        });
        toast.success("SignUp successful", {
          description: "",
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
          description: "SignUp failed. Please try again.",
          style: {
            ...baseStyle,
            backgroundColor: "#DC2626", 
            color: "#FFFFFF", 
          },
        });
      },
    });
  };

  const handleLoginOpen = () => {
    onClose();
    onOpen();
  };

  return (
    <Dialog open={open} onOpenChange={onClose} >
      <DialogContent className="sm:max-w-[425px] p-8 bg-[#0f172a] text-[#dc2626]  border-[#dc2626]">
        <DialogHeader>
          <DialogTitle className="text-[#dc2626] ">
            Create an account
          </DialogTitle>
          <DialogDescription className="text-red-700">
            Enter your details to register for an account.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#dc2626]">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      className="!h-10 text-white border-[#dc2626]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="shopName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Shop Name"
                      className="!h-10 text-white border-[#dc2626]"
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
              Register
            </Button>
          </form>
        </Form>

        <div className="mt-2 flex items-center justify-center">
          <p className="text-sm text-[#dc2626]">
            Already have an account?{" "}
            <button className="!text-[#f5f5f5] cursor-pointer" onClick={handleLoginOpen} type="button">Sign in</button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
