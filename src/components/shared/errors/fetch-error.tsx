import { CloudAlert } from "lucide-react";
import { Card, CardContent } from "#/components/ui/card";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "#/components/ui/empty";

export const FetchErrorCard = () => {
	return (
		<Card>
			<CardContent>
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon" className="bg-accent text-white">
							<CloudAlert />
						</EmptyMedia>
						<EmptyTitle>Oops!</EmptyTitle>
						<EmptyDescription className="text-muted">
							Ocurrió un error al obtener la información desde la base de datos.
							Recarga la página o intenta consultar más tarde.
						</EmptyDescription>
					</EmptyHeader>
				</Empty>
			</CardContent>
		</Card>
	);
};
