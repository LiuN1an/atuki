import { SvgIcon } from "./wrapper";

export const DownSvg = ({ className, ...rest }) => {
  return (
    <SvgIcon
      width={48}
      height={48}
      className={className}
      viewBox={"0 0 1024 1024"}
      {...rest}
    >
      <path
        d="M533.333333 477.866667L341.333333 285.866667l29.866667-29.866667 162.133333 162.133333L695.466667 256l29.866666 29.866667-192 192z m0 256L341.333333 541.866667l29.866667-29.866667 162.133333 162.133333 162.133334-162.133333 29.866666 29.866667-192 192z"
        fill="#ffffff"
        p-id="2773"
      />
    </SvgIcon>
  );
};
