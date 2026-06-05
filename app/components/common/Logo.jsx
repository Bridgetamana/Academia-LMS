import Link from "next/link";

const Logo = () => {
  return (
    <div className="">
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-primary text-white rounded-lg w-8 h-8 flex items-center justify-center shadow-sm">
          <span className="text-lg font-serif font-bold">A</span>
        </div>
        <span className="font-serif font-bold tracking-tight text-xl text-text-main">cademia</span>
      </Link>
    </div>
  );
};

export default Logo;
