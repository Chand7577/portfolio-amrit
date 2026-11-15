'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { spline } from '@/lib/spline';
import { CHAPTERS } from '@/lib/chapters';
import PacketCharacter from './PacketCharacter';

// Chapter 1: The Gate (Neon security gates)
function SecurityGates() {
  const gates = useMemo(() => [
    { z: 14, color: '#06b6d4', size: [4, 4] as [number, number] },
    { z: 8, color: '#22d3ee', size: [3.5, 3.5] as [number, number] },
    { z: 2, color: '#0891b2', size: [3, 3] as [number, number] },
  ], []);

  return (
    <group>
      {gates.map((g, i) => (
        <group key={i} position={[0, 0, g.z]}>
          <mesh>
            <ringGeometry args={[g.size[0] - 0.05, g.size[0], 4]} />
            <meshBasicMaterial
              color={g.color}
              wireframe
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
          <pointLight color={g.color} intensity={0.5} distance={6} />
        </group>
      ))}
    </group>
  );
}

// Chapter 2: The Stream (Data rivers)
function DataStreamParticles({ count = 300 }: { count?: number }) {
  const streamRef = useRef<THREE.Points>(null!);

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = -6 + (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = 1.5 + (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = -4 - Math.random() * 14;
      spd[i] = 0.05 + Math.random() * 0.1;
    }
    return { positions: pos, speeds: spd };
  }, [count]);

  useFrame(() => {
    if (!streamRef.current) return;
    const attr = streamRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = attr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      array[i * 3 + 2] += speeds[i];
      if (array[i * 3 + 2] > 0) {
        array[i * 3 + 2] = -18;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={streamRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#3b82f6"
        size={0.08}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Chapter 4: The Brain (Neural core mesh)
function NeuralCore() {
  const brainRef = useRef<THREE.Group>(null!);

  const nodes = useMemo(() => {
    return Array.from({ length: 40 }, () => ({
      pos: [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number],
      size: 0.08 + Math.random() * 0.08,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (brainRef.current) {
      brainRef.current.rotation.y = clock.elapsedTime * 0.2;
      brainRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={brainRef} position={[0, 10, -40]}>
      {/* Central neural nexus */}
      <mesh>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.25} />
      </mesh>
      <pointLight color="#a855f7" intensity={3} distance={15} />

      {/* Floating synapic nodes */}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <sphereGeometry args={[node.size, 12, 12]} />
          <meshStandardMaterial
            color="#d946ef"
            emissive="#a855f7"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Ambient Constellation Field
function AmbientConstellation({ count = 1000 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 100;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 100;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#64748b"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </points>
  );
}

// Spline Guide Line
function SplinePath() {
  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(spline, 160, 0.015, 6, false);
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} />
    </mesh>
  );
}

// Waypoints
function Waypoints() {
  return (
    <group>
      {CHAPTERS.map((ch) => {
        const point = spline.getPointAt(ch.tStart);
        return (
          <group key={ch.id} position={point}>
            <mesh>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial color={ch.accent} />
            </mesh>
            <pointLight color={ch.accent} intensity={1} distance={5} />
          </group>
        );
      })}
    </group>
  );
}

export default function WorldScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 20, 15]} intensity={0.6} />

      {/* The Travelling Packet */}
      <PacketCharacter />

      {/* Background Starfield */}
      <AmbientConstellation />

      {/* Spline Waypoints & Trail */}
      <SplinePath />
      <Waypoints />

      {/* Chapter 1 Gate */}
      <SecurityGates />

      {/* Chapter 2 Data Stream */}
      <DataStreamParticles />

      {/* Chapter 4 Brain Core */}
      <NeuralCore />
    </>
  );
}
