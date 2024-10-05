import { ContentLayout } from "@/components/BaseLayout/ContentLayout";
import { AnelManager } from "@/components/AnelManager/AnelManager";
const AneisEditPage = () => {
	return (
		<div>
			<ContentLayout>
				<div className="w-full grid grid-cols-1 place-content-center place-items-center items-start">
					<AnelManager />
				</div>
			</ContentLayout>
		</div>
	);
};

export default AneisEditPage;
