"use client";

import { Container, Divider } from "@lawallet/ui";
import Footer from "./components/Footer";
import { NomadTest } from "./components/NomadTest";
import { NextProvider } from "@lawallet/ui/next";
import { appTheme } from "../config/exports";

export default function Page(): JSX.Element {
  return (
    <NextProvider theme={appTheme}>
      <Container>
        <NomadTest />
      </Container>

      <Divider y={100} />
      <Footer />
    </NextProvider>
  );
}
