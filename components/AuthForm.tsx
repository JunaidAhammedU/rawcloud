"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.action";
import OTPModal from "./otpModal";
import { HiOutlineMail } from "react-icons/hi";
import { FiUser } from "react-icons/fi";

type FormType = "sign-in" | "sign-up";

const authSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullname:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState<string | null>(null);
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);

  // form schema.
  const formSchema = authSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
    },
  });

  // on submit.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const user =
        type === "sign-up"
          ? await createAccount({
              fullName: values.fullname || "",
              email: values.email || "",
            })
          : await signInUser({ email: values.email || "" });

      setAccountId(user.accountId);
      setIsOtpDialogOpen(true);
    } catch (error: any) {
      setErrorMessage("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="text-center">
            <div className="mb-4 inline-flex rounded-full bg-brand/10 p-3">
              <Image
                src={
                  type === "sign-in"
                    ? "/assets/icons/login.svg"
                    : "/assets/icons/user-plus.svg"
                }
                alt="auth icon"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {type === "sign-in" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm text-gray-600">
              {type === "sign-in"
                ? "Access your cloud storage securely"
                : "Start storing your files securely"}
            </p>
          </div>

          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormLabel className="mb-2 block text-sm font-medium text-gray-700">
                      Full Name
                    </FormLabel>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FiUser size={20} />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="pl-10 h-12 rounded-xl border-gray-200 bg-gray-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-brand/20"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="mt-1 text-sm text-red-500" />
                  </div>
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormLabel className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </FormLabel>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <HiOutlineMail size={20} />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="h-12 rounded-xl border-gray-200 bg-gray-50/50 pl-10 transition-all focus:bg-white focus:ring-2 focus:ring-brand/20"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="mt-1 text-sm text-red-500" />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="relative h-12 w-full overflow-hidden rounded-xl bg-brand px-6 font-medium text-white transition-all hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20"
            disabled={isLoading}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {type === "sign-in" ? "Sign In" : "Sign Up"}
              {isLoading ? (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={20}
                  height={20}
                  className="animate-spin"
                />
              ) : (
                <Image
                  src="/assets/icons/arrow-right.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </span>
          </Button>

          {errorMessage && (
            <p className="text-center text-sm text-red-500">*{errorMessage}</p>
          )}

          <div className="relative text-center">
            <div className="absolute inset-y-1/2 w-full border-t border-gray-200" />
            <span className="relative bg-white px-4 text-sm text-gray-500">
              or
            </span>
          </div>

          <div className="text-center text-sm">
            <p className="text-gray-600">
              {type === "sign-in"
                ? "New to Raw Cloud? "
                : "Already have an account? "}
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="font-medium text-brand hover:text-brand/80"
              >
                {type === "sign-in" ? "Create an account" : "Sign in"}
              </Link>
            </p>
          </div>
        </form>
      </Form>

      {accountId && (
        <OTPModal
          email={form.getValues("email")}
          accountId={accountId}
          open={isOtpDialogOpen}
          onClose={() => setIsOtpDialogOpen(false)}
        />
      )}
    </>
  );
};

export default AuthForm;
