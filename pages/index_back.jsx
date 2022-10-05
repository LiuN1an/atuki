import Head from "next/head";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import classnames from "classnames";
import { gsap } from "gsap";

const Background = ({ height = 360, gap = 8, collocation = [] }) => {
  const [cells, setCells] = useState([]);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const totalHeight = document.body.offsetHeight;
    const totalWidth = document.body.offsetWidth;
    const cellWidth =
      Math.sqrt(Math.pow(totalWidth, 2) + Math.pow(totalHeight, 2)) * 2;
    const nums = Math.ceil(cellWidth / (height + gap));
    setWidth(cellWidth);
    setCells(() => {
      let _cells = new Array(nums).fill(undefined);
      for (let index = 0; index < _cells.length; index++) {
        _cells[index] = {
          width: cellWidth,
          height,
          gap,
          bgColor: collocation.length
            ? collocation[index % collocation.length]
            : "#fff",
        };
      }
      return _cells;
    });
  }, [height, gap, collocation]);

  const [w, sw] = useState(0);
  const [h, sh] = useState(0);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const run = (innerWidth, innerHeight) => {
      sw(innerWidth);
      sh(innerHeight);

      const list1 = new Array(
        Math.floor(innerWidth / (height + gap))
      ).fill(undefined);
      let start = height;
      for (let index = 0; index < list1.length; index++) {
        list1[index] = {
          m: `${start} 0`,
          l1: `${innerWidth} ${innerHeight - start}`,
          l2: `${innerWidth} ${innerHeight - start + height}`,
          l3: `${start - height} 0`,
        };
        start += height + gap;
      }

      const list2 = new Array(
        Math.floor(innerWidth / (height + gap))
      ).fill(undefined);
      start = height;
      for (let index = 0; index < list2.length; index++) {
        list2[index] = {
          m: `0 ${start}`,
          l1: `${innerWidth - start} ${innerHeight}`,
          l2: `${innerWidth - start + height} ${innerHeight}`,
          l3: `0 ${start - height}`,
        };
        start += height + gap;
      }

      setLines(
        [...list1.reverse(), ...list2].map((item, index) => ({
          ...item,
          bgColor: collocation.length
            ? collocation[index % collocation.length]
            : "#fff",
        }))
      );
    };
    run(window.innerWidth, window.innerHeight);

    const callback = (e) => {
      run(e.target.window.innerWidth, e.target.window.innerHeight);
    };

    window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("resize", callback);
    };
  }, [collocation, height, gap]);

  //   return (
  //     <div
  //       className="absolute rotate-45 origin-top"
  //       style={{ height: width, width: width }}
  //     >
  //       {cells.map((cell, index) => {
  //         return cell.bgColor ? (
  //           <div
  //             key={index}
  //             style={{
  //               height: cell.height,
  //               marginBottom: cell.gap,
  //               width: cell.width,
  //               backgroundColor: cell.bgColor,
  //             }}
  //             className="rounded-[65px]"
  //           />
  //         ) : null;
  //       })}
  //     </div>
  //   );

  return (
    <svg
      className="absolute"
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      version="1.1"
    >
      {lines.map((line, index) => {
        return (
          <path
            key={index}
            fill={line.bgColor}
            d={`M ${line.m} L ${line.l1} L ${line.l2} L ${line.l3} z`}
            className="cursor-pointer hover:opacity-90"
          />
        );
      })}
    </svg>
  );
};

const theme = [
  ["#025259", "#007172", "#f29325", "#d94f04", "#f4e2de"],
  ["#027373", "#038c7f", "#a9d9d0", "#f2e7dc", "#0d0d0d"],
  [
    "rgb(102, 36, 0)",
    "rgb(179, 63, 0)",
    "rgb(255, 107, 26)",
    "rgb(0, 102, 99)",
    "rgb(0, 179, 173)",
  ],
];
let index = 0;

export default function Home() {
  const [collocation, setCollocation] = useState(theme[0]);

  useEffect(() => {
    const clear = setInterval(() => {
      setCollocation([...theme[index++ % theme.length]]);
    }, 1500);
    return () => {
      clearInterval(clear);
    };
  }, []);

  return (
    <div className="h-full relative overflow-hidden">
      <Background collocation={collocation} />
      <div className="relative m-2 mx-36 p-4 box-border rounded-xl shadow-2xl flex justify-between items-center">
        <Button className="font-bold">Atuki</Button>
        <div className="flex flex-row gap-2">
          <Button px={8}>连接</Button>
        </div>
      </div>
    </div>
  );
}

const Button = ({ children, onClick, px = 2, className }) => {
  return (
    <div
      className={classnames(
        "bg-white  py-1 rounded-md cursor-pointer hover:bg-opacity-80",
        className
      )}
      style={{ paddingLeft: `${px * 4}px`, paddingRight: `${px * 4}px` }}
      onClick={() => (onClick ? onClick() : null)}
    >
      {children}
    </div>
  );
};
