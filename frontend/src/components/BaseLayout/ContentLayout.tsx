import { Navbar } from "@/components/AdminNavBar/AdminNavBar";
import { useLocation } from "react-router-dom";
import { getRouteTitle } from "@/lib/utils";

interface ContentLayoutProps {
	title?: string;
	children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
	const location = useLocation();
	const dynamicTitle = title || getRouteTitle(location.pathname);

	return (
		<div>
			<Navbar title={dynamicTitle} />
			<div className="container py-12 px-12 sm:px-8">{children}</div>
		</div>
	);
}
