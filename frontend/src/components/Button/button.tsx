import type { ButtonHTMLAttributes } from "react";
import "./styles.css";
import Spinner from "../Spinner/spinner";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	href?: string;
	isLoading?: boolean;
	outline?: boolean;
};

const Button = ({
	href,
	isLoading,
	children,
	outline,
	...props
}: ButtonProps) => {
	if (href) {
		return (
			<button
				disabled={isLoading}
				className={`link-button ${outline && "outline"}`}
				{...props}
			>
				{isLoading ? <Spinner /> : <a href={href}>{children}</a>}
			</button>
		);
	}

	return (
		<button
			disabled={isLoading}
			className={`button ${outline && "outline"}`}
			{...props}
		>
			{isLoading ? <Spinner /> : children}
		</button>
	);
};

export default Button;
