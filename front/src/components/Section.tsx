import React from 'react';

interface SectionProps {
	children: React.ReactNode;
	title?: string;
	className?: string;
}

export default function Section({
	children,
	title,
	className,
}: SectionProps): JSX.Element {
	return (
		<div className="space-y-3 border-b-[1px] border-solid border-borderColor py-3">
			<p className="text-2xl font-bold">{title}</p>
			<div className={`space-y-2  pl-3 ${className}`}>{children}</div>
		</div>
	);
}
