import { motion } from "motion/react";
import PortraitMorph from "./PortraitMorph";

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    filter: "blur(12px)",
  },

  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function HeroRight() {
  return (
    <motion.div
      variants={imageVariants}
      className="flex justify-center md:justify-end"
    >
      <div
        className="
          aspect-square
          w-full
          max-w-md
          overflow-hidden
          rounded-[2rem]
          border
          border-white/[0.08]
          bg-white/[0.02]
          p-1.5
          shadow-2xl
        "
      >
        <div
          className="
            relative
            h-full
            w-full
            overflow-hidden
            rounded-[1.6rem]
            bg-neutral-900
          "
        >
          <PortraitMorph
            srcA="/profile.png"
            srcB="/profile-hover.png"
            alt="Shaswat Kumar"
            className="h-full w-full"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/[0.03]" />
        </div>
      </div>
    </motion.div>
  );
}

export default HeroRight;
