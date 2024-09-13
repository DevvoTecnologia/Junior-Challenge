import type { HTMLAttributes } from "react";
import "./styles.css";

const Skeleton = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
	return <div style={props.style} className="skeleton-square" />;
};

export default Skeleton;
