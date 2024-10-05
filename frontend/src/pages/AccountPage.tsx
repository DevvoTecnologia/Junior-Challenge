import { ContentLayout } from "@/components/BaseLayout/ContentLayout";
import UserAccountEdit from "@/components/UserAccountEdit/UserAccountEdit";
const AccountPage = () => {
	return (
		<main>
			<ContentLayout>
				<div className="w-full grid grid-cols-1 place-content-center place-items-center items-start">
					<UserAccountEdit />
				</div>
			</ContentLayout>
		</main>
	);
};

export default AccountPage;
