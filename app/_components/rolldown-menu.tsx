import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import classNames from "classnames";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function RolldownMenu({ isOpen, onClose, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hidden, setHidden] = useState(!isOpen);
  const [visible, setVisible] = useState(false);
  const titleId = useId();
  const rolldownMenuRef = useRef<HTMLDivElement | null>(null);

  const menuClasses = classNames(
    "fixed bg-white w-full h-full transition-transform duration-500",
    { "-translate-y-full": !visible, "translate-y-0": visible },
    { hidden: hidden }
  );

  useEffect(() => {
    // Close the rolldown menu when navigating to the previous page
    if (isOpen && !searchParams.has("open-menu")) {
      onClose();
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    if (isOpen) {
      showMenu();
    } else {
      hideMenu();
    }
  }, [isOpen]);

  function showMenu() {
    router.push("?open-menu=true");
    setHidden(false);
    setTimeout(() => {
      setVisible(true);
      rolldownMenuRef.current?.focus();
    }, 0);
  }

  function hideMenu() {
    setVisible(false);
    setTimeout(() => {
      setHidden(true);
    }, 500);
  }

  return (
    <div
      className={menuClasses}
      aria-labelledby={titleId}
      tabIndex={-1}
      ref={rolldownMenuRef}
    >
      <h2 id={titleId} className="sr-only">
        Navigation menu
      </h2>
      {children}
    </div>
  );
}
