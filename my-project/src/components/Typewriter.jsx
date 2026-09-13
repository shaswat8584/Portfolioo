import { useEffect, useState } from "react";
import { motion } from "motion/react";

const words = [
  "Full Stack Developer",
  "Software Engineer",
  "AI Enthusiast",
  "Problem Solver",
];

function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting) {
      if (text.length < currentWord.length) {
        // Natural typing cadence (60ms - 85ms)
        const delay = 65 + Math.random() * 20;
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, delay);
      } else {
        // Full word typed: pause so the user can read comfortably
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (text.length > 0) {
        // Deleting: crisp and snappy (35ms)
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, 35);
      } else {
        // Finished deleting: pause cleanly before next word starts
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 400);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <span className="inline-flex items-baseline font-semibold whitespace-nowrap">
      {/* High-end gradient text */}
      <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
        {text || "\u00A0"}
      </span>

      {/* Luminous breathing cursor */}
      <motion.span
        aria-hidden="true"
        className="ml-1.5 inline-block w-[3px] h-[0.78em] rounded-full bg-white align-baseline shadow-[0_0_10px_rgba(255,255,255,0.75)]"
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </span>
  );
}

export default Typewriter;
