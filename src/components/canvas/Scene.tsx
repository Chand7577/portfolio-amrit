'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import CameraRig from './CameraRig';
import FloatingLaptop from './FloatingLaptop';

export default function Scene() {
  return (
    <Canvas
      className="scene-canvas"
      dpr={[1, 1.5]}
      camera={{ fov: 48, near: 0.1, far: 50, position: [0, 0, 4.5] }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color('#0A0A0F');
      }}
    >
      {/* Sleek Futuristic Neon Lighting (No Stars) */}
      <ambientLight intensity={0.5} />
      
      {/* Soft Violet Key Light */}
      <directionalLight position={[4, 5, 4]} intensity={1.8} color="#7C5CFF" />
      
      {/* Cyan Rim Light */}
      <pointLight position={[-4, 3, 2]} intensity={2.5} color="#00E0FF" />
      
      {/* Soft Bottom Fill */}
      <pointLight position={[0, -4, 2]} intensity={1.0} color="#FF4D8D" />

      {/* Dynamic Camera Rig following scroll */}
      <CameraRig />

      {/* The Central 3D Object */}
      <Suspense fallback={null}>
        <FloatingLaptop />
      </Suspense>
    </Canvas>
  );
}
