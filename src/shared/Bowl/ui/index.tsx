import { Vector3 } from "three";
import { Stone } from "../../Stone";

type BowlProps = {};

function getRandomPositionInBowl(
  bottomRadius: number,
  topRadius: number,
  height: number
): Vector3 {
  // Generate a random position within the bounds of the bowl
  const angle = Math.random() * Math.PI * 2;

  // The stones will sit on or near the bottom of the bowl
  const y = Math.random() * 0.2; // Small range close to the bottom

  // Linear interpolation to calculate the radius at this height
  const interpolatedRadius =
    bottomRadius + (topRadius - bottomRadius) * (y / height);

  // Random distance from the center at this height
  const distance = Math.random() * interpolatedRadius * 0.9; // Keep stones inside the bowl

  const x = Math.cos(angle) * distance;
  const z = Math.sin(angle) * distance;

  return new Vector3(x, y, z);
}

function Stones({ count }: { count: number }) {
  const stones = [];
  for (let i = 0; i < count; i++) {
    const position = getRandomPositionInBowl(1, 2, 1); // Assuming bowl has a radius of 2

    stones.push(<Stone key={i} position={position.toArray()} color="black" />);
  }
  return <group>{stones}</group>;
}

export function Bowl({}: BowlProps) {
  return (
    <group position={[-13, 0, 8]}>
      {/* Outer surface of the bowl */}
      <mesh>
        <cylinderGeometry args={[2, 1, 1, 32, 1, true]} />
        <meshStandardMaterial color="white" side={2} />
      </mesh>
      {/* Inner surface of the bowl (slightly smaller and inverted) */}
      {/* Bottom of the bowl */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color="white" side={2} />
      </mesh>
      {/* Stones inside the bowl */}
      <Stones count={20} /> Add 20 stones
    </group>
  );
}
