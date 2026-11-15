'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scrollState';

const _target = new THREE.Vector3();

export default function CameraRig() {
  const { camera } = useThree();
  const currentProgress = useRef(0);

  useEffect(() => {
    // Initial camera position framing the floating laptop nicely
    camera.position.set(0, 0, 4.5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((_, delta) => {
    const targetP = scrollState.progress;
    currentProgress.current = THREE.MathUtils.lerp(
      currentProgress.current,
      targetP,
      1 - Math.exp(-4 * delta)
    );

    const p = currentProgress.current;

    // Smooth camera motion path across scroll:
    // Hero: [0, 0, 4.5] looking at [0.5, 0, 0]
    // Later sections: camera tracks gently to give spatial depth
    const camX = Math.sin(p * Math.PI) * 1.2;
    const camY = -p * 1.8;
    const camZ = 4.5 + p * 1.5;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, camX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, camY, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, camZ, 0.08);

    _target.set(0.3 - p * 0.6, -p * 1.5, 0);
    camera.lookAt(_target);
  });

  return null;
}
