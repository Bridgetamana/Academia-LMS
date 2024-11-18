import Link from "next/link";

const Logo = () => {
  return (
    <div className="">
      <Link href="/" className="flex items-center">
        <div className="bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
          <span className="text-lg font-mono">A</span>
        </div>
        <span className="font-semibold text-lg text-neutral-900">cademia</span>
      </Link>
    </div>
  );
};

export default Logo;
