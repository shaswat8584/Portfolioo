import { ArrowUpRight, Mail } from "lucide-react";
import { motion } from "motion/react";
import Typewriter from "./Typewriter";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-2rem)] items-center px-8 sm:px-12 lg:px-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl"
      >
        {/* Status & Greeting badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-neutral-300">
              Hey 👋, I'm Shaswat
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          <span className="block sm:inline">I’m a </span>
          <span className="inline-block whitespace-nowrap">
            <Typewriter />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-400 sm:text-xl font-normal"
        >
          I build modern web applications, explore AI, and turn ideas into
          useful digital experiences.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 font-medium text-neutral-950 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]"
          >
            <Mail size={18} className="transition-transform duration-300 group-hover:scale-110" />
            <span>Contact</span>
          </motion.a>

          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-3.5 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08]"
          >
            <span>View My Work</span>
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
