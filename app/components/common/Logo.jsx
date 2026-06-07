import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M12 3L2 21h4.5l2.5-4.5h6l2.5 4.5H22L12 3zm0 5.5l2.5 4.5h-5L12 8.5z"
              fill="currentColor"
            />
          </svg>
        </div>
        <span className="font-serif font-bold tracking-tight text-xl text-text-main">
          Academia
        </span>
      </Link>
    </div>
  );
};

export default Logo;
