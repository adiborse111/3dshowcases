/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import {
  useRef,
  useState,
  useContext,
  createContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Hud,
  OrbitControls,
  RenderTexture,
  OrthographicCamera,
  PerspectiveCamera,
  Text,
  Environment,
} from "@react-three/drei";
import { suspend } from "suspend-react";

const medium = import("@pmndrs/assets/fonts/inter_medium.woff");
const context = createContext();

const Torus = (props) => {
  const [hover, setHover] = useState(false);

  return (
    <mesh
      {...props}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <torusGeometry args={[1, 0.25, 32, 100]} />
      <meshStandardMaterial color={hover ? "hotpink" : "blue"} />
    </mesh>
  );
};

const Box = forwardRef(({ children, ...props }, fref) => {
  const ref = useRef();
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  useImperativeHandle(fref, () => ref.current, []);
  return (
    <mesh
      {...props}
      ref={ref}
      scale={click ? 1.5 : 1}
      onClick={() => setClick(!click)}
      onPointerMove={(e) => (
        e.stopPropagation(), setHover(e.face.materialIndex)
      )}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry />
      <context.Provider value={hover}>{children}</context.Provider>
    </mesh>
  );
});

const FaceMaterial = ({ children, index, ...props }) => {
  const hover = useContext(context);
  return (
    <meshStandardMaterial
      {...props}
      attach={`material-${index}`}
      color={hover === index ? "hotpink" : "blue"}
    >
      <RenderTexture frames={6} attach="map" anisotropy={16}>
        <color attach="background" args={["white"]} />
        <OrthographicCamera
          makeDefault
          left={-1}
          right={1}
          top={1}
          bottom={-1}
          position={[0, 0, 10]}
          zoom={0.5}
        />
        <Text font={suspend(medium).default} color="black">
          {children}
        </Text>
      </RenderTexture>
    </meshStandardMaterial>
  );
};

const ViewCube = ({ renderPriority = 1, matrix = new THREE.Matrix4() }) => {
  const mesh = useRef(null);
  const { camera, viewport } = useThree();

  useFrame(() => {
    matrix.copy(camera.matrix).invert();
    mesh.current.quaternion.setFromRotationMatrix(matrix);
  });

  return (
    <Hud renderPriority={renderPriority}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <Box
        ref={mesh}
        position={[viewport.width / 2 - 1, viewport.height / 2 - 1, 0]}
      >
        <FaceMaterial index={0}>front</FaceMaterial>
        <FaceMaterial index={1}>back</FaceMaterial>
        <FaceMaterial index={2}>top</FaceMaterial>
        <FaceMaterial index={3}>bottom</FaceMaterial>
        <FaceMaterial index={4}>left</FaceMaterial>
        <FaceMaterial index={5}>right</FaceMaterial>
      </Box>
    </Hud>
  );
};

export default function App() {
  return (
    <div className="h-screen">
      <Canvas>
        <ambientLight intensity={0.5 * Math.PI} />
        <Torus scale={1.75} />
        <ViewCube />
        <OrbitControls />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
