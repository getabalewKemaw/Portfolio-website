import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Instances, Instance, Float, Sparkles } from "@react-three/drei";

function BubbleField() {
  const groupRef = useRef(null);
  const bubbles = useMemo(
    () =>
      Array.from({ length: 42 }).map(() => ({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * -8,
        ],
        scale: 0.15 + Math.random() * 0.5,
        hue: 180 + Math.random() * 120,
      })),
    []
  );

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.03;
  });

  return (
    <group ref={groupRef}>
      <Sparkles count={60} speed={0.25} opacity={0.25} size={1.6} color="#22d3ee" noise={0.25} />
      <Float speed={0.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <Instances limit={bubbles.length}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial transparent opacity={0.35} roughness={0.2} metalness={0.6} color="#22d3ee" />
          {bubbles.map((b, i) => (
            <Instance
              key={i}
              position={b.position}
              scale={b.scale}
              color={`hsl(${b.hue} 70% 65%)`}
            />
          ))}
        </Instances>
      </Float>
    </group>
  );
}

export default function BackgroundBubbles() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 4, 3]} intensity={0.9} color="#60a5fa" />
        <BubbleField />
      </Canvas>
    </div>
  );
}
