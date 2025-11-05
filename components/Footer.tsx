"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Left: Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Orizonix
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              Where Ideas Meet The Horizon
            </p>
          </motion.div>

          {/* Center: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-center"
          >
            <nav className="flex flex-col md:flex-row gap-4 justify-center text-sm">
              <a
                href="#services"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-accent-dark transition-colors"
              >
                Services
              </a>
              <a
                href="#pricing"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-accent-dark transition-colors"
              >
                Pricing
              </a>
              <a
                href="#features"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-accent-dark transition-colors"
              >
                Features
              </a>
              <a
                href="#portfolio"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-accent-dark transition-colors"
              >
                Portfolio
              </a>
              <a
                href="#contact"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-accent-dark transition-colors"
              >
                Contact
              </a>
            </nav>
          </motion.div>

          {/* Right: Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-end gap-4"
          >
            <motion.a
              href="https://linkedin.com/company/orizonix"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-accent-dark transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://instagram.com/orizonix"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-accent-dark transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://behance.net/orizonix"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-accent-dark transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.237 1.745 4.237 4.91 0 2.306-1.58 4.46-4.193 4.46-2.02 0-3.816-1.18-3.816-3.043 0-2.34 1.703-3.4 3.816-3.4 1.104 0 2.266.204 2.266.204v-2.543h-2.532c-1.944 0-2.886 1.18-2.886 2.696v1.765h-1.5v3.5h1.5v8.5h3.5v-8.5h3.5l.5-3.5h-4zM6.691 9.5c-1.9 0-3.252 1.533-3.252 3.752 0 2.219 1.352 3.752 3.252 3.752 1.899 0 3.252-1.533 3.252-3.752 0-2.219-1.353-3.752-3.252-3.752zm-1.024 5.5c-.55 0-.95-.45-.95-1.047 0-.597.4-1.047.95-1.047.55 0 .95.45.95 1.047 0 .597-.4 1.047-.95 1.047zm3.5-5.5c-1.9 0-3.252 1.533-3.252 3.752 0 2.219 1.352 3.752 3.252 3.752 1.899 0 3.252-1.533 3.252-3.752 0-2.219-1.353-3.752-3.252-3.752zm-1.024 5.5c-.55 0-.95-.45-.95-1.047 0-.597.4-1.047.95-1.047.55 0 .95.45.95 1.047 0 .597-.4 1.047-.95 1.047z" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
