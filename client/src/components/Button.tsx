import React from "react";

type ButtonProps = {
	children?: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	variant?: "primary" | "secondary" | "danger" | "warning" | "success" | "info";
};
export default function Button({
	children,
	onClick,
	disabled,
	type = "button",
	variant,
}: Readonly<ButtonProps>) {
	return (
		<button type={type} onClick={onClick} className={`btn btn-${variant}`} disabled={disabled}>
			{disabled ? " . . . " : children ?? "Click"}
		</button>
	);
}
