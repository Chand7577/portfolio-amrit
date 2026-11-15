'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

/* ─── Instanced node cloud ─────────────────────────────────────────────────── */

const NODE_COUNT = 120;
const LINE_THRESHOLD = 1.8;

function NodeCloud() {
  const ref = useRef<THREE.Points>(null!);
  const { normalized } = useMousePosition();

  const positions = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t  = clock.elapsedTime;
    const mx = normalized.current.x * 0.4;
    const my = normalized.current.y * 0.4;
    ref.current.rotation.y = t * 0.04 + mx * 0.3;
    ref.current.rotation.x = t * 0.02 + my * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#06b6d4"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Connecting line segments ─────────────────────────────────────────────── */

function NetworkLines() {
  const ref = useRef<THREE.LineSegments>(null!);
  const { normalized } = useMousePosition();

  const { flatPositions, lineIndices } = useMemo(() => {
    const vecs = Array.from({ length: NODE_COUNT }, () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      )
    );

    const flatPositions = new Float32Array(NODE_COUNT * 3);
    vecs.forEach((v, i) => {
      flatPositions[i * 3]     = v.x;
      flatPositions[i * 3 + 1] = v.y;
      flatPositions[i * 3 + 2] = v.z;
    });

    const lineIndices: number[] = [];
    for (let i = 0; i < vecs.length; i++) {
      for (let j = i + 1; j < vecs.length; j++) {
        if (vecs[i].distanceTo(vecs[j]) < LINE_THRESHOLD) {
          lineIndices.push(i, j);
        }
      }
    }
    return { flatPositions, lineIndices };
  }, []);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(flatPositions, 3));
    g.setIndex(lineIndices);
    return g;
  }, [flatPositions, lineIndices]);

  useFrame(({ clock }) => {
    const t  = clock.elapsedTime;
    const mx = normalized.current.x * 0.4;
    const my = normalized.current.y * 0.4;
    ref.current.rotation.y = t * 0.04 + mx * 0.3;
    ref.current.rotation.x = t * 0.02 + my * 0.2;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#06b6d4" transparent opacity={0.1} />
    </lineSegments>
  );
}

/* ─── Camera drifts forward as user scrolls ───────────────────────────────── */

function CameraRig() {
  useFrame(({ camera }) => {
    const lenis = (window as any).__lenis;
    const scrollY = lenis ? lenis.scroll : window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5 - progress * 4, 0.02);
  });
  return null;
}

/* ─── Root export ──────────────────────────────────────────────────────────── */

export default function Scene() {
  return (
    <Canvas
      className="scene-canvas"
      dpr={[1, 2]}
      camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 5] }}
      gl={{ antialias: false, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <CameraRig />
      <NodeCloud />
      <NetworkLines />
    </Canvas>
  );
}
