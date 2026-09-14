import { motion } from "motion/react";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

function Hero() {
  return (
    <section id="home" className="flex min-h-[calc(100vh-2rem)] items-center px-6 py-20 sm:px-10 md:px-12 lg:px-20 xl:px-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
          mx-auto
          grid
          w-full
          max-w-7xl
          grid-cols-1
          items-center
          gap-12
          md:grid-cols-2
          lg:gap-20
        "
      >
        <HeroLeft />
        <HeroRight />
      </motion.div>
    </section>
  );
}

export default Hero;
