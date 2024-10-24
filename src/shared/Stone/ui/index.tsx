export function Stone({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} scale={[1, 0.5, 1]} renderOrder={0}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={0.5}
        transparent={true}
        opacity={0.9}
      />
    </mesh>
  );
}
