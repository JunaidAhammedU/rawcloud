"use client";
import React from "react";
import { motion } from "framer-motion";
import { TbCloud, TbShieldLock } from "react-icons/tb";
import Image from "next/image";

const AuthLayoutClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand/5"
            initial={{ scale: 0.8, opacity: 0.3 }}
            animate={{
              scale: [0.8, 1, 0.8],
              opacity: [0.3, 0.5, 0.3],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 15}%`,
              width: `${150 - i * 20}px`,
              height: `${150 - i * 20}px`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md">
        {/* Logo and brand */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mb-4 flex justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative flex flex-col w-full items-center text-2xl font-bold text-brand ">
              <Image
                src="/assets/images/rawCloud.png"
                alt="logo"
                width={100}
                height={100}
                className="hidden h-auto md:block"
              />
              Raw Cloud
              <p className="text-gray-500 text-sm"> Secure Cloud Storage</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Form container */}
        <motion.div
          className="relative overflow-hidden rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />
          <div className="relative p-8">{children}</div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <a href="#" className="hover:text-brand">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="#" className="hover:text-brand">
            Terms of Service
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayoutClient;
