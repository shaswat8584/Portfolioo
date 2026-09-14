import { Mail } from "lucide-react";
import { motion } from "motion/react";
import ShaderBackground from "../ShaderBackground";
import ContactCardCtas from "./ContactCardCtas";

function LinkedinIcon({ size = 17, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66 1.65 1.65 0 0 0-1.66-1.66z" />
    </svg>
  );
}

function XIcon({ size = 15, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ContactCard() {
  return (
    <section
      id="contact"
      className="mx-auto mt-20 mb-8 sm:mb-12 w-full max-w-6xl px-6 sm:px-10"
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          filter: "blur(8px)",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          w-full
          overflow-hidden
          rounded-[2rem]
          border
          border-white/[0.08]
          bg-[#080808]
          p-1.5
          shadow-sm
        "
      >
        <div className="relative overflow-hidden rounded-[1.6rem]">
          {/* Background Shader inside Contact Card (Compact size & smooth glow) */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              overflow-hidden
              opacity-40
            "
          >
            <ShaderBackground standalone={true} scale={9} brightness={1.1} />
          </div>

          {/* Vignette so text and right sub-card remain crisp and prominent */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-60
              [background:radial-gradient(ellipse_100%_100%_at_25%_40%,transparent_0%,rgba(8,8,8,0.75)_65%,rgba(8,8,8,0.95)_100%)]
            "
          />

          {/* Content */}
          <div
            className="
              relative
              grid
              gap-8
              p-6
              sm:gap-10
              sm:p-8
              md:grid-cols-[1.2fr_1fr]
              md:items-stretch
              md:gap-6
            "
          >
            {/* LEFT */}
            <div className="flex flex-col gap-5">
              <h2
                className="
                  text-[2.5rem]
                  font-medium
                  leading-[1.05]
                  tracking-tight
                  text-white
                  sm:text-[3rem]
                  lg:text-[3.5rem]
                "
              >
                Let's connect
              </h2>

              <p
                className="
                  mb-6
                  max-w-[32ch]
                  text-lg
                  leading-[1.4]
                  tracking-tight
                  text-white/60
                  sm:text-xl
                "
              >
                I'm always open to discussing new projects, creative ideas, or
                opportunities to build something meaningful together.
              </p>

              <ContactCardCtas />
            </div>

            {/* RIGHT */}
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                gap-6
                rounded-[1.1rem]
                border
                border-white/[0.08]
                bg-black
                p-6
                sm:p-8
              "
            >
              {/* Social icons */}
              <div className="flex items-center gap-3">
                <SocialIcon
                  href="mailto:shaswatkumar8584@gmail.com"
                  label="Email"
                >
                  <Mail size={17} />
                </SocialIcon>

                <SocialIcon
                  href="https://www.linkedin.com/"
                  label="LinkedIn"
                  external
                >
                  <LinkedinIcon size={17} />
                </SocialIcon>

                <SocialIcon href="https://x.com/" label="X (Twitter)" external>
                  <XIcon size={15} />
                </SocialIcon>
              </div>

              {/* Small text */}
              {/* <div className="flex flex-col items-center gap-1 text-center">
                <p className="text-[13px] tracking-tight text-white/60">
                  2026 © Shaswat Kumar
                </p>

                <p className="text-[12px] tracking-tight text-white/35">
                  Built with React
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SocialIcon({ href, label, children, external = false }) {
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="
        inline-flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-white/[0.1]
        bg-white/[0.03]
        text-white/60
        transition-all
        duration-200
        hover:border-white/[0.2]
        hover:bg-white/[0.08]
        hover:text-white
      "
    >
      {children}
    </a>
  );
}

export default ContactCard;
