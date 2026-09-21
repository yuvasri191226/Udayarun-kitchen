export type DishCategory = "veg" | "nonveg" | "dessert";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  /**
   * Verified Unsplash source. Every URL in this file was HEAD-checked and
   * returns HTTP 200 (see README → "Image integrity"). If one ever dies,
   * <DishImage /> degrades to a gold-ringed placeholder instead of the
   * empty grey box that used to appear.
   */
  image: string;
  category: DishCategory;
  restaurant: string;
  prepTime: string;
  rating: number;
  spiceLevel: "mild" | "medium" | "hot" | "n/a";
  isPopular: boolean;
  isFeatured: boolean;
  badge?: string;
}

/* ═════════════════════════════════════════════════════════════
   38 PLATES — 12 vegetarian · 16 non-vegetarian · 10 desserts
   ════════════════════════════════════════════════════════════ */
export const dishes: Dish[] = [
  /* ─────────────── VEGETARIAN ────────────── */
  {
    id: "01", name: "Classic Podi Dosa",
    description:
      "Paper-thin fermented crepe lacquered with nut-brown ghee and house podi, with three chutneys.",
    price: 180,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=800",
    category: "veg", restaurant: "The Dosai Counter", prepTime: "12 min",
    rating: 4.8, spiceLevel: "medium", isPopular: true, isFeatured: true,
    badge: "Counter classic",
  },
  {
    id: "02", name: "Paneer Pepper Roast",
    description:
      "Fresh paneer seared hard with crushed Malabar pepper, curry leaf and pearl shallots.",
    price: 340,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800",
    category: "veg", restaurant: "The Clay Oven", prepTime: "26 min",
    rating: 4.7, spiceLevel: "hot", isPopular: true, isFeatured: true,
    badge: "Chef's signature",
  },
  {
    id: "03", name: "Mango Avocado Toast",
    description:
      "Thick sourdough with smashed avocado, ripe mango, radish and cold-pressed olive oil.",
    price: 280,
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=800",
    category: "veg", restaurant: "The Good Toast", prepTime: "15 min",
    rating: 4.7, spiceLevel: "mild", isPopular: true, isFeatured: true,
    badge: "Fresh pick",
  },
  {
    id: "04", name: "Truffle Mushroom Pasta",
    description:
      "Hand-rolled pappardelle with forest mushrooms, black truffle and silky parmesan cream.",
    price: 420,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800",
    category: "veg", restaurant: "Sugo", prepTime: "25 min",
    rating: 4.8, spiceLevel: "mild", isPopular: true, isFeatured: true,
    badge: "Bestseller",
  },
  {
    id: "05", name: "Basil Paneer Tikka",
    description:
      "Cottage cheese marinated in basil and spice, charcoal-grilled to a smoky finish.",
    price: 340,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=800",
    category: "veg", restaurant: "The Clay Oven", prepTime: "30 min",
    rating: 4.6, spiceLevel: "medium", isPopular: false, isFeatured: true,
    badge: "New today",
  },
  {
    id: "06", name: "Charred Corn Tacos",
    description:
      "Three soft corn tacos with charred street corn, pickled onion, cotija and chipotle mayo.",
    price: 290,
    image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&q=80&w=800",
    category: "veg", restaurant: "Little Mexico", prepTime: "20 min",
    rating: 4.5, spiceLevel: "medium", isPopular: false, isFeatured: true,
    badge: "Plant-powered",
  },
  {
    id: "07", name: "Paneer Kathi Roll",
    description:
      "Grilled paneer tikka wrapped in flaky paratha with mint chutney and a crisp salad.",
    price: 250,
    image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&q=80&w=800",
    category: "veg", restaurant: "Roll Call", prepTime: "18 min",
    rating: 4.4, spiceLevel: "mild", isPopular: false, isFeatured: false,
    badge: "On the go",
  },
  {
    id: "08", name: "Hyderabadi Veg Biryani",
    description:
      "Long-grain basmati layered with seasonal vegetables, saffron and caramelised onion.",
    price: 320,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800",
    category: "veg", restaurant: "Dum Pukht", prepTime: "35 min",
    rating: 4.7, spiceLevel: "mild", isPopular: true, isFeatured: true,
    badge: "Fragrant",
  },
  {
    id: "09", name: "Miso Ramen",
    description:
      "Deep miso broth with curly noodles, roasted corn, bamboo shoots and a soft egg.",
    price: 410,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800",
    category: "veg", restaurant: "Nori Nori", prepTime: "30 min",
    rating: 4.6, spiceLevel: "mild", isPopular: false, isFeatured: false,
    badge: "Slurp worthy",
  },
  {
    id: "10", name: "Paneer Nachos",
    description:
      "Crisp tortilla chips loaded with paneer tikka, melted cheese, guacamole and salsa.",
    price: 360,
    image: "https://images.unsplash.com/photo-1615937691194-97dbd3f3dc29?auto=format&fit=crop&q=80&w=800",
    category: "veg", restaurant: "Fiesta House", prepTime: "22 min",
    rating: 4.5, spiceLevel: "medium", isPopular: false, isFeatured: false,
    badge: "Shareable",
  },
  {
    id: "11", name: "Mediterranean Falafel Bowl",
    description:
      "Crisp falafel with quinoa, cucumber, olives, feta and a bright tahini drizzle.",
    price: 350,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    category: "veg", restaurant: "Olive & Fig", prepTime: "28 min",
    rating: 4.6, spiceLevel: "mild", isPopular: false, isFeatured: false,
    badge: "Garden fresh",
  },
  {
    id: "12", name: "Veggie Delight Pizza",
    description:
      "Wood-fired base with bell pepper, mushroom, olives, onion and torn basil.",
    price: 450,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800",
    category: "veg", restaurant: "Crust & Craft", prepTime: "30 min",
    rating: 4.7, spiceLevel: "mild", isPopular: true, isFeatured: false,
    badge: "Wood-fired",
  },

  /* ─────────────── NON-VEGETARIAN ────────────── */
  {
    id: "13", name: "Madurai Kari Dosa",
    description:
      "Thick dosai folded over a fiery mutton kari, finished with a cracked egg on the griddle.",
    price: 340,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "The Dosai Counter", prepTime: "22 min",
    rating: 4.8, spiceLevel: "hot", isPopular: true, isFeatured: true,
    badge: "Street legend",
  },
  {
    id: "14", name: "Nadan Chicken Biryani",
    description:
      "Kerala country-style biryani with short-grain rice, whole spice and fried shallots.",
    price: 390,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "Malabar Stories", prepTime: "35 min",
    rating: 4.9, spiceLevel: "hot", isPopular: true, isFeatured: true,
    badge: "Spice route",
  },
  {
    id: "15", name: "Dindigul Thalappakatti Mutton Biryani",
    description:
      "Seeraga samba rice cooked on dum with tender mutton, jeera samba spice and ghee.",
    price: 520,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "Dindigul Depot", prepTime: "45 min",
    rating: 4.9, spiceLevel: "hot", isPopular: true, isFeatured: true,
    badge: "Seeraga samba",
  },
  {
    id: "16", name: "Gongura Chicken Biryani",
    description:
      "Andhra biryani sharpened with sour gongura leaf, green chilli and fried cashew.",
    price: 430,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "Andhra Room", prepTime: "40 min",
    rating: 4.7, spiceLevel: "hot", isPopular: false, isFeatured: true,
    badge: "Tangy & fiery",
  },
  {
    id: "17", name: "Kozhi Varutharachathu",
    description:
      "Kerala chicken simmered in a dark, roasted coconut and shallot masala.",
    price: 460,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "Malabar Stories", prepTime: "38 min",
    rating: 4.8, spiceLevel: "hot", isPopular: true, isFeatured: true,
    badge: "Roasted coconut",
  },
  {
    id: "18", name: "Mutton Sukka Varuval",
    description:
      "Chettinad mutton tossed dry with black pepper, fennel and crisp fried curry leaf.",
    price: 510,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "Chettinad House", prepTime: "42 min",
    rating: 4.8, spiceLevel: "hot", isPopular: false, isFeatured: true,
    badge: "Chettinad dry",
  },
  {
    id: "19", name: "Coconut Prawn Curry",
    description:
      "Wild-caught prawns in a golden coconut milk curry with turmeric and curry leaf, seeraga samba rice and gunpowder on the side.",
    price: 560,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "The Coastal Catch", prepTime: "32 min",
    rating: 4.9, spiceLevel: "medium", isPopular: true, isFeatured: true,
    badge: "Wild caught",
  },
  {
    id: "20", name: "Meen Pollichathu",
    description:
      "Whole sea bass marinated in chilli and lime, wrapped in banana leaf and grilled.",
    price: 590,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "The Coastal Catch", prepTime: "40 min",
    rating: 4.8, spiceLevel: "hot", isPopular: false, isFeatured: true,
    badge: "Banana leaf",
  },
  {
    id: "21", name: "Butter Garlic Prawns",
    description:
      "Tiger prawns tossed in garlic butter, white wine and parsley, served sizzling.",
    price: 620,
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "The Coastal Catch", prepTime: "25 min",
    rating: 4.8, spiceLevel: "mild", isPopular: true, isFeatured: false,
    badge: "Sizzling",
  },
  {
    id: "22", name: "Korean Fried Chicken",
    description:
      "Double-fried wings glazed in gochujang honey with sesame and spring onion.",
    price: 420,
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "Seoul Kitchen", prepTime: "28 min",
    rating: 4.7, spiceLevel: "hot", isPopular: true, isFeatured: false,
    badge: "Gochujang",
  },
  {
    id: "23", name: "Fish Amritsari",
    description:
      "Gram-flour battered river fish with ajwain, fried crisp and served with lime.",
    price: 460,
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "Punjab Grill", prepTime: "30 min",
    rating: 4.6, spiceLevel: "medium", isPopular: false, isFeatured: false,
    badge: "Ajwain crisp",
  },
  {
    id: "24", name: "Pepperoni Sourdough Pizza",
    description:
      "Naturally leavened base, San Marzano sauce, fior di latte and spicy pepperoni.",
    price: 540,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "Crust & Craft", prepTime: "28 min",
    rating: 4.8, spiceLevel: "medium", isPopular: true, isFeatured: true,
    badge: "Sourdough base",
  },
  {
    id: "25", name: "Charred Pork Belly Bao",
    description:
      "Twice-cooked pork belly in steamed bao with pickled cucumber and hoisin.",
    price: 480,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "Bao Bar", prepTime: "34 min",
    rating: 4.7, spiceLevel: "medium", isPopular: false, isFeatured: false,
    badge: "Steamed to order",
  },
  {
    id: "26", name: "Smoked BBQ Ribs",
    description:
      "Slow-smoked pork ribs glazed in bourbon barbecue with a charred corn slaw.",
    price: 640,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "The Smoke Pit", prepTime: "55 min",
    rating: 4.9, spiceLevel: "mild", isPopular: true, isFeatured: false,
    badge: "Twelve-hour smoke",
  },
  {
    id: "27", name: "Tandoori Butter Chicken",
    description:
      "Charcoal-kissed chicken folded through a slow tomato and white butter gravy.",
    price: 480,
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "The Clay Oven", prepTime: "34 min",
    rating: 4.8, spiceLevel: "mild", isPopular: true, isFeatured: true,
    badge: "White butter",
  },
  {
    id: "28", name: "Chettinad Pepper Chicken",
    description:
      "Chicken roasted hard with Tellicherry pepper, fennel and stone-ground masala.",
    price: 450,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800",
    category: "nonveg", restaurant: "Chettinad House", prepTime: "36 min",
    rating: 4.7, spiceLevel: "hot", isPopular: false, isFeatured: false,
    badge: "Tellicherry",
  },
  {
    id: "29", name: "Matcha Tiramisu",
    description:
      "Layers of mascarpone and ceremonial matcha over espresso-soaked savoiardi.",
    price: 320,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800",
    category: "dessert", restaurant: "Bella Napoli", prepTime: "20 min",
    rating: 4.7, spiceLevel: "n/a", isPopular: true, isFeatured: true,
    badge: "Ceremonial grade",
  },
  {
    id: "30", name: "Salted Caramel Tart",
    description:
      "Buttery shortcrust with silky salted caramel and toasted pecans on top.",
    price: 240,
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800",
    category: "dessert", restaurant: "The Butter Room", prepTime: "25 min",
    rating: 4.8, spiceLevel: "n/a", isPopular: true, isFeatured: false,
    badge: "Little treat",
  },
  {
    id: "31", name: "Rose Falooda",
    description:
      "Rose syrup, vermicelli, basil seeds and vanilla ice cream in a chilled glass.",
    price: 220,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=800",
    category: "dessert", restaurant: "Melt", prepTime: "20 min",
    rating: 4.6, spiceLevel: "n/a", isPopular: false, isFeatured: false,
    badge: "Chilled",
  },
  {
    id: "32", name: "Pistachio Kulfi",
    description:
      "Traditional slow-churned kulfi with pistachio, saffron and a rose syrup drizzle.",
    price: 180,
    image: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&q=80&w=800",
    category: "dessert", restaurant: "Melt", prepTime: "15 min",
    rating: 4.5, spiceLevel: "n/a", isPopular: false, isFeatured: false,
    badge: "Classic",
  },
  {
    id: "33", name: "Chocolate Chip Cookie",
    description:
      "Warm gooey cookie with sea-salt flakes and a molten centre, baked to order.",
    price: 150,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800",
    category: "dessert", restaurant: "Crumb Club", prepTime: "15 min",
    rating: 4.6, spiceLevel: "n/a", isPopular: true, isFeatured: false,
    badge: "Warm & gooey",
  },
  {
    id: "34", name: "Dark Chocolate Mousse",
    description:
      "Silky Belgian dark chocolate mousse with crunchy hazelnut praline and edible gold.",
    price: 280,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800",
    category: "dessert", restaurant: "Cocoa Lab", prepTime: "20 min",
    rating: 4.9, spiceLevel: "n/a", isPopular: true, isFeatured: true,
    badge: "Rich & silky",
  },
  {
    id: "35", name: "Tiramisu Classico",
    description:
      "Espresso-soaked savoiardi layered with mascarpone cream and bitter cocoa.",
    price: 290,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800",
    category: "dessert", restaurant: "Bella Napoli", prepTime: "15 min",
    rating: 4.7, spiceLevel: "n/a", isPopular: false, isFeatured: false,
    badge: "Authentic",
  },
  {
    id: "36", name: "Mango Sticky Rice",
    description:
      "Alphonso mango with coconut sticky rice, toasted sesame and a salted coconut drizzle.",
    price: 260,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=800",
    category: "dessert", restaurant: "Siam Corner", prepTime: "22 min",
    rating: 4.7, spiceLevel: "n/a", isPopular: false, isFeatured: false,
    badge: "Seasonal",
  },
  {
    id: "37", name: "Vanilla Bean Panna Cotta",
    description:
      "Set cream perfumed with Madagascan vanilla, poached berries, crushed pistachio.",
    price: 270,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800",
    category: "dessert", restaurant: "The Butter Room", prepTime: "18 min",
    rating: 4.7, spiceLevel: "n/a", isPopular: true, isFeatured: false,
    badge: "Vanilla bean",
  },
  {
    id: "38", name: "Saffron Gulab Jamun",
    description:
      "Warm milk dumplings soaked in saffron-cardamom syrup with rose petals.",
    price: 190,
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800",
    category: "dessert", restaurant: "Mithai Room", prepTime: "18 min",
    rating: 4.8, spiceLevel: "n/a", isPopular: true, isFeatured: true,
    badge: "Made to order",
  },
];
/* ═════════════════════════════════════════════════════════════
   CATEGORY METADATA
   ═══════════════════════════════════════════════════════════ */

