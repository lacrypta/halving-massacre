"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Text,
  Button,
  Container,
  Flex,
  Divider,
  baseTheme as theme,
} from "@lawallet/ui";

import Twitter from "../Icons/Twitter";
import Github from "../Icons/Github";
import Discord from "../Icons/Discord";
import Eggs from "../Eggs";

import { FooterPrimitive } from "./style";

export default function Footer() {
  return (
    <FooterPrimitive>
      <Container>
        <div className='box'>
          <Flex flex={1} justify='space-between' gap={16}>
            <div className='copy'>
              <Flex align='center' gap={4}>
                <Text color={theme.colors.gray50}>made with</Text>
                <Eggs />
                <Text color={theme.colors.gray50}>by</Text>
              </Flex>
              <Divider y={8} />
              <Link href='https://lacrypta.ar/' target='_blank'>
                <Image
                  src='/la-crypta-logo.svg'
                  alt='LaCrypta logo'
                  width={135}
                  height={30}
                />
              </Link>
            </div>
            <div className='social'>
              <Link href='https://twitter.com/lawalletOk/' target='_blank'>
                <Twitter />
              </Link>
              <Link href='https://github.com/lawalletio/' target='_blank'>
                <Github />
              </Link>
              <Link href='https://discord.gg/skvz2HdcYJ' target='_blank'>
                <Discord />
              </Link>
            </div>
          </Flex>
        </div>
      </Container>
    </FooterPrimitive>
  );
}
