import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Decal, useTexture, ContactShadows } from "@react-three/drei";

// ✅ Correct, working URLs for textures
// ✅ Iconify CDN URLs (guaranteed to work)
const [reactLogoUrl, nodeLogoUrl, threeLogoUrl, tailwindLogoUrl] = [
  "https://api.iconify.design/skill-icons:react-dark.svg",
  "https://api.iconify.design/skill-icons:nodejs-dark.svg",
  "https://api.iconify.design/skill-icons:threejs-dark.svg",
  "https://api.iconify.design/skill-icons:tailwindcss-dark.svg",
];



function Laptop() {
  const groupRef = useRef(null);
  const openAngle = -1.1; // lid open angle in radians

  // Load textures from URLs
  const [reactLogo, nodeLogo, threeLogo, tailwindLogo] = useTexture([
    reactLogoUrl,
    nodeLogoUrl,
    threeLogoUrl,
    tailwindLogoUrl,
  ]);

  [reactLogo, nodeLogo, threeLogo, tailwindLogo].forEach((tex) => {
    if (tex) tex.anisotropy = 8;
  });

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.8}>
        <group>
          {/* Base */}
          <RoundedBox
            args={[2.4, 0.12, 1.6]}
            radius={0.06}
            smoothness={8}
            position={[0, 0, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#0b1220" metalness={0.55} roughness={0.35} />
            {/* Stickers on base (top face) */}
            <Decal
              position={[-0.65, 0.065, 0.35]}
              rotation={[-Math.PI / 2, 0, -0.2]}
              scale={0.35}
              map={reactLogo}
            />
            <Decal
              position={[0.55, 0.065, -0.1]}
              rotation={[-Math.PI / 2, 0, 0.15]}
              scale={0.28}
              map={nodeLogo}
            />
            <Decal
              position={[0, 0.065, 0.55]}
              rotation={[-Math.PI / 2, 0, 0.3]}
              scale={0.26}
              map={tailwindLogo}
            />
          </RoundedBox>

          {/* Keyboard deck */}
          <mesh position={[0, 0.07, 0]} receiveShadow>
            <boxGeometry args={[2.28, 0.02, 1.46]} />
            <meshStandardMaterial color="#111827" roughness={0.9} metalness={0.1} />
          </mesh>

          {/* Hinge */}
          <mesh position={[0, 0.06, -0.8]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 2.2, 24]} />
            <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.4} />
          </mesh>

          {/* Lid + screen */}
          <group position={[0, 0.06, -0.8]} rotation={[openAngle, 0, 0]}>
            <RoundedBox
              args={[2.4, 1.6, 0.08]}
              radius={0.06}
              smoothness={8}
              position={[0, 0.8, 0]}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial color="#0b1220" metalness={0.55} roughness={0.35} />
              {/* Sticker on lid back */}
              <Decal
                position={[0.6, 0.8, 0.041]}
                rotation={[0, 0.2, 0]}
                scale={0.35}
                map={threeLogo}
              />
            </RoundedBox>

            {/* Screen (inside) */}
            <mesh position={[0, 0.8, -0.041]} castShadow>
              <planeGeometry args={[2.28, 1.44]} />
              <meshStandardMaterial
                color="#0b0f1a"
                emissive="#0b0f1a"
                emissiveIntensity={0.35}
                roughness={0.9}
              />
            </mesh>
          </group>
        </group>
      </Float>
    </group>
  );
}

export default function HeroTorus() {
  return (
    <div className="w-full h-64 sm:h-72 md:h-96 lg:h-[28rem]">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0.4, 6], fov: 50 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 4, 3]} intensity={1.1} color="#93c5fd" castShadow />
        <Laptop />
        <ContactShadows position={[0, -1.1, 0]} opacity={0.35} scale={6} blur={2.6} far={3} />
      </Canvas>
    </div>
  );
}
