import { useEffect, useRef, useState } from "react";
import { Renderer, Program, Mesh, Triangle, Transform, Texture } from "ogl";

const VERTEX_SHADER = `
  attribute vec2 position;

  varying vec2 vUv;

  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform sampler2D uTexA;
  uniform sampler2D uTexB;

  uniform float uProgress;
  uniform float uTime;

  uniform vec2 uResolution;
  uniform vec2 uImageSize;

  uniform vec2 uOrigin;
  uniform vec2 uDirection;

  varying vec2 vUv;

  // Keep image aspect ratio while using object-cover
  vec2 coverUv(vec2 uv) {
    vec2 ratio = vec2(
      min(
        (uResolution.x / uResolution.y) /
        (uImageSize.x / uImageSize.y),
        1.0
      ),
      min(
        (uResolution.y / uResolution.x) /
        (uImageSize.y / uImageSize.x),
        1.0
      )
    );

    return vec2(
      uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
  }

  // Random hash
  float hash(vec2 p) {
    return fract(
      sin(
        dot(
          p,
          vec2(127.1, 311.7)
        )
      ) * 43758.5453
    );
  }

  // Smooth noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(
      mix(a, b, f.x),
      mix(c, d, f.x),
      f.y
    );
  }

  // Fractal noise
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 baseUv = coverUv(uv);
    float p = uProgress;

    // Strongest distortion happens around the middle of the transition
    float bell = 4.0 * p * (1.0 - p);

    // Direction of the transition
    vec2 dir = normalize(
      uDirection + vec2(0.0001)
    );

    float along = dot(
      uv - uOrigin,
      dir
    );

    float distGradient =
      (along + 1.4) / 2.8;

    // Low frequency distortion
    float warpLow =
      fbm(
        uv * 1.8 +
        uTime * 0.05
      ) - 0.5;

    // High frequency distortion
    float warpHi =
      fbm(
        uv * 5.5 -
        uTime * 0.04 +
        13.0
      ) - 0.5;

    float warp =
      warpLow * 0.55 +
      warpHi * 0.18;

    float field =
      distGradient + warp;

    float remapped =
      mix(
        -0.25,
        1.25,
        p
      );

    float edgeWidth = 0.07;

    float mask =
      smoothstep(
        remapped - edgeWidth,
        remapped + edgeWidth,
        field
      );

    mask = 1.0 - mask;

    // Ripple direction
    vec2 perp =
      vec2(
        -dir.y,
        dir.x
      );

    float ripplePhase =
      (field - remapped) * 14.0;

    float ripple =
      sin(ripplePhase) * 0.5 + 0.5;

    float edgeBand =
      1.0 -
      smoothstep(
        0.0,
        edgeWidth * 1.6,
        abs(field - remapped)
      );

    // Small displacement around the transition edge
    float pushAmount =
      ripple *
      edgeBand *
      0.025 *
      bell;

    vec2 pushUv =
      uv + perp * pushAmount;

    vec2 uvA =
      coverUv(pushUv);

    vec2 uvB =
      coverUv(pushUv);

    vec4 texA =
      texture2D(
        uTexA,
        uvA
      );

    vec4 texB =
      texture2D(
        uTexB,
        uvB
      );

    // Morph between images
    vec4 color =
      mix(
        texA,
        texB,
        mask
      );

    // Darken the transition edge
    float darken =
      edgeBand *
      0.35 *
      bell;

    color.rgb *=
      1.0 - darken;

    gl_FragColor =
      color;
  }
`;

