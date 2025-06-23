"use client";

import { Card, CardContent } from '@/components/ui/card';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import HeroFilter from './_common/hero-filter';

const HeroSection = () => {
  const fullTitle = "Find Your Car";
 

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.6]);
  const cardScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
  const floatY = useTransform(scrollYProgress, [0, 1], [0, -15]);

  // تعريف letterVariants مع نوع Variants
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.35,
        ease: "easeOut" as const, // استخدام 'as const' لتحديد القيمة كنوع ثابت
      },
    }),
  };

  // تعريف subtitleVariants مع نوع Variants
  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.02 + 0.6,
        duration: 0.25,
        ease: "easeOut" as const, // استخدام 'as const' لتحديد القيمة كنوع ثابت
      },
    }),
  };

  // const subtitleWords = subtitle.split(" ");

  return (
    <motion.section
      ref={containerRef}
      className="relative w-full min-h-[90vh] md:min-h-screen overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/car-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          y: backgroundY,
          scale: backgroundScale,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60" />
      </motion.div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 py-20 px-4 sm:px-6 relative z-10 h-full">
        <motion.div
          className="flex-1 max-w-xl w-full"
          style={{ opacity: cardOpacity, scale: cardScale }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="bg-gray-900/70 backdrop-blur-md rounded-3xl border border-gray-700/50 shadow-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-[-150%] w-[300%] h-full pointer-events-none"
              style={{
                background: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                filter: "blur(40px)",
              }}
              animate={{ x: ["-150%", "150%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <CardContent className="relative z-20 text-center text-white space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight select-none">
                <div className="flex justify-center flex-wrap gap-x-1 gap-y-2">
                  {fullTitle.split("").map((char, idx) => (
                    <motion.span
                      key={idx}
                      custom={idx}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                      style={{ textShadow: "0 2px 10px rgba(229, 231, 235, 0.3)" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>
              </h1>

              {/* <motion.p
                className="text-lg sm:text-xl md:text-2xl font-medium bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent select-none"
                initial="hidden"
                animate="visible"
              >
                {subtitleWords.map((word, wordIdx) => (
                  <React.Fragment key={wordIdx}>
                    <motion.span
                      custom={wordIdx}
                      variants={subtitleVariants}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                    {wordIdx < subtitleWords.length - 1 && "\u00A0"}
                  </React.Fragment>
                ))}
              </motion.p> */}

              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <HeroFilter />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;