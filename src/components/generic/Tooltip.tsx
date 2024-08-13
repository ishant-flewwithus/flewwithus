import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  let id = new Date().getTime().toString();
  return (
    <div>
      <div data-tooltip-id={id} data-tooltip-content={content}>
        {children}
      </div>
      <ReactTooltip id={id} />
    </div>
  );
}