export const categories = [
  { id: "all", label: "All plates", icon: "\u2726", color: "default" },
  { id: "veg", label: "Vegetarian", icon: "\u25C9", color: "green" },
  { id: "nonveg", label: "Non-vegetarian", icon: "\u25C9", color: "red" },
  { id: "dessert", label: "Desserts", icon: "\u273F", color: "pink" },
];

export const heroStats = [
  { value: "30 min", label: "Average delivery" },
  { value: "4.8/5", label: "Loved by Chennai" },
  { value: "38", label: "Plates on the menu" },
];

/* ═════════════════════════════════════════════════════════════
   OPEN KITCHENS — the twelve counters behind the menu
   ═══════════════════════════════════════════════════════════ */

export interface Kitchen {
  name: string;
  craft: string;
  signature: string;
}

export const kitchens: Kitchen[] = [
  {
    name: "The Dosai Counter",
    craft: "Fermented batters, stone griddle",
    signature: "Classic Podi Dosa",
  },
  {
    name: "Malabar Stories",
    craft: "Roasted coconut, country spice",
    signature: "Kozhi Varutharachathu",
  },
  {
    name: "Chettinad House",
    craft: "Black pepper, fennel, dry roast",
    signature: "Mutton Sukka Varuval",
  },
  {
    name: "Dindigul Depot",
    craft: "Seeraga samba on dum",
    signature: "Dindigul Thalappakatti Mutton Biryani",
  },
  {
    name: "The Coastal Catch",
    craft: "Day boat fish, coconut milk",
    signature: "Coconut Prawn Curry",
  },
  {
    name: "Andhra Room",
    craft: "Gongura leaf, green chilli",
    signature: "Gongura Chicken Biryani",
  },
  {
    name: "The Clay Oven",
    craft: "Charcoal, hung curd marinade",
    signature: "Paneer Pepper Roast",
  },
  {
    name: "Sugo",
    craft: "Hand-rolled pasta, truffle",
    signature: "Truffle Mushroom Pasta",
  },
  {
    name: "Nori Nori",
    craft: "Slow broths, fresh noodles",
    signature: "Miso Ramen",
  },
  {
    name: "Crust & Craft",
    craft: "72-hour dough, wood fire",
    signature: "Pepperoni Sourdough Pizza",
  },
  {
    name: "The Butter Room",
    craft: "Laminated pastry, cultured butter",
    signature: "Vanilla Bean Panna Cotta",
  },
  {
    name: "Mithai Room",
    craft: "Saffron, cardamom, rose",
    signature: "Saffron Gulab Jamun",
  },
];
/* ═════════════════════════════════════════════════════════════
   THE CHEF'S TABLE — five unbroken courses, per guest
   ═══════════════════════════════════════════════════════════ */

