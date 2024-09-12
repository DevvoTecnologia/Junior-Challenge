import type { ButtonHTMLAttributes } from "react";
import "./styles.css";
import Spinner from "../Spinner/spinner";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	href?: string;
	isLoading?: boolean;
};

const Button = ({ href, isLoading, children, ...props }: ButtonProps) => {
	if (href) {
		return (
			<button disabled={isLoading} className="link-button" {...props}>
				{isLoading ? <Spinner /> : <a href={href}>{children}</a>}
			</button>
		);
	}

	return (
		<button disabled={isLoading} className="button" {...props}>
			{isLoading ? <Spinner /> : children}
		</button>
	);
};

export default Button;
