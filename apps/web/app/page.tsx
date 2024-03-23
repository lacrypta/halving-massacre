"use client";

import { Container, Divider, baseTheme } from "@lawallet/ui";
import Footer from "./components/Footer";
import { NomadTest } from "./components/NomadTest";
import { ThemeProvider } from "styled-components";

export default function Page(): JSX.Element {
  return (
    <ThemeProvider theme={baseTheme}>
      <Container>
        <NomadTest />
      </Container>
      <Divider y={100} />
      <Footer />
    </ThemeProvider>
  );
}
