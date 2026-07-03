import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    // Responsive sizing
    let width = container.clientWidth;
    let height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- State & Tracking ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const scroll = { current: 0, target: 0, ease: 0.05 };

    // --- Theme Detection ---
    let isLight = document.documentElement.classList.contains("light");

    const getThemeColors = (lightMode: boolean) => {
      return {
        nodeColor: lightMode ? new THREE.Color("#2563eb") : new THREE.Color("#3b82f6"), // Blue
        secondaryNodeColor: lightMode ? new THREE.Color("#0d9488") : new THREE.Color("#06b6d4"), // Teal/Cyan
        lineColor: lightMode ? new THREE.Color("#cbd5e1") : new THREE.Color("#1e293b"), // Slate border
        activeLineColor: lightMode ? new THREE.Color("#93c5fd") : new THREE.Color("#1e40af"), // Soft glow line
        coreWireframeColor: lightMode ? new THREE.Color("#1d4ed8") : new THREE.Color("#60a5fa"), // Strong blue
        accentWireframeColor: lightMode ? new THREE.Color("#0891b2") : new THREE.Color("#22d3ee"), // Bright Cyan
      };
    };

    let colors = getThemeColors(isLight);

    // --- Create 3D Assets ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Constellation Network (Particles + Lines)
    const particleCount = 180;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];
    const originalPositions: number[] = [];

    // Distribute particles inside a bounding volume
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions.push(x, y, z);
      particleSpeeds.push((Math.random() - 0.5) * 0.05); // drift speed
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Material for point nodes
    const particlesMaterial = new THREE.PointsMaterial({
      color: colors.nodeColor,
      size: 1.2,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    mainGroup.add(particleSystem);

    // 2. Network Connections (Dynamic lines based on proximity)
    const lineMaxConnections = 3;
    const maxDistance = 15;
    const lineIndices: number[] = [];
    
    // Find neighbors to construct network mesh structure
    for (let i = 0; i < particleCount; i++) {
      let connections = 0;
      const neighbors: { index: number; dist: number }[] = [];

      const x1 = positions[i * 3];
      const y1 = positions[i * 3 + 1];
      const z1 = positions[i * 3 + 2];

      for (let j = i + 1; j < particleCount; j++) {
        const x2 = positions[j * 3];
        const y2 = positions[j * 3 + 1];
        const z2 = positions[j * 3 + 2];

        const dx = x1 - x2;
        const dy = y1 - y2;
        const dz = z1 - z2;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          neighbors.push({ index: j, dist });
        }
      }

      // Sort by distance and connect nearest
      neighbors.sort((a, b) => a.dist - b.dist);
      for (let k = 0; k < Math.min(neighbors.length, lineMaxConnections); k++) {
        lineIndices.push(i, neighbors[k].index);
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    lineGeometry.setIndex(lineIndices);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: colors.lineColor,
      transparent: true,
      opacity: 0.35,
    });

    const networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    mainGroup.add(networkLines);

    // 3. Floating Interactive Geometric Hubs (Enterprise Data Knots)
    // Core Icosahedron Wireframe
    const coreGeometry = new THREE.IcosahedronGeometry(8, 1);
    const coreWireframe = new THREE.WireframeGeometry(coreGeometry);
    const coreMaterial = new THREE.LineBasicMaterial({
      color: colors.coreWireframeColor,
      transparent: true,
      opacity: 0.45,
    });
    const coreMesh = new THREE.LineSegments(coreWireframe, coreMaterial);
    coreMesh.position.set(15, 5, -10);
    mainGroup.add(coreMesh);

    // Secondary Floating Orbit Node
    const ringGeometry = new THREE.TorusGeometry(12, 0.15, 8, 48);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: colors.accentWireframeColor,
      transparent: true,
      opacity: 0.2,
      wireframe: true,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.position.set(-18, -12, 5);
    ringMesh.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh);

    // Small spinning prism inside ring
    const prismGeometry = new THREE.OctahedronGeometry(3, 0);
    const prismMaterial = new THREE.MeshBasicMaterial({
      color: colors.accentWireframeColor,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });
    const prismMesh = new THREE.Mesh(prismGeometry, prismMaterial);
    prismMesh.position.copy(ringMesh.position);
    mainGroup.add(prismMesh);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, isLight ? 0.8 : 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(isLight ? 0x2563eb : 0x00d2ff, 1.5, 100);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // --- Interactive Listeners ---
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to [-1, 1]
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        scroll.target = window.scrollY / scrollHeight;
      }
    };

    // Listen for theme mutations dynamically
    const observer = new MutationObserver(() => {
      const currentlyLight = document.documentElement.classList.contains("light");
      if (currentlyLight !== isLight) {
        isLight = currentlyLight;
        colors = getThemeColors(isLight);
        
        // Update materials
        particlesMaterial.color.copy(colors.nodeColor);
        lineMaterial.color.copy(colors.lineColor);
        coreMaterial.color.copy(colors.coreWireframeColor);
        ringMaterial.color.copy(colors.accentWireframeColor);
        prismMaterial.color.copy(colors.accentWireframeColor);
        ambientLight.intensity = isLight ? 0.8 : 0.4;
        pointLight.color.copy(isLight ? colors.nodeColor : colors.accentWireframeColor);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Trigger initial scroll calculation
    handleScroll();

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smoothly interpolate scroll
      scroll.current += (scroll.target - scroll.current) * scroll.ease;

      // Smoothly interpolate mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // --- Responsive 3D Scroll Path & Camera Choreography ---
      // Camera flies through the network structure, rotating and zooming as user scrolls
      camera.position.x = mouse.x * 5;
      camera.position.y = mouse.y * 5 + (scroll.current * -25); // camera goes down as we scroll
      camera.position.z = 45 - scroll.current * 18; // zooms in slightly deeper in scroll

      // Look slightly down/up based on mouse and scroll
      camera.lookAt(new THREE.Vector3(0, scroll.current * -15, 0));

      // Constant gentle drift rotation on the main group
      mainGroup.rotation.y = elapsedTime * 0.025 + scroll.current * 1.5;
      mainGroup.rotation.x = elapsedTime * 0.01 + scroll.current * 0.6;
      mainGroup.rotation.z = mouse.x * 0.05;

      // Spin custom mesh elements
      coreMesh.rotation.x = elapsedTime * 0.15;
      coreMesh.rotation.y = -elapsedTime * 0.12;

      ringMesh.rotation.z = -elapsedTime * 0.08;
      prismMesh.rotation.x = elapsedTime * 0.3;
      prismMesh.rotation.y = elapsedTime * 0.2;

      // Dynamic floating drift for the background particles
      const positionsArray = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Apply tiny oscillator based on index
        const idx = i * 3;
        const originalY = originalPositions[idx + 1];
        positionsArray[idx + 1] = originalY + Math.sin(elapsedTime * 0.4 + i) * 1.2;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Update line points directly from particle positions
      const linePosAttr = networkLines.geometry.attributes.position as THREE.BufferAttribute;
      const particlePosAttr = particlesGeometry.attributes.position as THREE.BufferAttribute;
      linePosAttr.copy(particlePosAttr);
      linePosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- Window Resize Handler ---
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      observer.disconnect();

      // Dispose resources
      scene.clear();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      coreGeometry.dispose();
      coreWireframe.dispose();
      coreMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      prismGeometry.dispose();
      prismMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-35 dark:opacity-45 transition-opacity duration-1000"
      id="3d-scroll-canvas-container"
    >
      <canvas ref={canvasRef} className="w-full h-full block" id="3d-scroll-canvas" />
    </div>
  );
}
