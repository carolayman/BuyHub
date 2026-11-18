"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react"
import {
  ShoppingCart,
  Mail,
  Lock,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowRight,
  LogIn,
  Eye,
  EyeOff,
} from "lucide-react";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, loginSchemaType } from "../../schema/login.schema";

const FormFields = [
  { name: "email", type: "email", label: "Email address", placeholder: "you@example.com", autoComplete: "email", icon: Mail },
  { name: "password", type: "password", label: "Password", placeholder: "Enter your password", autoComplete: "current-password", icon: Lock },
] as const;

const Benefits = [
  { icon: Truck, title: "Convenient delivery", description: "Your orders, delivered to your door" },
  { icon: ShieldCheck, title: "Secure shopping", description: "A simple and secure checkout" },
  { icon: RotateCcw, title: "Order tracking", description: "Stay updated on your purchases" },
];

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<loginSchemaType>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const handleLogin = async (values: loginSchemaType) => {
    setIsLoading(true);

    try {
      const response = await signIn("credentials",{
        email:values.email,
        password:values.password,
        redirect:false,
        callbackUrl:"/" // if email and password are true redirect to home
      })
      if (response?.ok){
        toast.success("Login successful!");
        router.refresh();
        router.push("/");
        // window.location.href = "/"; // to reload the page and update the session state
      }
      else{
      toast.error(response?.error || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-gray-50 px-4 py-8 sm:px-6">
      <div className="mx-auto grid w-full max-w-4xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60 lg:grid-cols-2">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 p-8 text-white lg:flex">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-300/20 blur-sm" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                <ShoppingCart className="h-5 w-5" />
              </span>
              <span className="text-2xl font-bold tracking-tight">
                Buy<span className="text-green-200">Hub</span>
              </span>
            </Link>

            <h2 className="mt-10 text-3xl font-bold leading-tight tracking-tight">
              Welcome back to your favorite shopping place.
            </h2>
            <p className="mt-4 text-sm leading-6 text-green-50">
              Sign in to explore products, manage your orders, and enjoy a smoother shopping experience.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            {Benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-xs text-green-100">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="relative z-10 text-xs text-green-100">
            Your everyday shopping starts here.
          </p>
        </aside>

        <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
          <Link href="/" className="mb-6 inline-flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
              <ShoppingCart className="h-5 w-5" />
            </span>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Buy<span className="text-green-600">Hub</span>
            </span>
          </Link>

          <div className="mb-6">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
              <LogIn className="h-3.5 w-3.5" />
              WELCOME BACK
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-green-600 transition hover:text-green-700">
                Create account
              </Link>
            </p>
          </div>

          <form onSubmit={form.handleSubmit(handleLogin)} noValidate className="space-y-4">
            {FormFields.map(({ name, type, label, placeholder, autoComplete, icon: Icon }) => (
              <div key={name}>
                <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-700">
                  {label}
                </label>

                <Controller
                  name={name}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1.5">
                      <div className="group relative">
                        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-green-600" />

                        <Input
                          {...field}
                          id={name}
                          type={name === "password" && showPassword ? "text" : type}
                          placeholder={placeholder}
                          autoComplete={autoComplete}
                          aria-invalid={fieldState.invalid}
                          className={`h-12 rounded-xl border-gray-200 bg-gray-50/80 pl-10 text-sm text-gray-900 transition placeholder:text-gray-400 hover:border-gray-300 focus-visible:border-green-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-green-500/10 aria-invalid:border-red-400 aria-invalid:ring-4 aria-invalid:ring-red-500/10 ${
                            name === "password" ? "pr-10" : ""
                          }`}
                        />

                        {name === "password" && (
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded text-gray-400 transition hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        )}
                      </div>

                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
            ))}

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Welcome back!</span>
              <Link href="/forgot-password" className="font-medium text-green-600 hover:text-green-700">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="group h-11 w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:from-green-700 hover:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Signing in..." : "Sign in"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            </Button>

            <p className="pt-1 text-center text-xs leading-5 text-gray-400">
              Sign in to access your account and manage your orders.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
