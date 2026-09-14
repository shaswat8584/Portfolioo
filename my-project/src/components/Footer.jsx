import { ArrowUp } from "lucide-react";

function Footer() {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer
      id="footer"
      className="relative z-10 w-full overflow-hidden bg-gradient-to-b from-transparent via-[#030303]/90 to-[#000000] pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8"
    >
      {/* Soft atmospheric top divider line fading out towards the edges */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Top ambient radial glow matching the shader lighting */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent" />

      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24">
        {/* Massive Full-Width Outlined Text (Half-Hidden / Cut-off style) */}
        <div
          className="
            relative
            mt-2
            sm:mt-4
            w-full
            select-none
            pointer-events-none
            overflow-hidden
            flex
            justify-center
            items-end
          "
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.08) 75%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.08) 75%, rgba(0,0,0,0) 100%)",
          }}
        >
          <svg
            viewBox="0 0 1000 100"
            className="w-full h-auto block select-none"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <text
              x="50%"
              y="100"
              textAnchor="middle"
              fill="none"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="2.2"
              fontSize="120"
              fontWeight="900"
              letterSpacing="0.16em"
              textLength="970"
              lengthAdjust="spacing"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              SHASWAT
            </text>
          </svg>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-neutral-900 pt-6 text-xs text-neutral-500 sm:flex-row">
          <p className="tracking-tight">© CodeClub</p>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex cursor-pointer items-center gap-1 text-neutral-400 transition-colors hover:text-white"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
