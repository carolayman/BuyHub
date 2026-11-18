"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  ShoppingCart,
  User,
  Mail,
  Lock,
  Phone,
  ShieldCheck,
  Truck,
  RotateCcw,
  Info,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerSchema, registerSchemaType } from "../../schema/register.schema";

const FormFields = [
  { name: "name", type: "text", label: "Full name", placeholder: "Enter your full name", autoComplete: "name", icon: User },
  { name: "email", type: "email", label: "Email address", placeholder: "you@example.com", autoComplete: "email", icon: Mail },
  { name: "phone", type: "tel", label: "Phone number", placeholder: "01XXXXXXXXX", autoComplete: "tel", icon: Phone },
  { name: "password", type: "password", label: "Password", placeholder: "Create a password", autoComplete: "new-password", icon: Lock },
  { name: "rePassword", type: "password", label: "Confirm password", placeholder: "Repeat your password", autoComplete: "new-password", icon: Lock },
] as const;

const Benefits = [
  { icon: Truck, title: "Convenient delivery", description: "Your orders, delivered to your door" },
  { icon: ShieldCheck, title: "Easy checkout", description: "Your shopping details in one place" },
  { icon: RotateCcw, title: "Order tracking", description: "Stay updated on your purchases" },
];

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    rePassword: false,
  });

  const router = useRouter();

  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const handleRegister = async (values: registerSchemaType) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.ok && data.message === "success") {
        toast.success("Registered successfully!");
        router.push("/login");
      } else {
        toast.error(data.message || "Registration failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-76px)] bg-gray-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60 lg:grid-cols-2">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 p-10 text-white lg:flex">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[40px] border-white/10" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-emerald-300/20 blur-sm" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Buy<span className="text-green-200">Hub</span>
              </span>
            </Link>

            <h2 className="mt-12 text-4xl font-bold leading-tight tracking-tight">
              Your next favorite thing is just a click away.
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-green-50">
              Create your account and make shopping simpler. Discover products,
              save your favorites, and keep track of every order.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            {Benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/10">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 text-xs text-green-100">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="relative z-10 text-xs text-green-100">
            Your everyday shopping starts here.
          </p>
        </aside>

        <div className="p-5 sm:p-8 lg:p-10">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-3 lg:hidden"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm">
              <ShoppingCart className="h-5 w-5" />
            </span>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Buy<span className="text-green-600">Hub</span>
            </span>
          </Link>

          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Create Account
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-green-600 hover:text-green-700"
              >
                Log in
              </Link>
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(handleRegister)}
            noValidate
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {FormFields.map(
                ({ name, type, label, placeholder, autoComplete, icon: Icon }) => (
                  <div
                    key={name}
                    className={
                      name === "name" ||
                      name === "email" ||
                      name === "phone"
                        ? "sm:col-span-2"
                        : ""
                    }
                  >
                    <label
                      htmlFor={name}
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      {label}
                    </label>

                    <Controller
                      name={name}
                      control={form.control}
                      render={({ field, fieldState }) => {
                        const isPassword =
                          name === "password" || name === "rePassword";

                        return (
                          <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1.5"
                          >
                            <div className="group relative">
                              <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-green-600" />

                              <Input
                                {...field}
                                id={name}
                                type={
                                  isPassword
                                    ? showPassword[name]
                                      ? "text"
                                      : "password"
                                    : type
                                }
                                placeholder={placeholder}
                                autoComplete={autoComplete}
                                aria-invalid={fieldState.invalid}
                                className={`h-10 rounded-xl border-gray-200 bg-gray-50/80 pl-10 text-sm text-gray-900 transition placeholder:text-gray-400 hover:border-gray-300 focus-visible:border-green-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-green-500/10 aria-invalid:border-red-400 aria-invalid:ring-4 aria-invalid:ring-red-500/10 ${
                                  isPassword ? "pr-10" : ""
                                }`}
                              />

                              {isPassword && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowPassword((prev) => ({
                                      ...prev,
                                      [name]: !prev[name],
                                    }))
                                  }
                                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded"
                                  aria-label={
                                    showPassword[name]
                                      ? "Hide password"
                                      : "Show password"
                                  }
                                >
                                  {showPassword[name] ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </button>
                              )}
                            </div>

                            {fieldState.error && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </div>
                )
              )}
            </div>

            <div className="flex items-start gap-2 rounded-xl border border-green-100 bg-green-50/60 p-3 text-xs leading-5 text-gray-600">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <p>
                Use at least 6 characters for your password and enter a valid
                11-digit Egyptian phone number.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="group h-12 w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:from-green-700 hover:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Creating account..." : "Create account"}
              {!isLoading && (
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
