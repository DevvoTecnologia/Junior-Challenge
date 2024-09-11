import "./styles.css";
import { type InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string | null;
}

const Input = forwardRef<HTMLInputElement, Props>(
	({ label, error, id, ...props }, ref) => {
		return (
			<div className="input-container">
				{label && <label htmlFor={id}>{label}</label>}
				<input id={id} ref={ref} {...props} />
				<span className="text-error">{error}</span>
			</div>
		);
	},
);

export default Input;
