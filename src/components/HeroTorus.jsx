import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function TorusMesh() {
  const torusRef = useRef(null);
  useFrame((_, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.25;
      torusRef.current.rotation.y += delta * 0.18;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.6} floatIntensity={1.1}>
      <mesh ref={torusRef} castShadow receiveShadow position={[0, 0, 0]}>
        <torusKnotGeometry args={[1, 0.35, 256, 32, 2, 3]} />
        <meshStandardMaterial color="#22d3ee" metalness={0.85} roughness={0.15} envMapIntensity={1.4} />
      </mesh>
    </Float>
  );
}

export default function HeroTorus() {
  return (
    <div className="w-full h-64 sm:h-72 md:h-96 lg:h-[28rem]">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 6], fov: 50 }}>
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 4, 3]} intensity={1.1} color="#93c5fd" />
        <TorusMesh />
      </Canvas>
    </div>
  );
}
