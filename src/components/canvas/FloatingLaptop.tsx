'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';
import { scrollState } from '@/lib/scrollState';

export default function FloatingLaptop() {
  const groupRef = useRef<THREE.Group>(null!);
  const screenGlowRef = useRef<THREE.Mesh>(null!);
  const { normalized } = useMousePosition();

  // Synthetic glowing code lines on display
  const codeBars = useMemo(() => {
    return [
      { y: 0.65, width: 0.8, indent: -0.35, color: '#FF4D8D' },
      { y: 0.50, width: 1.2, indent: -0.15, color: '#00E0FF' },
      { y: 0.35, width: 0.9, indent: 0.05, color: '#7C5CFF' },
      { y: 0.20, width: 0.85, indent: 0.05, color: '#EDEDF5' },
      { y: 0.05, width: 1.1, indent: 0.05, color: '#00E0FF' },
      { y: -0.10, width: 0.6, indent: 0.05, color: '#FF4D8D' },
      { y: -0.25, width: 0.35, indent: -0.6, color: '#7C5CFF' },
      { y: -0.40, width: 0.75, indent: -0.4, color: '#00E0FF' },
    ];
  }, []);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    const progress = scrollState.progress;

    // Responsive mouse tilt
    const targetRotX = normalized.current.y * 0.2 + 0.12;
    const targetRotY = normalized.current.x * 0.35 - 0.28;

    if (groupRef.current) {
      // Rotation combining mouse parallax and scroll transition
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX - progress * 1.5,
        0.08
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY + progress * 2.8,
        0.08
      );

      // Scales and transitions position across scroll
      const targetScale = Math.max(0.55, 1.45 - progress * 0.9);
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08)
      );

      // Position: nicely placed on the right half of the hero viewport
      const targetX = 1.35 - progress * 1.6;
      const targetY = -0.1 - progress * 1.2;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
    }

    // Screen brightness pulse
    if (screenGlowRef.current) {
      const mat = screenGlowRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.88 + Math.sin(time * 3) * 0.08;
      }
    }
  });

  return (
    <Float
      speed={2.2}
      rotationIntensity={0.25}
      floatIntensity={0.4}
      floatingRange={[-0.08, 0.08]}
    >
      <group ref={groupRef} position={[1.35, -0.1, 0]} rotation={[0.12, -0.28, 0]}>
        {/* BASE CHASSIS */}
        <mesh position={[0, -0.06, 0.85]}>
          <boxGeometry args={[2.7, 0.08, 1.8]} />
          <meshStandardMaterial
            color="#12121A"
            roughness={0.25}
            metalness={0.9}
          />
        </mesh>

        {/* KEYBOARD RECESS */}
        <mesh position={[0, -0.015, 0.7]}>
          <boxGeometry args={[2.35, 0.02, 1.05]} />
          <meshStandardMaterial
            color="#0A0A0F"
            roughness={0.6}
            metalness={0.5}
          />
        </mesh>

        {/* TRACKPAD */}
        <mesh position={[0, -0.015, 1.45]}>
          <boxGeometry args={[0.75, 0.01, 0.5]} />
          <meshStandardMaterial
            color="#181824"
            roughness={0.35}
            metalness={0.75}
          />
        </mesh>

        {/* SCREEN HINGE */}
        <mesh position={[0, 0, -0.05]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 2.5, 16]} />
          <meshStandardMaterial color="#1E1E2C" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* SCREEN LID (Open at ~115 deg) */}
        <group position={[0, 0, -0.05]} rotation={[-1.15, 0, 0]}>
          {/* Bezel Outer Frame */}
          <mesh position={[0, 0.85, 0]}>
            <boxGeometry args={[2.7, 1.75, 0.06]} />
            <meshStandardMaterial
              color="#12121A"
              roughness={0.25}
              metalness={0.9}
            />
          </mesh>

          {/* Glowing Display Surface */}
          <mesh ref={screenGlowRef} position={[0, 0.85, 0.035]}>
            <planeGeometry args={[2.5, 1.55]} />
            <meshBasicMaterial color="#0A0A14" transparent opacity={0.95} />
          </mesh>

          {/* Neon Code Syntax Lines On Screen */}
          <group position={[0, 0.85, 0.04]}>
            {codeBars.map((bar, idx) => (
              <mesh key={idx} position={[bar.indent, bar.y, 0]}>
                <planeGeometry args={[bar.width, 0.045]} />
                <meshBasicMaterial color={bar.color} />
              </mesh>
            ))}
          </group>

          {/* Screen Light Projection */}
          <pointLight position={[0, 0.85, 0.6]} intensity={2.0} distance={4} color="#00E0FF" />
        </group>

        {/* Underglow (Violet & Cyan) */}
        <pointLight position={[0, -0.4, 0.85]} intensity={2.5} distance={5} color="#7C5CFF" />
      </group>
    </Float>
  );
}
