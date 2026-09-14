import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";

const EMAIL = "shaswatkumar8584@gmail.com";

const EASE = [0.22, 1, 0.36, 1];

function ContactButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      const textarea = document.createElement("textarea");

      textarea.value = EMAIL;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.select();

      try {
        document.execCommand("copy");

        setCopied(true);

        window.setTimeout(() => {
          setCopied(false);
        }, 1600);
      } catch {}

      document.body.removeChild(textarea);
    }
  };

  return (
    <motion.button
      type="button"
      layout
      onClick={handleCopy}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-label={
        copied
          ? "Email copied"
          : open
            ? `Copy ${EMAIL}`
            : "Show email"
      }
      transition={{
        layout: {
          duration: 0.55,
          ease: EASE,
        },
      }}
      className="
        relative
        inline-flex
        h-11
        cursor-pointer
        items-center
        justify-center
        rounded-xl
        bg-white
        px-5
        text-sm
        font-medium
        text-black
      "
    >
      <motion.span
        layout="position"
        className="relative inline-flex items-center"
      >
        <AnimatePresence
          initial={false}
          mode="popLayout"
        >
          {open ? (
            <motion.span
              key="email"
              layout="position"
              initial={{
                opacity: 0,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                filter: "blur(8px)",
              }}
              transition={{
                duration: 0.35,
                ease: EASE,
              }}
              className="
                inline-flex
                items-center
                gap-2
                whitespace-nowrap
              "
            >
              <span className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center">
                <AnimatePresence
                  initial={false}
                  mode="wait"
                >
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{
                        scale: 0.5,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      exit={{
                        scale: 0.5,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: EASE,
                      }}
                    >
                      <Check
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{
                        scale: 0.5,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      exit={{
                        scale: 0.5,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: EASE,
                      }}
                    >
                      <Copy
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>

              <span className="tabular-nums">
                {EMAIL}
              </span>
            </motion.span>
          ) : (
            <motion.span
              key="contact"
              layout="position"
              initial={{
                opacity: 0,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                filter: "blur(8px)",
              }}
              transition={{
                duration: 0.35,
                ease: EASE,
              }}
              className="
                inline-flex
                items-center
                gap-2
                whitespace-nowrap
              "
            >
              <Mail
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              />

              <span>Contact</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </motion.button>
  );
}

export default ContactButton;
