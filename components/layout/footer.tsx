export default function Footer() {
  const currentYear = new Date().getFullYear();
  const fullName = "Rendyansyah Sya'bany"

  return (
    <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center">
      <p className="text-gray-500 text-sm">
        Copyright © {currentYear}{" "}
        <a
          className="font-medium text-gray-800 transition-colors"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          {fullName}
        </a>
      </p>
    </div>
  );
}
