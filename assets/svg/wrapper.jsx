import { useMemo } from "react";

export const SvgIcon = ({
  children,
  width,
  height,
  fill = "none",
  className,
  style,
}) => {
  const viewBox = useMemo(() => {
    return `0 0 ${width} ${height}`;
  }, [width, height]);

  return (
    <svg
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      fill={fill}
    >
      {children}
    </svg>
  );
};
