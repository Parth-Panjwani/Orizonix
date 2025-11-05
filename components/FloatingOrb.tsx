"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

function FloatingOrbContent() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Dynamic import Three.js only when needed
    import("three").then((THREE) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current!.clientWidth / mountRef.current!.clientHeight,
        0.1,
        1000
      );

      // Optimize renderer settings
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false, // Disable antialiasing for better performance
        powerPreference: "high-performance",
      });
      renderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio
      mountRef.current!.appendChild(renderer.domElement);

      // Simplified geometry - fewer segments
      const geometry = new THREE.IcosahedronGeometry(2, 0); // Reduced detail
      const material = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const orb = new THREE.Mesh(geometry, material);
      scene.add(orb);

      // Reduced number of lines for better performance
      const lines: THREE.Line[] = [];
      for (let i = 0; i < 5; i++) {
        // Reduced from 10 to 5
        const points: THREE.Vector3[] = [];
        for (let j = 0; j < 15; j++) {
          // Reduced from 20 to 15
          const angle = (j / 15) * Math.PI * 2;
          const radius = 2.5 + Math.sin(angle * 3 + i) * 0.3;
          points.push(
            new THREE.Vector3(
              Math.cos(angle) * radius,
              Math.sin(angle * 3 + i) * 0.5,
              Math.sin(angle) * radius
            )
          );
        }
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x00d4ff,
          transparent: true,
          opacity: 0.5,
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        lines.push(line);
      }

      camera.position.z = 8;
      camera.position.y = 1;

      let animationId: number;
      let lastTime = 0;
      const targetFPS = 30; // Target 30 FPS instead of 60
      const frameInterval = 1000 / targetFPS;

      const animate = (currentTime: number) => {
        animationId = requestAnimationFrame(animate);

        const deltaTime = currentTime - lastTime;
        if (deltaTime < frameInterval) return;

        lastTime = currentTime - (deltaTime % frameInterval);

        orb.rotation.x += 0.002;
        orb.rotation.y += 0.003;

        lines.forEach((line, i) => {
          line.rotation.y += 0.001 * (i % 2 === 0 ? 1 : -1);
          line.rotation.x += 0.0005;
        });

        renderer.render(scene, camera);
      };

      animate(0);

      const handleResize = () => {
        if (!mountRef.current) return;
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      };

      window.addEventListener("resize", handleResize, { passive: true });

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationId);
        if (mountRef.current && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        lines.forEach((line) => {
          line.geometry.dispose();
          (line.material as THREE.Material).dispose();
        });
      };
    });
  }, []);

  return <div ref={mountRef} className="w-full h-full" style={{ willChange: "transform" }} />;
}

// Lazy load the component
export default dynamic(() => Promise.resolve(FloatingOrbContent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 border-2 border-neon-blue/30 rounded-full animate-pulse" />
    </div>
  ),
});
