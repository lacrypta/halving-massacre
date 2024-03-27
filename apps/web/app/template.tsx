"use client";

import { NextProvider } from "@lawallet/ui/next";
import { appTheme } from "../config/exports";
import Footer from "./components/Footer";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <NextProvider theme={appTheme}>
      {children}
      <Footer />
    </NextProvider>
  );
}
