"use client";

import type { Metadata } from "next";
// import { Loading } from "@/components/templates/Loading";
import { Suspense } from "react";
import { QueryProvider } from "@/context/QueryContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useResizeWindow from "@/hooks/useResizeWindow";

const toastConfig = {
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light",
  bodyClassName: "text-xs",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useResizeWindow();
  return (
    <QueryProvider>
      <ToastContainer {...toastConfig} />
      <Suspense>
        <div className="relative min-h-screen bg-custom-background bg-custom-position bg-custom-size-mb md:bg-custom-size bg-no-repeat">
          {/* <Loading /> */}
          {children}
        </div>
      </Suspense>
    </QueryProvider>
  );
}
