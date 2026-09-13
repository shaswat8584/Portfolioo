import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
];

function Navbar() {
  const { pathname } = useLocation();

  const listRef = useRef(null);
  const itemRefs = useRef([]);

  const [pill, setPill] = useState(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme;
      return "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const activeIndex = navItems.findIndex((item) =>
    item.path === "/" ? pathname === "/" : pathname.startsWith(item.path),
  );

  useLayoutEffect(() => {
    const updatePill = () => {
      const list = listRef.current;
      const activeItem = itemRefs.current[activeIndex];

      if (!list || !activeItem) {
        setPill(null);
        return;
      }

      const listRect = list.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      setPill({
        x: itemRect.left - listRect.left,
        width: itemRect.width,
      });
    };

    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [activeIndex, pathname]);

  return (
    <nav className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-black/90 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all duration-300">
        {/* Navigation */}
        <ul ref={listRef} className="relative flex items-center gap-1">
          {/* Active pill */}
          {pill && (
            <motion.span
              className="absolute top-0 bottom-0 rounded-full border border-white/[0.08] bg-white/[0.08] shadow-sm"
              animate={{
                x: pill.x,
                width: pill.width,
              }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 32,
              }}
            />
          )}

          {navItems.map((item, index) => {
            const active = index === activeIndex;

            return (
              <li
                key={item.path}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="relative"
              >
                <Link
                  to={item.path}
                  className="relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors"
                >
                  <span
                    className={
                      active
                        ? "text-white"
                        : "text-neutral-400 hover:text-white"
                    }
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Theme button */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
