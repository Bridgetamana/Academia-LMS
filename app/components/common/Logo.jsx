import Link from "next/link";
import LogoIcon from "./LogoIcon";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center gap-2 group">
        <LogoIcon />
        <span className="font-serif font-bold tracking-tight text-xl text-text-main">
          Academia
        </span>
      </Link>
    </div>
  );
};

export default Logo;
