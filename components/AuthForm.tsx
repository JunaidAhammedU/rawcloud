"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { createAccount } from "@/lib/actions/user.action";
import OTPModal from "./otpModal";

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
      const user = await createAccount({
        fullName: values.fullname || "",
        email: values.email || "",
      });
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 auth-form"
        >
          <h1 className="text-2xl font-bold">
            Sign {type === "sign-in" ? "In" : "Up"}
          </h1>
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your  email"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p className="error-message">*{errorMessage}</p>}
          <div className=" body-2 flex justify-center">
            <p className="text-gray-500">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Alredy have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="mr-1  font-medium text-brand"
            >
              {type === "sign-in" ? "sign-up" : "sign-in"}
            </Link>
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
