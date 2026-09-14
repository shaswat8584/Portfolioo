import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Transform, Triangle } from "ogl";

const vertexShader = `
  attribute vec2 position;

  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uFlowSpeed;
  uniform float uScale;
  uniform float uBrightness;
  uniform int uIterations;

  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  uniform vec3 uBackground;

  float noise(vec2 p) {
    return sin(
      p.x + sin(p.y + uTime * uFlowSpeed.x)
    ) * sin(
      p.y * p.x * 0.1 + uTime * uFlowSpeed.y
    );
  }

  float fade(float d) {
    float t = clamp(1.0 - d, 0.0, 1.0);

    return t * t * (3.0 - 2.0 * t);
  }

  void main() {

    vec2 frag = gl_FragCoord.xy / uResolution;

    vec2 p = frag - 0.5;

    // Correct for screen aspect ratio
    p.x *= uResolution.x / uResolution.y;

    p *= uScale;

    float motionTime = uTime * 2.5 * 0.1;

    vec2 movement =
      vec2(
        sin(motionTime),
        cos(motionTime)
      ) * 0.1;

    float twist = 50.0 * 0.01;
    float deformation = 1.0 / 200.0;

    vec2 offset = vec2(0.05, 0.0);

    vec2 result = vec2(0.0);

    // Domain warping
    for (int i = 0; i < 24; i++) {

      if (i >= uIterations)
        break;

      float a = noise(p);
      float b = noise(p + offset.xy);
      float c = noise(p + offset.yx);

      vec2 q =
        vec2(b - a, c - a) * 20.0;

      p +=
        vec2(-q.y, q.x) * twist
        + q * deformation
        + movement;

      result = q;
    }

    float t =
      clamp(length(result) * 0.5, 0.0, 1.0);

    vec3 color =
      mix(
        uColorLow,
        uColorHigh,
        t
      ) * uBrightness;

    // Circular fade
    vec2 uv = vec2(
      frag.x,
      1.0 - frag.y
    );

    float aspect =
      uResolution.x / uResolution.y;

    float dx =
      ((uv.x - 0.5) * aspect) / 1.4;

    float dy =
      (uv.y - 0.0) / 0.6;

    float alpha =
      fade(
        sqrt(dx * dx + dy * dy)
      );

    vec3 finalColor =
      mix(
        uBackground,
        color,
        alpha
      );

    gl_FragColor =
      vec4(finalColor, 1.0);
  }
`;

function ShaderBackground({
  scale = 6,
  brightness = 1.3,
  speed = [0.1, 0.2],
  iterations = 14,
  standalone = false,
  className = "",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Create WebGL renderer
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 1.25),

      alpha: false,

      antialias: false,

      powerPreference: "high-performance",
    });

    const gl = renderer.gl;

    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    container.appendChild(gl.canvas);

    // Geometry
    const geometry = new Triangle(gl);

    // Shader program
    const program = new Program(gl, {
      vertex: vertexShader,

      fragment: fragmentShader,

      uniforms: {
        uTime: {
          value: 0,
        },

        uResolution: {
          value: [1, 1],
        },

        uFlowSpeed: {
          value: speed,
        },

        uScale: {
          value: scale,
        },

        uBrightness: {
          value: brightness,
        },

        uIterations: {
          value: iterations,
        },

        // Luminous silver / light gray base
        uColorLow: {
          value: [0.35, 0.38, 0.42],
        },

        // Vivid crisp white highlights
        uColorHigh: {
          value: [0.98, 0.98, 1.0],
        },

        // Background
        uBackground: {
          value: [0.03, 0.03, 0.03],
        },
      },
    });

    const mesh = new Mesh(gl, {
      geometry,
      program,
    });

    const scene = new Transform();

    mesh.setParent(scene);

    // Resize
    const resize = () => {
      const width = container.clientWidth;

      const height = container.clientHeight;

      renderer.setSize(width, height);

      program.uniforms.uResolution.value = [
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
      ];
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(container);

    // Animation
    let animationFrame;

    const startTime = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      program.uniforms.uTime.value = elapsed;

      renderer.render({
        scene,
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);

      resizeObserver.disconnect();

      if (gl.canvas.parentElement === container) {
        container.removeChild(gl.canvas);
      }

      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  if (standalone) {
    return (
      <div
        ref={containerRef}
        className={`pointer-events-none absolute inset-0 h-full w-full overflow-hidden grayscale ${className}`}
      />
    );
  }

  return (
    <div className={`pointer-events-none absolute inset-x-0 top-0 h-[100vh] min-h-[750px] overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden grayscale"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 78%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 78%, rgba(0,0,0,0) 100%)",
        }}
      />
      {/* Seamless bottom fade blending into the page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent via-[#080808]/70 to-[#080808]" />
    </div>
  );
}

export default ShaderBackground;
