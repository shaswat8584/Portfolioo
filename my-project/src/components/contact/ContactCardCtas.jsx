import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import ContactButton from "./ContactButton";

const EASE = [0.22, 1, 0.36, 1];

function ContactCardCtas() {
  return (
    <motion.div
      layout
      transition={{
        layout: {
          duration: 0.55,
          ease: EASE,
        },
      }}
      className="mt-2 flex flex-wrap items-center gap-3"
    >
      <ContactButton />

      <motion.a
        href="#projects"
        layout
        transition={{
          layout: {
            duration: 0.55,
            ease: EASE,
          },
        }}
        className="
          group
          inline-flex
          h-11
          items-center
          gap-2
          rounded-xl
          border
          border-white/[0.08]
          bg-white/[0.04]
          px-5
          text-sm
          font-medium
          text-white
          transition-colors
          hover:bg-white/[0.08]
        "
      >
        See projects

        <ArrowRight
          className="
            h-4
            w-4
            transition-transform
            duration-300
            group-hover:translate-x-0.5
          "
        />
      </motion.a>
    </motion.div>
  );
}

export default ContactCardCtas;
