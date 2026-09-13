import { ArrowRight, Mail } from "lucide-react";
import { motion } from "motion/react";
import Typewriter from "./Typewriter";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
  },

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

function HeroLeft() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-center"
    >
      {/* Greeting */}
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
        className="
          text-5xl
          font-bold
          leading-[1.08]
          tracking-tight
          text-white
          sm:text-6xl
          lg:text-[4rem]
          xl:text-[4.25rem]
        "
      >
        <span className="block text-white">I’m a</span>
        <span className="block mt-1 sm:mt-1.5">
          <Typewriter />
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="
          mt-6
          max-w-lg
          text-base
          font-normal
          leading-relaxed
          text-neutral-400
          sm:text-lg
        "
      >
        I build modern web applications, explore AI, and turn ideas into useful
        digital experiences.
      </motion.p>

      {/* Buttons */}
      <motion.div
        variants={itemVariants}
        className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
      >
        {/* Contact */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="
            group
            flex
            items-center
            gap-2.5
            rounded-xl
            bg-white
            px-6
            py-3.5
            text-sm
            sm:text-base
            font-medium
            text-black
            shadow-sm
            transition-colors
            duration-200
            hover:bg-neutral-100
          "
        >
          <Mail size={18} />
          <span>Contact</span>
        </motion.a>

        {/* View My Work */}
        <motion.a
          href="#projects"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="
            group
            flex
            items-center
            gap-2.5
            rounded-xl
            border
            border-white/15
            bg-white/[0.04]
            backdrop-blur-md
            px-6
            py-3.5
            text-sm
            sm:text-base
            font-medium
            text-white
            transition-all
            duration-200
            hover:border-white/30
            hover:bg-white/[0.08]
          "
        >
          <span>View My Work</span>

          <ArrowRight
            size={18}
            className="
              transition-transform
              duration-200
              group-hover:translate-x-1
            "
          />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export default HeroLeft;
