import { TitleSvg } from "@svg";
import {
  useCallback,
  useMemo,
  createRef,
  useState,
  useEffect,
  useRef,
} from "react";
import { isMobile } from "react-device-detect";
import { confetti } from "utils";
import { gsap } from "gsap";
import { MemoryList } from "@components";

const titleBg = ["#5E86BE", "#F4C15E", "#F3AD6F", "#D66943", "#8C3429"];

export default function Home() {
  const clickRef = useRef(null);

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

  const [transform, setTransform] = useState("translate(-50%, -50%)");

  useEffect(() => {
    const counter1 = setInterval(() => {
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
            x: 40,
            y: clickRef.current.offsetHeight,
            maxHeight: clickRef.current.offsetHeight,
            maxWidth: clickRef.current.offsetWidth,
          }
        );
      }
    }, 1000);

    const counter2 = setInterval(() => {
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
            x: clickRef.current.offsetWidth - 40,
            y: clickRef.current.offsetHeight,
            maxHeight: clickRef.current.offsetHeight,
            maxWidth: clickRef.current.offsetWidth,
          }
        );
      }
    }, 1500);
    setTransform(
      `translate(-50%, -50%) scale(${
        isMobile
          ? clickRef.current.offsetWidth / 600
          : ((clickRef.current.offsetWidth / 1000) * 600) / 600
      })`
    );

    return () => {
      clearInterval(counter1);
      clearInterval(counter2);
    };
  }, [clickRef.current]);

  useEffect(() => {
    const tween = gsap.timeline({
      delay: 0.1,
      repeat: -1,
      repeatRefresh: true,
    });
    let iter = tween;
    for (const [index, bg] of titleBg.entries()) {
      iter = iter
        .to(`#bg-item${index}`, {
          opacity: 0.45,
          duration: 0.15,
        })
        .to(`#bg-item${index}`, {
          opacity: 1,
          duration: 0.15,
        });
    }
    return () => {
      for (const [index, bg] of titleBg.entries()) {
        tween.kill(`#bg-item${index}`);
      }
    };
  }, []);

  const [visible, setVisible] = useState(false);

  return (
    <div className="h-full bg-white">
      <div
        className="w-full h-1/5 relative overflow-hidden shadow-xl flex"
        ref={clickRef}
      >
        {titleBg.map((bg, index) => {
          return (
            <div
              id={`bg-item${index}`}
              key={index}
              style={{ backgroundColor: bg }}
              className={"flex-1 h-full"}
            />
          );
        })}
        <TitleSvg
          className={"absolute top-1/2 left-1/2"}
          style={{
            transform,
          }}
        />
      </div>
      {/* <div className="text-[#c3c3c3] mt-4 p-2 font-thin text-xs flex items-center justify-center">
        那一定是轮回中深邃的缘分，让我在此世与你紧紧相拥
      </div> */}
      <div
        onClick={() => {
          setVisible(true);
        }}
        className="w-24 h-12 rounded-xl bg-[#8C3429] flex items-center justify-center text-white font-bold fixed bottom-4 left-1/2 -translate-x-1/2 hover:bg-opacity-75"
      >
        Go
      </div>
      <MemoryList
        titleBg={titleBg}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </div>
  );
}
