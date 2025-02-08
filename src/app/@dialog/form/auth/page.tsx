"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignInForm } from "./_signin";
import { useState } from "react";
import { SignUpForm } from "./_signup";
import { cn } from "@/lib/utils";
import { ForgotPasswordForm } from "./_forgot-password";

type FormType = "login" | "signup" | "reset";

export default function Page() {
  const router = useRouter();
  const [activeForm, setActiveForm] = useState<FormType>("login");

  const getTransform = (formType: FormType) => {
    switch (activeForm) {
      case "login":
        return formType === "login"
          ? "translate-x-0"
          : formType === "signup"
          ? "translate-x-full"
          : "-translate-x-full";
      case "signup":
        return formType === "login"
          ? "-translate-x-full"
          : formType === "signup"
          ? "translate-x-0"
          : "translate-x-full";
      case "reset":
        return formType === "login"
          ? "translate-x-full"
          : formType === "signup"
          ? "-translate-x-full"
          : "translate-x-0";
    }
  };

  return (
    <Dialog open onOpenChange={(isOpen) => (isOpen ? {} : router.back())}>
      <DialogContent className="sm:max-w-[30rem]">
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only" />
        </DialogHeader>

        <DialogDescription className="sr-only" />

        <div
          className={cn(
            "flex flex-col overflow-x-hidden",
            "px-6 py-8 sm:px-10 gap-4 sm:gap-8"
          )}
        >
          <div className="flex flex-col relative">
            <SignInForm
              onRecoveryClick={() => setActiveForm("reset")}
              className={cn(
                "transition-all duration-300 ease-in-out",
                getTransform("login"),
                activeForm === "login"
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              )}
            />

            <SignUpForm
              className={cn(
                "transition-all duration-300 ease-in-out absolute",
                getTransform("signup"),
                activeForm === "signup"
                  ? "opacity-100 pointer-events-auto z-10"
                  : "opacity-0 pointer-events-none z-0"
              )}
            />

            <ForgotPasswordForm
              className={cn(
                "transition-all duration-300 ease-in-out absolute",
                getTransform("reset"),
                activeForm === "reset"
                  ? "opacity-100 pointer-events-auto z-10"
                  : "opacity-0 pointer-events-none z-0"
              )}
            />
          </div>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground text-xs">
              Or continue with
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button size="sm" variant="outline">
              <Image
                src="/github.svg"
                className="dark:invert"
                width={17}
                height={17}
                quality={50}
                alt="Login with GitHub"
              />
              <span>Github</span>
            </Button>

            <Button size="sm" variant="outline">
              <Image
                src="/google.svg"
                className="dark:invert"
                width={16}
                height={16}
                quality={50}
                alt="Login with Google"
              />
              <span>Google</span>
            </Button>

            <Button size="sm" variant="outline">
              <Image
                src="/meta.svg"
                className="dark:invert"
                width={18}
                height={18}
                quality={50}
                alt="Login with Meta"
              />
              <span>Meta</span>
            </Button>
          </div>

          <div className="text-center text-[0.84rem] flex items-center justify-center gap-2 mt-auto">
            {activeForm === "signup"
              ? "Already have an account?"
              : activeForm === "login"
              ? "Don't have an account?"
              : null}

            <Button
              size="fit"
              variant="secondary"
              type="button"
              className="px-[7px] py-[2px] text-[0.84rem]"
              onClick={() => {
                setActiveForm((f) => (f === "login" ? "signup" : "login"));
              }}
            >
              {activeForm === "login"
                ? "Sign Up"
                : activeForm === "signup"
                ? "Sign In"
                : "Login back"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
