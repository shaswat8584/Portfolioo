import { Code2 } from "lucide-react";
import { motion } from "motion/react";
import PortraitMorph from "./PortraitMorph";

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
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
          relative
          aspect-[4/4.8]
          w-full
          max-w-[340px]
          sm:max-w-[380px]
          lg:max-w-[420px]
          overflow-hidden
          rounded-[2.5rem]
          border
          border-white/[0.08]
          bg-white/[0.02]
          p-1.5
          shadow-2xl
          backdrop-blur-sm
        "
      >
        <div
          className="
            relative
            h-full
            w-full
            overflow-hidden
            rounded-[2.25rem]
            bg-neutral-900
          "
        >
          <PortraitMorph
            srcA="/profile.png"
            srcB="/profile-hover.png"
            alt="Shaswat Kumar"
            className="h-full w-full"
          />

          {/* Vignette overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Bottom-right code badge matching reference */}
          <div className="pointer-events-none absolute bottom-5 right-5 flex items-center justify-center rounded-xl border border-white/10 bg-black/75 px-2.5 py-1.5 text-white/70 shadow-lg backdrop-blur-md">
            <Code2 size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HeroRight;
