"use client";

import React, { useCallback, useState } from "react";
import Logo from "./logo";
import { Input } from "./ui/input";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Loader, MessageSquareText, Plus, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import useRegister from "@/hooks/use-register";
import useLogin from "@/hooks/use-login";
import useCurrentUser from "@/hooks/api/use-current-user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutMutationFn } from "@/lib/fetcher";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { onOpen: onRegisterOpen } = useRegister();
  const { onOpen: onLoginOpen } = useLogin();
  const { data: userData, isPending: isUserLoading } = useCurrentUser();
  const user = userData?.user;

  const queryClient = useQueryClient();
  const { mutate, isPending: isLogoutPending } = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      router.push("/");
    },
    onError: () => {
      toast.error("Logout Failed", {
        description: "Please try again.",
        style: {
          padding: "1rem",
          borderRadius: "0.5rem",
          backgroundColor: "#dc2626",
          color: "#ffffff",
        },
      });
    },
  });

  const handleLogout = useCallback(() => {
    mutate();
  }, [mutate]);

  const handleSell = () => {
    if (!user) {
      onLoginOpen();
    } else {
      router.push("/my-shop/add-listing");
    }
  };

  const hideSearchPathname = ["/", "/my-shop/add-listing", "/profile-messages"];
  const hideNavPath = ["/my-shop", "/my-shop/add-listing", "/profile-messages"];

  const NavLink = ({
    href,
    children,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
  }) => {
    const isActive = pathname === href;
    return (
      <li>
        <Link
          href={href}
          onClick={onClick}
          className={`block py-2 px-4 text-sm font-medium transition-colors duration-200 ${
            isActive ? "text-[#dc2626]" : "text-white hover:text-[#dc2626]"
          }`}
        >
          {children}
        </Link>
      </li>
    );
  };

  return (
    <header
      className="w-full px-3 md:px-0 sticky top-0 z-40 h-14 bg-black/40 backdrop-blur text-white"
      style={{
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        background: `linear-gradient(135deg, #0a0a0a 0%, #1b263b 100%)`,
      }}
    >
      <nav className="flex items-center h-full w-full max-w-7xl mx-auto">
        {/* Logo */}
        <Logo />

        {/* Mobile Menu (Sheet) */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden ml-4 ">
              <Menu className="h-6 w-6  !hover:bg-transparent" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="bg-[#1b263b] p-0 w-[260px]">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <Logo />
             
            </div>

            <ul className="flex flex-col  gap-2 p-4">
              <NavLink href="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink href="/services" onClick={() => setMobileMenuOpen(false)}>
                Services & Repair
              </NavLink>
              <NavLink href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </NavLink>
            </ul>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex flex-1 items-center justify-center mx-6 ">
          {!hideSearchPathname.includes(pathname) && (
            <li className="w-full max-w-[320px]">
              <Input
                type="search"
                name="keyword"
                placeholder="Search..."
                className="h-10 w-full rounded-lg text-white bg-black/50 border border-gray-700 focus:border-gray-300"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </li>
          )}

          {!hideNavPath.includes(pathname) && (
            <>
              <NavLink href="/">Home</NavLink>
              <NavLink href="/services">Services & Repair</NavLink>
              <NavLink href="/pricing">Pricing</NavLink>
            </>
          )}
        </ul>

        {/* Right Side Controls */}
        <div className="ml-auto flex items-center gap-4">
          {isUserLoading || isLogoutPending ? (
            <Loader className="w-5 h-5 animate-spin text-white" />
          ) : !user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onLoginOpen}
                className="text-sm text-blue-300 hover:text-blue-100 transition"
              >
                Sign In
              </button>
              <Separator orientation="vertical" className="h-4 bg-gray-500" />
              <button
                onClick={onRegisterOpen}
                className="text-sm text-pink-300 hover:text-pink-100 transition"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <>
              

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="outline-none border border-[#dc2626] rounded-full">
                    <Avatar className="h-9 w-9 bg-red-600 text-white">
                      <AvatarFallback className="bg-gray-800 uppercase text-white">
                        {user?.name?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-[#1b263b] border border-gray-700 text-white w-56"
                >
                  <DropdownMenuItem
                    onClick={() => router.push("/my-shop")}
                    className="cursor-pointer hover:bg-[#0a0a0a]"
                  >
                    My Shop
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-600" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLogoutPending}
                    className="cursor-pointer hover:bg-[#0a0a0a]"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          <Button
            onClick={handleSell}
            className="bg-red-600 hover:bg-red-700 text-white px-5 h-10 shadow-md flex gap-2 items-center"
          >
            <Plus size={18} /> Sell Car
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;

