/* eslint-disable react/no-unknown-property */
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Box = (props) => {
  const ref = useRef();

  const [hover, setHover] = useState(false);

  useFrame((state, delta) => (ref.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hover ? "hotpink" : "blue"} />
    </mesh>
  );
};

const app = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [click, setClick] = useState(false);

  return (
    <div className="w-screen h-screen">
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box
          position={[-1.2, 0, 0]}
          scale={click ? 1.5 : 1}
          onClick={() => setClick(!click)}
        />
        <Box
          position={[1.2, 0, 0]}
          scale={click ? 1.5 : 1}
          onClick={() => setClick(!click)}
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default app;
