import Link from "next/link";

export function Footer() {
  return (
    <div className="h-40 bg-gray-100 mt-12 flex items-center">
      <div className="container mx-auto flex justify-between items-center sm:grid grid-cols-2 w-full ">
        <div className="hidden sm:block text-lg font-semibold">FileDrive</div>
        <div className="flex justify-center sm:justify-end col-span-2 sm:col-auto space-x-4">
          <Link className="text-blue-900 hover:text-blue-500" href="/privacy">
            Privacy Policy
          </Link>
          <Link
            className="text-blue-900 hover:text-blue-500"
            href="/terms-of-service"
          >
            Terms of Service
          </Link>
          <Link className="text-blue-900 hover:text-blue-500" href="/about">
            About
          </Link>
        </div>
      </div>
    </div>
  );
}