export interface TastingCourse {
  /** Roman numeral shown beside the course. */
  course: string;
  title: string;
  note: string;
  /** Links the course to a plate so pricing lives in exactly one place. */
  dishId: string;
}

export const tastingMenu: TastingCourse[] = [
  {
    course: "I",
    title: "Counter opening",
    note: "Ghee podi dosai with three chutneys, eaten standing at the stone griddle.",
    dishId: "01",
  },
  {
    course: "II",
    title: "From the coals",
    note: "Paneer pepper roast in curry-leaf oil — or the mutton sukka varuval if you prefer.",
    dishId: "02",
  },
  {
    course: "III",
    title: "The long grain",
    note: "Seeraga samba biriyani, opened at the table, with a bowl of the day's kari.",
    dishId: "15",
  },
  {
    course: "IV",
    title: "Coastal course",
    note: "Coconut prawn curry with steamed rice, gunpowder spice and a green chutney.",
    dishId: "19",
  },
  {
    course: "V",
    title: "Pastry room",
    note: "Warm gulab jamun in saffron syrup, finished with pistachio kulfi.",
    dishId: "38",
  },
];

/* ═════════════════════════════════════════════════════════════
   MOMENTS — the scrollable gallery of the room
   ═══════════════════════════════════════════════════════════ */

export interface Moment {
  image: string;
  caption: string;
  meta: string;
}

export const moments: Moment[] = [
  {
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=900",
    caption: "The long table",
    meta: "Twenty-four feet, no head seat",
  },
  {
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=900",
    caption: "Service, called",
    meta: "Orders shouted across the pass",
  },
  {
    image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&q=80&w=900",
    caption: "Stone and steel",
    meta: "Twelve counters, one room",
  },
  {
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=900",
    caption: "Before doors",
    meta: "Ninety minutes of quiet",
  },
  {
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=900",
    caption: "Morning bake",
    meta: "Sourdough for the day ahead",
  },
  {
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=900",
    caption: "First light",
    meta: "Six am at the market",
  },
];
