import ReactOriginal from "@devicon/react/react/original";
import TailwindcssOriginal from "@devicon/react/tailwindcss/original";
import Html5Plain from "@devicon/react/html5/plain";
import Css3Plain from "@devicon/react/css3/plain";
import JavascriptPlain from "@devicon/react/javascript/plain";
import ReactrouterPlain from "@devicon/react/reactrouter/plain";
import NodejsPlain from "@devicon/react/nodejs/plain";
import ExpressOriginal from "@devicon/react/express/original";
import MongodbPlain from "@devicon/react/mongodb/plain";
import MysqlOriginal from "@devicon/react/mysql/original";
import PostgresqlPlain from "@devicon/react/postgresql/plain";
import JavaPlain from "@devicon/react/java/plain";
import CPlain from "@devicon/react/c/plain";
import GitPlain from "@devicon/react/git/plain";
import GithubOriginal from "@devicon/react/github/original";
import VscodePlain from "@devicon/react/vscode/plain";
import PostmanPlain from "@devicon/react/postman/plain";
import CanvaOriginal from "@devicon/react/canva/original";
import CloudflarePlain from "@devicon/react/cloudflare/plain";
import { Network } from "lucide-react";

/**
 * Devicon-powered icon mapping for every technology in the stack.
 * Uses "plain" variants (no background fills) where available so the
 * brightness(0) invert(1) filter produces clean white outlines instead
 * of solid white blobs. Falls back to "original" when no plain exists.
 */

export function TechIcon({ name, size = 15, className = "" }) {
  const sizeStr = `${size}px`;

  // Helper to wrap devicon components — white by default, original colors on hover
  const white = (icon) => (
    <span
      className={`
        inline-flex items-center
        [filter:brightness(0)_invert(1)]
        transition-[filter] duration-300 ease-out
        group-hover/badge:[filter:none]
        ${className}
      `}
    >
      {icon}
    </span>
  );

  switch (name) {
    // ── Frontend ──
    case "React":
      return white(<ReactOriginal size={sizeStr} />);

    case "Tailwind CSS":
      return white(<TailwindcssOriginal size={sizeStr} />);

    case "HTML":
      return white(<Html5Plain size={sizeStr} />);

    case "CSS":
      return white(<Css3Plain size={sizeStr} />);

    case "JavaScript":
      return white(<JavascriptPlain size={sizeStr} />);

    case "React Router":
      return white(<ReactrouterPlain size={sizeStr} />);

    // ── Backend ──
    case "Node.js":
      return white(<NodejsPlain size={sizeStr} />);

    case "Express.js":
      return white(<ExpressOriginal size={sizeStr} />);

    case "REST APIs":
      return (
        <Network
          size={size}
          strokeWidth={2}
          className={`text-white ${className}`}
        />
      );

    // ── Databases ──
    case "MongoDB":
      return white(<MongodbPlain size={sizeStr} />);

    case "MySQL":
      return white(<MysqlOriginal size={sizeStr} />);

    case "PostgreSQL":
      return white(<PostgresqlPlain size={sizeStr} />);

    // ── Programming & CS ──
    case "Java":
      return white(<JavaPlain size={sizeStr} />);

    case "C":
      return white(<CPlain size={sizeStr} />);

    // ── Tools & Platforms ──
    case "Git":
      return white(<GitPlain size={sizeStr} />);

    case "GitHub":
      return white(<GithubOriginal size={sizeStr} />);

    case "VS Code":
      return white(<VscodePlain size={sizeStr} />);

    case "Postman":
      return white(<PostmanPlain size={sizeStr} />);

    case "Canva":
      return white(<CanvaOriginal size={sizeStr} />);

    case "Cloudflare":
      return white(<CloudflarePlain size={sizeStr} />);

    default:
      return (
        <Network
          size={size}
          strokeWidth={2}
          className={`text-neutral-400 ${className}`}
        />
      );
  }
}
