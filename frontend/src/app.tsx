import { useState } from "react";
import { RingForm } from "./components/ring-form";
import { RingList } from "./components/ring-list";
import { Button } from "./components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogHeader,
} from "./components/ui/dialog";
import { useRings } from "./hooks/use-rings";
import { Toaster } from "./components/ui/sonner";
import type { RingFormData } from "./types/ring";
import { logout } from "./services/auth";
import { LoginForm } from "./components/login";

export function App() {
	const { rings, editingRing, handleSubmit, handleEditRing, handleDeleteRing } =
		useRings();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const onDialogClose = () => {
		setIsDialogOpen(false);
	};

	const onFormSubmit = (data: RingFormData) => {
		handleSubmit(data);
		setIsDialogOpen(false);
	};

	const handleLogout = () => {
		logout();
		setIsAuthenticated(false);
	};

	const handleLoginSuccess = () => {
		setIsAuthenticated(true);
	};

	if (!isAuthenticated) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
					<h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
					<LoginForm onLoginSuccess={handleLoginSuccess} />
				</div>
			</div>
		);
	}

	return (
		<>
			<Toaster />
			<div className="container mx-auto p-4">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-2xl font-bold">Gerenciador de Anéis</h1>
					<Button onClick={handleLogout}>Sair</Button>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button>Criar Novo Anel</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{editingRing ? "Editar Anel" : "Criar Novo Anel"}
							</DialogTitle>
						</DialogHeader>
						<RingForm ring={editingRing} onSubmit={onFormSubmit} />
					</DialogContent>
				</Dialog>

				<RingList
					rings={rings}
					onEdit={(ring) => {
						handleEditRing(ring);
						setIsDialogOpen(true);
					}}
					onDelete={handleDeleteRing}
				/>
			</div>
		</>
	);
}
