import { useMemo } from "react";

export const SvgIcon = ({
  children,
  width,
  height,
  fill = "none",
  className,
  viewBox,
  style,
  onClick,
}) => {
  const newViewBox = useMemo(() => {
    return viewBox ? viewBox : `0 0 ${width} ${height}`;
  }, [width, height]);

  return (
    <svg
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={newViewBox}
      width={width}
      height={height}
      fill={fill}
    >
      {children}
    </svg>
  );
};
