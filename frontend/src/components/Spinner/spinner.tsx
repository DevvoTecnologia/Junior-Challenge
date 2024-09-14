import type { HTMLAttributes } from "react";
import "./styles.css";

const Spinner = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
	return <div style={props.style} className="loader" />;
};

export default Spinner;
