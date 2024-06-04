import { Ref, forwardRef } from "react";
import Use from "./use";

type Props = { src: string } & JSX.IntrinsicElements["svg"];

const Svg = forwardRef(function SVG(
  { src, ...rest }: Props,
  ref: Ref<SVGSVGElement>
) {
  return (
    <svg {...rest} ref={ref}>
      <Use href={src} />
    </svg>
  );
});

export default Svg;
