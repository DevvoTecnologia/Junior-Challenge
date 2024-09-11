import type { ButtonHTMLAttributes } from "react";
import "./styles.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	href?: string;
};

const Button = ({ href, ...props }: ButtonProps) => {
	if (href) {
		return (
			<button className="link-button" {...props}>
				<a href={href}>{props.children}</a>
			</button>
		);
	}

	return <button className="button" {...props} />;
};

export default Button;
