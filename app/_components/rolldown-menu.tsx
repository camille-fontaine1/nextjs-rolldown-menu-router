import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    // Close the rolldown menu when navigating to the previous page
    if (isOpen && !searchParams.has("open-menu")) {
      onClose();
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    if (isOpen) {
      router.push("?open-menu=true");
      setHidden(false);
      setTimeout(() => {
        setVisible(true);
      }, 10);
    } else {
      setVisible(false);
      setTimeout(() => {
        setHidden(true);
      }, 500);
    }
  }, [isOpen]);

  const menuClasses = classNames(
    "fixed bg-white w-full h-full transition-transform duration-500",
    { "-translate-y-full": !visible, "translate-y-0": visible },
    { hidden: hidden }
  );

  return (
    <div className={menuClasses}>
      <h2 className="sr-only">Navigation menu</h2>
      {children}
    </div>
  );
}
