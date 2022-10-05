import { TitleSvg } from "@svg";
import { useCallback, useMemo, createRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { confetti } from "utils";

export default function Home() {
  const clickRef = createRef(null);

  const handleClick = (e) => {
    if (clickRef.current) {
      confetti(
        clickRef.current,
        {
          angle: 90,
          spread: 120,
          startVelocity: 40,
          elementCount: 100,
          dragFriction: 0.12,
          duration: 1500,
          stagger: 2,
        },
        {
          x: e.clientX,
          y: e.clientY,
          maxHeight: clickRef.current.offsetHeight,
          maxWidth: clickRef.current.offsetWidth,
        }
      );
    }
  };

  const [transform, setTransform] = useState(
    `translate(-50%, -50%) scale(${1.5})`
  );

  return (
    <div className="h-full">
      <div
        className="w-full h-1/5 relative overflow-hidden shadow-xl"
        onClick={handleClick}
        ref={(e) => {
          clickRef.current = e;
          if (e) {
            setTransform(
              `translate(-50%, -50%) scale(${
                ((e.offsetWidth / 1000) * 600) / 400
              })`
            );
          }
        }}
      >
        <TitleSvg
          className={"absolute top-1/2 left-1/2"}
          style={{
            transform,
          }}
        />
      </div>
    </div>
  );
}
