"use client";

import ReactQRCode from "qrcode.react";
import { QRCode } from "./style";
import { appTheme } from "../../../config/exports";

interface ComponentProps {
  value: string;
  size?: number;
  borderSize?: number;
  showCopy?: boolean;
  textToCopy?: string;
}

export function QRStyled({
  value,
  size = 150,
  borderSize = 40,
}: ComponentProps) {
  return (
    <>
      <QRCode size={size + borderSize}>
        <ReactQRCode
          value={value}
          size={size}
          fgColor={appTheme.colors.black}
          bgColor={appTheme.colors.white}
        />
      </QRCode>
    </>
  );
}
