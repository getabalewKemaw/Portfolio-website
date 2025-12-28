import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Sparkles, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function GridBackground() {
    const points = useMemo(() => {
        const p = new Float32Array(2000 * 3);
        for (let i = 0; i < 2000; i++) {
            p[i * 3] = (Math.random() - 0.5) * 20;
            p[i * 3 + 1] = (Math.random() - 0.5) * 20;
            p[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return p;
    }, []);

    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.075;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#06b6d4"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

function GlowingShapes() {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
            meshRef.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={[5, -2, -5]}>
                <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                <MeshDistortMaterial
                    color="#06b6d4"
                    speed={2}
                    distort={0.4}
                    roughness={0}
                    metalness={1}
                    emissive="#06b6d4"
                    emissiveIntensity={0.5}
                />
            </mesh>

            <mesh position={[-6, 4, -8]}>
                <octahedronGeometry args={[2]} />
                <meshStandardMaterial
                    color="#8b5cf6"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </Float>
    );
}

export default function Modern3DBackground() {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#020617]">
            {/* Animated Gradient Background Blobs - Increased brightness and size */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-500/20 blur-[130px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/20 blur-[130px] animate-pulse delay-700" />
                <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/15 blur-[120px] animate-pulse delay-1000" />
                <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-cyan-400/10 blur-[100px] animate-pulse delay-500" />
            </div>

            {/* Subtle Grid Overlay for depth */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Main radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),rgba(2,6,23,0.8)_80%)]" />

            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={3} color="#06b6d4" />
                <pointLight position={[-10, -10, -10]} intensity={2} color="#3b82f6" />
                <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1.5} color="#8b5cf6" />

                <GridBackground />
                <GlowingShapes />
                <Sparkles count={200} scale={30} size={1.8} speed={0.8} color="#06b6d4" />

                <fog attach="fog" args={["#020617", 5, 25]} />
            </Canvas>
        </div>
    );
}
