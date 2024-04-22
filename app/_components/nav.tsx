"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RolldownMenu } from "./rolldown-menu";
import { MenuLink } from "./menu-link";
import FocusTrap from "focus-trap-react";

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.querySelector("body")?.classList.toggle("overflow-hidden");
  }, [isMenuOpen]);

  return (
    <nav className={`fixed w-full`}>
      <FocusTrap active={isMenuOpen}>
        <div>
          <div className="p-4 flex justify-between items-center z-50 relative bg-white">
            <Link href="/" className="relative size-10">
              <Image
                src="/icon.png"
                alt=""
                fill={true}
                sizes="48px"
                className="object-contain"
                aria-hidden={true}
              />
              <span className="sr-only">Home</span>
            </Link>
            <button
              className="relative size-8"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Image
                src="/menu-burger.svg"
                alt=""
                fill={true}
                sizes="48px"
                className="object-contain"
                aria-hidden={true}
              />
              <span className="sr-only">Open Menu</span>
            </button>
          </div>
          <RolldownMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          >
            <ul className="mt-4 grid gap-4">
              <li>
                <MenuLink href="/" icon="house-chimney.svg" active>
                  Home
                </MenuLink>
              </li>
              <li>
                <MenuLink href="/notifications" icon="bell.svg">
                  Notifications
                </MenuLink>
              </li>
              <li>
                <MenuLink href="/" icon="settings.svg">
                  Settings
                </MenuLink>
              </li>
              <li>
                <MenuLink href="/#contact-us" icon="headset.svg">
                  Contact us
                </MenuLink>
              </li>
              <li className="border-t border-slate-300 pt-4">
                <MenuLink href="/" icon="sign-out-alt.svg">
                  Log out
                </MenuLink>
              </li>
            </ul>
          </RolldownMenu>
        </div>
      </FocusTrap>
    </nav>
  );
}
