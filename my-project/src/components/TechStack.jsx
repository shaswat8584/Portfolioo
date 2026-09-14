import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { TechIcon } from "./TechIcons";

const stackLayers = [
  {
    category: "Frontend",
    description: "Crafting clean and responsive interfaces",
    skills: [
      { name: "React", version: "19.3" },
      // { name: "Vite", version: "7" },
      { name: "Tailwind CSS", version: "4.3" },
      { name: "HTML", version: "HTML5" },
      { name: "CSS", version: "CSS3" },
      { name: "JavaScript", version: "JS" },
      { name: "React Router", version: "7.18" },
    ],
  },
  {
    category: "Backend",
    description: "Building APIs and application logic",
    skills: [
      { name: "Node.js", version: "25.2" },
      { name: "Express.js", version: "5.2" },
      { name: "REST APIs", version: "REST" },
      // { name: "JWT", version: "Auth" },
      // { name: "Mongoose", version: "9.10" },
    ],
  },
  {
    category: "Databases",
    description: "Managing and working with application data",
    skills: [
      { name: "MongoDB", version: "" },
      { name: "MySQL", version: "" },
      { name: "PostgreSQL", version: "" },
    ],
  },
  {
    category: "Programming & CS",
    description: "Strengthening core programming fundamentals",
    skills: [{ name: "Java" }, { name: "C" }],
  },
  {
    category: "Tools & Platforms",
    description: "Tools I use to build and ship projects",
    skills: [
      { name: "Git" },
      { name: "GitHub", version: "" },
      { name: "VS Code" },
      { name: "Postman" },
      { name: "Canva" },
      { name: "Cloudflare" },
    ],
  },
];

function TechStack() {
  return (
    <section
      id="tech-stack"
      className="mx-auto my-20 w-full max-w-6xl px-6 sm:px-10"
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
          amount: 0.15,
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
        <div className="relative overflow-hidden rounded-[1.6rem] bg-[#0c0c0e]/95 border border-white/[0.04]">
          {/* Subtle ambient lighting */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-25
              [background:radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.02)_50%,transparent_80%)]
            "
          />

          {/* Header */}
          <div className="p-6 sm:p-8 md:px-10 md:pt-8 md:pb-6">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              Technology Stack
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              18 technologies across 5 architectural layers
            </p>
          </div>

          {/* Architectural Rows */}
          <div className="divide-y divide-white/[0.06]">
            {stackLayers.map((layer) => (
              <div
                key={layer.category}
                className="
                  group
                  relative
                  grid
                  grid-cols-1
                  gap-4
                  p-6
                  transition-colors
                  duration-200
                  hover:bg-white/[0.02]
                  sm:px-8
                  md:grid-cols-[220px_1fr_auto]
                  md:items-center
                  md:gap-6
                  md:px-10
                  md:py-5
                "
              >
                {/* Layer Title & Description */}
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-white">
                    {layer.category}
                  </h3>
                  <p className="mt-0.5 text-xs text-neutral-400 leading-relaxed max-w-[210px]">
                    {layer.description}
                  </p>
                </div>

                {/* Badges container */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  {layer.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="
                        group/badge
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-neutral-900/70
                        px-3
                        py-1.5
                        text-xs
                        sm:text-[13px]
                        backdrop-blur-sm
                        transition-all
                        duration-200
                        hover:border-white/20
                        hover:bg-neutral-800/80
                        hover:scale-[1.03]
                      "
                    >
                      <TechIcon
                        name={skill.name}
                        size={15}
                        className="shrink-0"
                      />
                      <span className="font-semibold text-white tracking-tight">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Chevron */}
                <div className="hidden md:flex items-center justify-end">
                  <ChevronRight
                    size={16}
                    className="text-neutral-500 transition-all duration-200 group-hover:text-neutral-300 group-hover:translate-x-0.5"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.06] bg-black/40 px-6 sm:px-8 md:px-10 py-4 text-xs">
            <span className="text-neutral-400">
              Last stack audit: March 2026
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default TechStack;
