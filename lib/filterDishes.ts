import { dishes, type Dish, type DishCategory } from "@/data/dishes";

/** Category filter value used across the menu UI and the /menu?category= links. */
export type DishFilter = DishCategory | "all";

export const validFilters: DishFilter[] = ["all", "veg", "nonveg", "dessert"];

/** Turn a raw query-string value into a safe filter (falls back to "all"). */
export const toFilter = (value: string | null | undefined): DishFilter =>
  value && validFilters.includes(value as DishFilter)
    ? (value as DishFilter)
    : "all";

/**
 * Filter the menu by category and free-text search.
 *
 * The search matches dish name, description, restaurant, badge and spice
 * level — so "biryani", "dum pukht" and "hot" all work.
 */
export function filterDishes(
  filter: DishFilter = "all",
  query = ""
): Dish[] {
  const byCategory =
    filter === "all" ? dishes : dishes.filter((d) => d.category === filter);

  const q = query.trim().toLowerCase();
  if (!q) return byCategory;

  return byCategory.filter((d) =>
    [d.name, d.description, d.restaurant, d.badge ?? "", d.spiceLevel]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}

/** Count of dishes per category — handy for badges and the legend. */
export const dishCounts = {
  all: dishes.length,
  veg: dishes.filter((d) => d.category === "veg").length,
  nonveg: dishes.filter((d) => d.category === "nonveg").length,
  dessert: dishes.filter((d) => d.category === "dessert").length,
} as const;