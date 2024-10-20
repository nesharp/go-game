import { FC, useEffect, useState } from "react";
import { Stone } from "../../../shared/Stone";
import { Vector3, Raycaster, Vector2, Camera, Scene } from "three";

type Props = {
  currentPlayer: "black" | "white";
  camera: Camera; // Додаємо камеру для перетворення
  scene: Scene; // Додаємо сцену для визначення точок пересічення
};

export const GameCursor: FC<Props> = ({ currentPlayer, camera, scene }) => {
  const [cursorPosition, setCursorPosition] = useState<Vector3>(
    new Vector3(0, 0, 0)
  );

  useEffect(() => {
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    // Обробник події руху миші
    const handleMouseMove = (event: MouseEvent) => {
      // Нормалізуємо координати миші в 2D просторі [-1, 1]
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Оновлюємо промінь з камери через курсор
      raycaster.setFromCamera(mouse, camera);

      // Перетинаємо площину або об'єкт для визначення позиції
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        // Встановлюємо позицію каменя на перетині з площиною/об'єктом
        setCursorPosition(intersects[0].point);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera, scene]);

  return (
    <Stone
      color={currentPlayer === "black" ? "black" : "white"}
      position={cursorPosition.toArray()} // Передаємо позицію каменя у вигляді масиву [x, y, z]
    />
  );
};
