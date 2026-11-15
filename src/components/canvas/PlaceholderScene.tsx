'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { spline } from '@/lib/spline';
import { CHAPTERS } from '@/lib/chapters';

/** Visualises the spline path as a tube (dev helper — hidden in prod). */
function SplineTube() {
  const geometry = useMemo(() => {
    const g = new THREE.TubeGeometry(spline, 200, 0.02, 6, false);
    return g;
  }, []);

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color="#ffffff" opacity={0.08} transparent wireframe />
    </mesh>
  );
}

/** Glowing sphere at each chapter waypoint */
function WaypointMarkers() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2 + i) * 0.12);
    });
  });

  return (
    <>
      {CHAPTERS.map((ch, i) => {
        const point = spline.getPointAt(ch.tStart);
        return (
          <mesh
            key={ch.id}
            position={point}
            ref={(el) => { refs.current[i] = el; }}
          >
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial
              color={ch.accent}
              emissive={ch.accent}
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </>
  );
}

/** Ambient star-field in the void */
function StarField({ count = 800 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 80;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 80;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#aaccff"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * PlaceholderScene — Stage 1.
 * Shows the spline path + chapter waypoints + star-field.
 * Each waypoint glows with the chapter's accent colour.
 * This will be replaced chapter-by-chapter in Stages 2–3.
 */
export default function PlaceholderScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 10, 5]} intensity={2} color="#06b6d4" />

      <StarField />
      <WaypointMarkers />
      <SplineTube />
    </>
  );
}
