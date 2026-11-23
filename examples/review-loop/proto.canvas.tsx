import "./src/styles.css";
import type { PrototypeFrameProps } from "@protohq/cli";
import type { ReactNode } from "react";

export function Canvas({ children }: { children: ReactNode }) {
  return <div className="solstice-canvas">{children}</div>;
}

export function Frame({ children }: PrototypeFrameProps) {
  return children;
}
