import { ContentLayout } from "@/components/BaseLayout/ContentLayout";
import { AneisPorForjadorChart } from "@/components/Charts/AneisPorForjadorChart";
import { ForjadoresDisponiveisChart } from "@/components/Charts/ForjadoresDisponiveisChart";

function DashboardPage() {
	return (
		<ContentLayout>
			<div className="w-full grid grid-cols-1 place-content-center place-items-center items-start gap-8">
				<div className="w-full mb-12">
					<div>
						<h2 className="text-2xl font-bold mb-4 text-center uppercase font-title">
							Anéis por Forjador
						</h2>
					</div>
					<div>
						<p className="text-center">(Anéis criados por cada forjador)</p>
					</div>
					<div>
						<AneisPorForjadorChart />
					</div>
				</div>
				<div className="w-full">
					<h2 className="text-2xl font-bold mb-4 text-center font-title uppercase">
						Forjadores Disponíveis
					</h2>
					<ForjadoresDisponiveisChart />
				</div>
			</div>
		</ContentLayout>
	);
}

export default DashboardPage;
