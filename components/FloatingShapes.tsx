import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Geometries = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation of the entire group
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Floating Sphere */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.5, 32, 32]} position={[2, 1, -5]}>
          <MeshDistortMaterial
            color="#4f46e5"
            attach="material"
            distort={0.4} // Strength, 0 disables the effect (default=1)
            speed={2} // Speed (default=1)
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Background Torus */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <Torus args={[3, 0.2, 16, 100]} position={[-3, -2, -8]} rotation={[0.5, 0, 0]}>
          <meshStandardMaterial color="#8b5cf6" roughness={0.1} metalness={0.5} transparent opacity={0.6} />
        </Torus>
      </Float>

      {/* Small floating spheres */}
      <Float speed={4} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[0.3, 16, 16]} position={[-4, 3, -4]}>
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
        </Sphere>
      </Float>
      
      <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere args={[0.4, 16, 16]} position={[4, -3, -6]}>
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} />
        </Sphere>
      </Float>
    </group>
  );
};

const FloatingShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="red" />
        <Geometries />
      </Canvas>
    </div>
  );
};

export default FloatingShapes;