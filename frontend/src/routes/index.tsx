import { type ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NAVIGATION_CONSTANTS from "../constants/navigation";
import ListRingsPage from "@/pages/ListRings";
import Login from "@/pages/Login";
import PrivateRoute from "./privateRoute";
import { RingsProvider } from "@/pages/ListRings/context";
import CreateRingPage from "@/pages/CreateRing";
import { CreateRingProvider } from "@/pages/CreateRing/context";

export default function Router(): ReactElement {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<Navigate to={NAVIGATION_CONSTANTS.RINGS_HOME} replace={true} />
				}
			/>

			<Route path={NAVIGATION_CONSTANTS.LOGIN} element={<Login />} />

			<Route path={NAVIGATION_CONSTANTS.RINGS_HOME} element={<PrivateRoute />}>
				<Route
					path={NAVIGATION_CONSTANTS.RINGS_HOME}
					element={
						<RingsProvider>
							<ListRingsPage />
						</RingsProvider>
					}
				/>
			</Route>

			<Route path={NAVIGATION_CONSTANTS.RINGS_NEW} element={<PrivateRoute />}>
				<Route
					path={NAVIGATION_CONSTANTS.RINGS_NEW}
					element={
						<CreateRingProvider>
							<CreateRingPage />
						</CreateRingProvider>
					}
				/>
			</Route>

			<Route path={NAVIGATION_CONSTANTS.RING_EDIT} element={<PrivateRoute />}>
				<Route
					path={NAVIGATION_CONSTANTS.RING_EDIT}
					element={
						<CreateRingProvider>
							<CreateRingPage />
						</CreateRingProvider>
					}
				/>
			</Route>
		</Routes>
	);
}
