import { useMemo, useState, useEffect, useCallback } from "react";
import { DownSvg, CloseSvg, UpSvg } from "@svg";
import { debounce } from "lodash";
import classnames from "classnames";

export const MemoryList = ({ titleBg, visible, onClose }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [currentIndex, setIndex] = useState(0);
  const [show, isShow] = useState(false);
  useEffect(() => {
    if (visible) {
      isShow(true);
    }
  }, [visible]);

  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);

  const height = useMemo(() => {
    if (isBrowser) {
      return document.body.offsetHeight;
    } else {
      return 1000;
    }
  }, [isBrowser]);

  const handleUp = useCallback(
    debounce(() => {
      setIndex((index) => (index - 1) % titleBg.length);
    }, 300),
    []
  );

  const handleDown = useCallback(
    debounce(() => {
      setIndex((index) => (index + 1) % titleBg.length);
    }, 300),
    []
  );

  return (
    <div
      className={classnames(
        "fixed w-full h-full duration-150",
        visible ? "block" : "hidden",
        show ? "opacity-100 top-0" : "top-6 opacity-0"
      )}
    >
      <div
        className="relative h-full transition-all duration-500"
        style={{ top: `-${currentIndex * height}px` }}
      >
        {titleBg.map((v, index) => {
          return (
            <div
              key={v}
              className="relative w-full h-full top-0 box-border pt-16 pb-16 pl-4 pr-4 text-white font-semibold"
              style={{
                backgroundColor: v,
              }}
            >
              asd
            </div>
          );
        })}
      </div>
      <div className="fixed top-0 w-full flex items-center justify-end p-4 pb-2 box-border">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          {currentIndex > 0 && <UpSvg onClick={handleUp} />}
        </div>
        <CloseSvg
          onClick={() => {
            isShow(false);
            setTimeout(() => {
              onClose();
            }, 150);
          }}
        />
      </div>
      <div className="fixed w-full bottom-4 flex items-center justify-center animate-bounce">
        <DownSvg onClick={handleDown} />
      </div>
    </div>
  );
};
