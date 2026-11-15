'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { spline } from '@/lib/spline';
import { scrollState } from '@/lib/scrollState';
import { CHAPTERS } from '@/lib/chapters';
import { useMousePosition } from '@/hooks/useMousePosition';

export default function PacketCharacter() {
  const groupRef = useRef<THREE.Group>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const trailRef = useRef<THREE.Points>(null!);
  const { normalized } = useMousePosition();

  // Particle trail positions
  const trailCount = 80;
  const trailPositions = useMemo(() => new Float32Array(trailCount * 3), [trailCount]);

  useFrame(({ clock }) => {
    const t = scrollState.progress;
    const time = clock.elapsedTime;
    const currentChapter = CHAPTERS[scrollState.chapter] ?? CHAPTERS[0];
    const targetColor = new THREE.Color(currentChapter.accent);

    // Current point on spline slightly ahead of the camera
    const packetT = THREE.MathUtils.clamp(t + 0.02, 0, 0.999);
    const splinePos = spline.getPointAt(packetT);

    // Slight reactive mouse offset
    const mx = normalized.current.x * 0.8;
    const my = normalized.current.y * 0.8;

    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, splinePos.x + mx, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, splinePos.y + my, 0.1);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, splinePos.z, 0.1);
    }

    // Core pulsing & rotation
    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 6) * 0.18;
      coreRef.current.scale.setScalar(pulse);
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.color.lerp(targetColor, 0.1);
        mat.emissive.lerp(targetColor, 0.1);
        mat.emissiveIntensity = 2.5 + Math.sin(time * 8) * 1.0;
      }
    }

    // Gyroscopic rings
    if (ring1Ref.current && ring2Ref.current) {
      ring1Ref.current.rotation.x = time * 1.5;
      ring1Ref.current.rotation.y = time * 0.8;
      ring2Ref.current.rotation.y = -time * 1.2;
      ring2Ref.current.rotation.z = time * 1.1;

      const mat1 = ring1Ref.current.material as THREE.MeshBasicMaterial;
      const mat2 = ring2Ref.current.material as THREE.MeshBasicMaterial;
      if (mat1) mat1.color.lerp(targetColor, 0.1);
      if (mat2) mat2.color.lerp(targetColor, 0.1);
    }

    // Update particle trail
    if (trailRef.current) {
      const attr = trailRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = attr.array as Float32Array;

      // Shift positions backwards
      for (let i = trailCount - 1; i > 0; i--) {
        array[i * 3] = array[(i - 1) * 3];
        array[i * 3 + 1] = array[(i - 1) * 3 + 1];
        array[i * 3 + 2] = array[(i - 1) * 3 + 2] + 0.08; // drift back
      }

      // Head gets current packet position
      if (groupRef.current) {
        array[0] = groupRef.current.position.x;
        array[1] = groupRef.current.position.y;
        array[2] = groupRef.current.position.z;
      }

      attr.needsUpdate = true;
    }
  });

  return (
    <>
      <group ref={groupRef} position={[0, 0, 28]}>
        {/* Core Glowing Orb */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={3}
            roughness={0.1}
            metalness={0.8}
            toneMapped={false}
          />
        </mesh>

        {/* Outer Ring 1 */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[0.65, 0.02, 16, 64]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.8} />
        </mesh>

        {/* Outer Ring 2 */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[0.85, 0.015, 16, 64]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
        </mesh>

        {/* Subtle Light from Packet */}
        <pointLight intensity={3} distance={15} color="#06b6d4" />
      </group>

      {/* Trailing energy tail */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[trailPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#06b6d4"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
