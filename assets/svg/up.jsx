import { SvgIcon } from "./wrapper";

export const UpSvg = ({ className, ...rest }) => {
  return (
    <SvgIcon
      width={48}
      height={48}
      className={className}
      viewBox={"0 0 1024 1024"}
      {...rest}
    >
      <path
        d="M533.333333 512L341.333333 704l29.866667 29.866667 162.133333-162.133334 162.133334 162.133334 29.866666-29.866667-192-192z m0-256L341.333333 448l29.866667 29.866667 162.133333-162.133334 162.133334 162.133334 29.866666-29.866667L533.333333 256z"
        fill="#ffffff"
        p-id="3296"
      ></path>
    </SvgIcon>
  );
};