function PortraitMorph({ srcA, srcB, alt = "", className = "" }) {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

  const hoverRef = useRef(false);
  const progressRef = useRef(0);
  const originRef = useRef([0.5, 0.5]);
  const directionRef = useRef([1, 0]);
  const lastPointerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // -------------------------
    // Renderer
    // -------------------------
    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;
    const canvas = gl.canvas;

    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";

    container.appendChild(canvas);

    // -------------------------
    // Scene
    // -------------------------
    const scene = new Transform();

    // -------------------------
    // Textures
    // -------------------------
    const texA = new Texture(gl, {
      generateMipmaps: false,
    });

    const texB = new Texture(gl, {
      generateMipmaps: false,
    });

    const imageSize = [1, 1];

    const loadImage = (src, target) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
          target.image = img;
          imageSize[0] = img.naturalWidth;
          imageSize[1] = img.naturalHeight;
          resolve();
        };

        img.onerror = reject;
        img.src = src;
      });
    };

    // -------------------------
    // Geometry
    // -------------------------
    const geometry = new Triangle(gl);

    // -------------------------
    // Shader Program
    // -------------------------
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uTexA: {
          value: texA,
        },
        uTexB: {
          value: texB,
        },
        uProgress: {
          value: 0,
        },
        uTime: {
          value: 0,
        },
        uResolution: {
          value: [1, 1],
        },
        uImageSize: {
          value: imageSize,
        },
        uOrigin: {
          value: [0.5, 0.5],
        },
        uDirection: {
          value: [1, 0],
        },
      },
      transparent: true,
    });

    // -------------------------
    // Mesh
    // -------------------------
    const mesh = new Mesh(gl, {
      geometry,
      program,
    });
    mesh.setParent(scene);

    // -------------------------
    // Resize
    // -------------------------
    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [
        width * renderer.dpr,
        height * renderer.dpr,
      ];
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // -------------------------
    // Animation
    // -------------------------
    let raf = 0;
    let last = performance.now();
    let time = 0;
    let running = true;

    const tick = () => {
      if (!running) return;

      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;

      // Target progress
      const target = hoverRef.current ? 1 : 0;

      // Balanced smooth transition speed
      const stiffness = hoverRef.current ? 1.8 : 2.2;
      const k = 1 - Math.exp(-stiffness * dt);

      progressRef.current += (target - progressRef.current) * k;

      program.uniforms.uTime.value = time;
      program.uniforms.uProgress.value = progressRef.current;
      program.uniforms.uOrigin.value = originRef.current;
      program.uniforms.uDirection.value = directionRef.current;
      program.uniforms.uImageSize.value = imageSize;

      renderer.render({
        scene,
      });

      raf = requestAnimationFrame(tick);
    };

    // -------------------------
    // Load both images
    // -------------------------
    Promise.all([loadImage(srcA, texA), loadImage(srcB, texB)])
      .then(() => {
        setReady(true);
        last = performance.now();
        tick();
      })
      .catch(() => {
        setReady(false);
      });

    // -------------------------
    // Calculate direction
    // -------------------------
    const computeEdgeDirection = (x, y) => {
      const left = x;
      const right = 1 - x;
      const bottom = y;
      const top = 1 - y;

      const minDistance = Math.min(left, right, bottom, top);

      if (minDistance === left) {
        return [1, 0];
      }
      if (minDistance === right) {
        return [-1, 0];
      }
      if (minDistance === bottom) {
        return [0, 1];
      }
      return [0, -1];
    };

    // -------------------------
    // Pointer Enter
    // -------------------------
    const onPointerEnter = (event) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;

      originRef.current = [x, y];
      directionRef.current = computeEdgeDirection(x, y);

      lastPointerRef.current = {
        x,
        y,
        t: performance.now(),
      };

      hoverRef.current = true;
    };

    // -------------------------
    // Pointer Leave
    // -------------------------
    const onPointerLeave = (event) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;

      originRef.current = [x, y];
      const direction = computeEdgeDirection(x, y);
      directionRef.current = direction.map((value) => -value);

      hoverRef.current = false;
    };

    // -------------------------
    // Pointer Move
    // -------------------------
    const onPointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;

      const last = lastPointerRef.current;

      if (
        last &&
        performance.now() - last.t < 80 &&
        progressRef.current < 0.15
      ) {
        const vx = x - last.x;
        const vy = y - last.y;
        const magnitude = Math.hypot(vx, vy);

        if (magnitude > 0.01) {
          directionRef.current = [vx / magnitude, vy / magnitude];
        }
      }

      lastPointerRef.current = {
        x,
        y,
        t: performance.now(),
      };
    };

    // -------------------------
    // Events
    // -------------------------
    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("pointermove", onPointerMove);

    // -------------------------
    // Cleanup
    // -------------------------
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();

      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointermove", onPointerMove);

      const extension = gl.getExtension("WEBGL_lose_context");
      extension?.loseContext();

      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, [srcA, srcB]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={alt}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        // filter: "grayscale(100%)",
      }}
    >
      {!ready && (
        <img
          src={srcA}
          alt={alt}
          draggable={false}
          className="
            absolute
            inset-0
            h-full
            w-full
            select-none
            object-cover
          "
        />
      )}
    </div>
  );
}

export default PortraitMorph;
