import Head from "next/head";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import classnames from "classnames";

const Background = ({ height = 90, gap = 8, collocation = [] }) => {
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

  return (
    <div
      className="absolute rotate-45 origin-top"
      style={{ height: width, width: width }}
    >
      {cells.map((cell, index) => {
        return cell.bgColor ? (
          <div
            key={index}
            style={{
              height: cell.height,
              marginBottom: cell.gap,
              width: cell.width,
              backgroundColor: cell.bgColor,
            }}
            className="rounded-[65px]"
          />
        ) : null;
      })}
    </div>
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

  //   useEffect(() => {
  //     const clear = setInterval(() => {
  //       setCollocation([...theme[index++ % theme.length]]);
  //     }, 1500);
  //     return () => {
  //       clearInterval(clear);
  //     };
  //   }, []);

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
