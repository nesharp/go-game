export function Stone({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} scale={[1, 0.5, 1]} renderOrder={0}>
      {/* Go stone - scaled for a flatter appearance */}
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color} // base jade color, use a greenish tint
        roughness={0.1} // low roughness for a glossy look
        metalness={0.5} // slight metallic to simulate a polished surface
        transparent={true} // enable transparency for jade-like effect
        opacity={0.9} // slight opacity to give it depth
      />{" "}
    </mesh>
  );
}
