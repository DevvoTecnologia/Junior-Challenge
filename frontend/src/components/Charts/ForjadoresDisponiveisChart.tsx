import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { useForjadoresDisponiveis } from "@/hooks/useForjadoresDisponiveis";

export const ForjadoresDisponiveisChart: React.FC = () => {
	const data = useForjadoresDisponiveis();

	return (
		<div className="h-[300px] w-full">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={data}
					margin={{
						top: 20,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="usado" stackId="a" fill="#8884d8" />
					<Bar dataKey="disponivel" stackId="a" fill="#82ca9d" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};
