"use client";

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Premium gradient background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-black transition-colors duration-500" />

      {/* Subtle grid pattern - More refined in light mode */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-20 transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Premium accent gradient orbs - Light mode */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-primary-100/40 to-primary-200/20 rounded-full blur-3xl dark:hidden transition-opacity duration-500" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-purple-100/40 to-pink-100/20 rounded-full blur-3xl dark:hidden transition-opacity duration-500" />
    </div>
  );
}
