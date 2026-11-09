 "use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Html,
  MeshDistortMaterial,
  Sparkles,
  Stars,
  Trail,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

export type WorldSection =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "community"
  | "contact";

type Props = {
  active: WorldSection;
  onNavigate: (section: WorldSection) => void;
  theme: "dark" | "light" | "cyber";
};

const nodes: {
  id: WorldSection;
  label: string;
  sub: string;
  position: [number, number, number];
  color: string;
  number: string;
}[] = [
  { id: "about", label: "IDENTITY", sub: "Who I am", position: [-3.2, 1.35, -1.1], color: "#36f5bd", number: "01" },
  { id: "skills", label: "ARSENAL", sub: "What I work with", position: [3.25, 1.2, -1.3], color: "#63d9ff", number: "02" },
  { id: "projects", label: "CREATIONS", sub: "Things I build", position: [-3.4, -1.3, -1.0], color: "#b4ff57", number: "03" },
  { id: "experience", label: "JOURNEY", sub: "Where I've been", position: [3.3, -1.35, -1.0], color: "#b89cff", number: "04" },
  { id: "community", label: "TRANSMISSION", sub: "The AI 👽 Guy 🤖", position: [0, 2.65, -2.0], color: "#ffb86b", number: "05" },
  { id: "contact", label: "CONNECT", sub: "Start something", position: [0, -2.75, -1.8], color: "#ff7e9e", number: "06" },
];

function Core({ active }: { active: WorldSection }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.16;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.22) * 0.12;
    }
    if (shell.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.35) * 0.035;
      shell.current.scale.setScalar(pulse + (active === "home" ? 0.04 : 0));
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.02, 5]} />
        <MeshDistortMaterial
          color={active === "projects" ? "#9cff57" : "#31e8c0"}
          emissive="#0a755f"
          emissiveIntensity={1.25}
          roughness={0.18}
          metalness={0.62}
          distort={0.32}
          speed={2.1}
        />
      </mesh>
      <mesh ref={shell} scale={1.24}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#51ffe0" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0.2, 0]}>
        <torusGeometry args={[1.48, 0.012, 12, 180]} />
        <meshBasicMaterial color="#7dffe4" transparent opacity={0.75} />
      </mesh>
      <mesh rotation={[0.7, 0.2, 0.8]}>
        <torusGeometry args={[1.72, 0.008, 8, 180]} />
        <meshBasicMaterial color="#70a8ff" transparent opacity={0.45} />
      </mesh>
      <pointLight color="#42ffd0" intensity={5.2} distance={8} />
      <Sparkles count={90} scale={3.8} size={2.4} speed={0.35} color="#8affde" />
    </group>
  );
}

function OrbitalNode({
  node,
  active,
  onNavigate,
}: {
  node: (typeof nodes)[number];
  active: boolean;
  onNavigate: (section: WorldSection) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * (active ? 0.28 : 0.1);
    const target = active ? 1.18 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.08);
    ref.current.position.y = node.position[1] + Math.sin(state.clock.elapsedTime * 0.8 + node.position[0]) * 0.07;
  });

  return (
    <group ref={ref} position={node.position}>
      <Float speed={active ? 2.4 : 1.2} rotationIntensity={0.12} floatIntensity={0.25}>
        <mesh
          onClick={(event) => {
            event.stopPropagation();
            onNavigate(node.id);
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
          }}
        >
          <octahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={active ? 2.2 : 0.7}
            metalness={0.7}
            roughness={0.22}
          />
        </mesh>
        <Trail
          width={active ? 1.2 : 0.45}
          length={active ? 5 : 2}
          color={node.color}
          attenuation={(t) => t * t}
        >
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color={node.color} />
          </mesh>
        </Trail>
        <mesh scale={active ? 1.9 : 1.4}>
          <sphereGeometry args={[0.31, 20, 20]} />
          <meshBasicMaterial color={node.color} wireframe transparent opacity={active ? 0.38 : 0.14} />
        </mesh>
        <Html distanceFactor={9} position={[0.42, 0.04, 0]} center>
          <button
            className={`world-node-label ${active ? "is-active" : ""}`}
            style={{ "--node-color": node.color } as React.CSSProperties}
            onClick={(event) => {
              event.stopPropagation();
              onNavigate(node.id);
            }}
          >
            <span className="node-number">{node.number}</span>
            <span className="node-copy">
              <strong>{node.label}</strong>
              <small>{node.sub}</small>
            </span>
          </button>
        </Html>
      </Float>
      {active && (
        <pointLight color={node.color} intensity={1.8} distance={3.5} />
      )}
    </group>
  );
}

function WorldScene({ active, onNavigate, theme }: Props) {
  const cameraTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  useFrame(({ camera }, delta) => {
    const isHome = active === "home";
    const offset = isHome ? 0 : nodes.find((n) => n.id === active)?.position[0] ?? 0;
    const targetX = isHome ? 0 : offset * 0.08;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 1.1, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, isHome ? 0 : 0.08, 1.1, delta);
    camera.lookAt(cameraTarget);
  });

  const fogColor = theme === "light" ? "#dce9e8" : theme === "cyber" ? "#06110e" : "#05090c";
  return (
    <>
      <color attach="background" args={[fogColor]} />
      <fog attach="fog" args={[fogColor, 9, 25]} />
      <ambientLight intensity={theme === "light" ? 1.25 : 0.45} />
      <pointLight position={[0, 4, 5]} intensity={2.5} color="#b5ffe8" />
      <pointLight position={[-6, -2, 0]} intensity={2.4} color="#00a98c" />
      <pointLight position={[6, 1, -2]} intensity={2} color="#477fff" />
      <Stars radius={90} depth={55} count={2600} factor={4} saturation={0.25} fade speed={0.6} />
      <Sparkles count={180} scale={[14, 9, 12]} size={2.2} speed={0.18} opacity={0.55} color="#7bffe0" />
      <group position={[0, 0, -1]}>
        <Core active={active} />
        {nodes.map((node) => (
          <OrbitalNode
            key={node.id}
            node={node}
            active={active === node.id}
            onNavigate={onNavigate}
          />
        ))}
        <mesh position={[0, 0, -4.5]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[5.1, 5.13, 120]} />
          <meshBasicMaterial color="#3b927f" transparent opacity={0.18} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, -5.4]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[6.4, 6.42, 120]} />
          <meshBasicMaterial color="#477baf" transparent opacity={0.13} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  );
}

export default function ImmersiveWorld(props: Props) {
  return (
    <div className="world-canvas" aria-label="Interactive 3D portfolio environment">
      <Canvas
        camera={{ position: [0, 0, 8.4], fov: 48, near: 0.1, far: 100 }}
        dpr={[1, 1.65]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#05090c");
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.12;
        }}
      >
        <Suspense fallback={null}>
          <WorldScene {...props} />
        </Suspense>
      </Canvas>
    </div>
  );
}
