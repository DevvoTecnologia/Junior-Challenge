import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { useUser } from "@/context/userContext";
import { Outlet } from "react-router-dom";
import LoginPage from "@/pages/Login";
import { ReactElement } from "react";

const PrivateRoute = () => {
	const { user } = useUser();
	function withAuthenticatedLayout(children: ReactElement) {
		return <AuthenticatedLayout withSideBar>{children}</AuthenticatedLayout>;
	}

	if (!user) {
		return <LoginPage />;
	}

	return withAuthenticatedLayout(<Outlet />);
};

export default PrivateRoute;
