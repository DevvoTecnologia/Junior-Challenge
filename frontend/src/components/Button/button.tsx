import type { ButtonHTMLAttributes } from "react";
import "./styles.css";
import Spinner from "../Spinner/spinner";
import { Link } from "react-router-dom";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	href?: string;
	isLoading?: boolean;
};

const Button = ({ href, isLoading, children, ...props }: ButtonProps) => {
	if (href) {
		return (
			<button disabled={isLoading} className="link-button" {...props}>
				{isLoading ? <Spinner /> : <Link to={href}>{children}</Link>}
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
