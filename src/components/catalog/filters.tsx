import { DollarSign, Layers, RotateCcw, Search, Tag } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { Separator } from "#/components/ui/separator";
import { Slider } from "#/components/ui/slider";
import { useCategories } from "#/hooks/categories/use-categories";
import type { FilterState } from "#/hooks/products/use-products-filter";
import { useProductFiltersMeta } from "#/hooks/products/use-products-filters-meta";

interface FiltersProps {
	filters: FilterState;
	setFilter: <K extends keyof FilterState>(
		key: K,
		value: FilterState[K],
	) => void;
	resetFilters: () => void;
}

export const Filters = ({ filters, setFilter, resetFilters }: FiltersProps) => {
	const { data: categories, isLoading: categoriesLoading } = useCategories();
	const { brands, maxPrice, isLoading: metaLoading } = useProductFiltersMeta();

	const toggleArrayFilter = (key: "categoryIds" | "brands", value: string) => {
		const current: string[] = filters[key] ?? [];
		const updated = current.includes(value)
			? current.filter((v) => v !== value)
			: [...current, value];
		setFilter(key, updated);
	};

	const priceRange: [number, number] = [
		filters.minPrice ?? 0,
		filters.maxPrice ?? maxPrice,
	];

	return (
		<aside className="hover:ring-1 ring-accent sticky top-30 text-foreground w-full max-w-xs rounded-xl bg-card border border-border p-5 flex flex-col max-h-[calc(100vh-2rem)] xl:h-fit gap-5 shadow-sm overflow-y-auto">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold text-base tracking-tight flex items-center gap-2">
					<Layers className="w-4 h-4 text-muted" />
					Filtros de Búsqueda
				</h3>
				<Button
					variant="link"
					size="sm"
					onClick={resetFilters}
					className="h-8 px-2 text-xs text-muted hover:text-destructive gap-1.5"
				>
					<RotateCcw className="w-3 h-3" />
					Limpiar
				</Button>
			</div>

			<Separator />

			{/* BÚSQUEDA */}
			<div className="flex flex-col gap-2">
				<Label className="text-xs font-semibold uppercase tracking-wider text-muted">
					Buscar
				</Label>
				<div className="relative">
					<Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
					<Input
						type="text"
						placeholder="¿Qué estás buscando?..."
						value={filters.search}
						onChange={(e) => setFilter("search", e.target.value)}
						className="pl-9"
					/>
				</div>
			</div>

			{/* CATEGORÍAS */}
			<div className="flex flex-col gap-2">
				<Label className="text-xs font-semibold uppercase tracking-wider text-muted">
					Categorías
				</Label>
				<div className="flex flex-col gap-2.5 max-h-36 overflow-y-auto pr-1 py-1">
					{categoriesLoading ? (
						<span className="text-xs text-muted">Cargando...</span>
					) : (
						(categories ?? []).map((cat) => (
							<div key={cat.id} className="flex items-center space-x-2">
								<Checkbox
									id={cat.id}
									checked={filters.categoryIds.includes(cat.id)}
									onCheckedChange={() =>
										toggleArrayFilter("categoryIds", cat.id)
									}
								/>
								<Label
									htmlFor={cat.id}
									className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									{cat.name}
								</Label>
							</div>
						))
					)}
				</div>
			</div>

			{/* MARCAS */}
			<div className="flex flex-col gap-2">
				<Label className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1">
					<Tag className="w-3 h-3" /> Marcas
				</Label>
				<div className="flex flex-col gap-2.5 max-h-36 overflow-y-auto pr-1 py-1">
					{metaLoading ? (
						<span className="text-xs text-muted">Cargando...</span>
					) : (
						brands.map((brand) => (
							<div key={brand} className="flex items-center space-x-2">
								<Checkbox
									id={brand}
									checked={filters.brands.includes(brand)}
									onCheckedChange={() => toggleArrayFilter("brands", brand)}
								/>
								<Label
									htmlFor={brand}
									className="text-sm font-medium leading-none cursor-pointer"
								>
									{brand}
								</Label>
							</div>
						))
					)}
				</div>
			</div>

			{/* RANGO DE PRECIO */}
			<div className="flex flex-col gap-3">
				<Label className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1">
					<DollarSign className="w-3 h-3" /> Rango de Precio
				</Label>
				<Slider
					min={0}
					max={maxPrice}
					step={50}
					value={priceRange}
					onValueChange={([min, max]) => {
						setFilter("minPrice", min === 0 ? null : min);
						setFilter("maxPrice", max === maxPrice ? null : max);
					}}
					className="w-full"
					disabled={metaLoading}
				/>
				<div className="flex justify-between text-xs text-muted">
					<span>${priceRange[0].toLocaleString()}</span>
					<span>${priceRange[1].toLocaleString()}</span>
				</div>
			</div>

			<Separator />

			{/* ORDENAR */}
			<div className="flex flex-col gap-2">
				<Label className="text-xs font-semibold uppercase tracking-wider text-muted">
					Ordenar por
				</Label>
				<Select
					value={filters.sortBy}
					onValueChange={(value) => setFilter("sortBy", value as any)}
				>
					<SelectTrigger className="w-full bg-background">
						<SelectValue placeholder="Selecciona el orden" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="newest">Más recientes</SelectItem>
						<SelectItem value="price_asc">Precio: Menor a Mayor</SelectItem>
						<SelectItem value="price_desc">Precio: Mayor a Menor</SelectItem>
						<SelectItem value="name_asc">Nombre: A-Z</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* SOLO OFERTAS */}
			<div className="flex items-center space-x-2 pt-2 border-t border-border">
				<Checkbox
					id="offers"
					checked={filters.onlyOnSale}
					onCheckedChange={(checked) => setFilter("onlyOnSale", !!checked)}
				/>
				<Label
					htmlFor="offers"
					className="text-sm font-medium text-muted hover:text-foreground cursor-pointer select-none transition-colors"
				>
					Solo productos en oferta %
				</Label>
			</div>
		</aside>
	);
};
