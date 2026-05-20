import { Card } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";

export const ProductCardSkeleton = () => {
	return (
		<Card className="p-6 flex flex-col gap-1">
			<Skeleton className="w-full aspect-square rounded-md mb-1" />
			<Skeleton className="h-3 w-1/3 rounded-md" />

			<div className="flex flex-col gap-5">
				<div className="flex flex-col gap-2">
					<div className="flex flex-col gap-1">
						<Skeleton className="h-4 w-3/4 rounded-md" />
						<Skeleton className="h-3 w-full rounded-md" />
						<Skeleton className="h-3 w-full rounded-md" />
						<Skeleton className="h-3 w-2/3 rounded-md" />
					</div>
					<div className="flex gap-3 items-center">
						<Skeleton className="h-4 w-16 rounded-md" />
						<Skeleton className="h-3 w-12 rounded-md" />
					</div>
				</div>
				<div className="flex gap-3">
					<Skeleton className="h-9 w-28 rounded-md" />
					<Skeleton className="h-9 w-16 rounded-md" />
				</div>
			</div>
		</Card>
	);
};
