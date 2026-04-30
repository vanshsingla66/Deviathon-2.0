import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, AdaptiveDpr, AdaptiveEvents, Stars } from '@react-three/drei';
import * as THREE from 'three';

const ChromeRibbon = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const scrollY = window.scrollY;
    // Reduced interpolation weight for smoother feel on slower devices
    const targetRotationX = scrollY * 0.0008;
    const targetRotationY = scrollY * 0.0012;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.05);
    
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        {/* Reduced segments from 300x32 to 160x24 for better perf */}
        <torusKnotGeometry args={[1.5, 0.35, 160, 24]} />
        <MeshDistortMaterial
          color="#818CF8"
          speed={2}
          distort={0.3}
          radius={1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

const BackgroundBeams = () => {
  const count = 12; // Reduced count
  const beams = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10 - 12
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: [0.015, 8, 0.015] as [number, number, number],
      color: i % 2 === 0 ? "#818CF8" : "#2DD4BF"
    }));
  }, []);

  return (
    <group>
      {beams.map((beam, i) => (
        <mesh key={i} position={beam.position} rotation={beam.rotation} scale={beam.scale}>
          <cylinderGeometry args={[1, 1, 1, 8]} />
          <meshBasicMaterial color={beam.color} transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
};

const CameraController = () => {
  useFrame((state) => {
    const scrollY = window.scrollY;
    // Smoother lerping
    const targetZ = 7 - scrollY * 0.004;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.03);
    
    // Subtle mouse parallax
    const targetX = (state.mouse.x * 1.5);
    const targetY = (state.mouse.y * 1.5);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.02);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

export const Scene3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#010103]">
      <Canvas
        dpr={[1, 1.5]} // Capped dpr for performance
        camera={{ position: [0, 0, 7], fov: 40 }}
        gl={{ 
          antialias: false, // Turn off for speed, rely on dpr
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[-8, -8, -8]} color="#2DD4BF" intensity={0.8} />
          <pointLight position={[8, 8, 8]} color="#818CF8" intensity={0.8} />
          
          <ChromeRibbon />
          <BackgroundBeams />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <CameraController />
          
          <Environment preset="night" />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  );
};

