import { InventoryCatalogueItem } from "../lib/types";

export const inventoryItems: Omit<InventoryCatalogueItem, "id">[] = [
  // Food
  { name: "Pizza", emoji: "🍕", category: "Food" },
  { name: "Burgers", emoji: "🍔", category: "Food" },
  { name: "Hot Dogs", emoji: "🌭", category: "Food" },
  { name: "Salad", emoji: "🥗", category: "Food" },
  { name: "Sandwiches", emoji: "🥪", category: "Food" },
  { name: "Chips", emoji: "🍟", category: "Food" },
  { name: "Popcorn", emoji: "🍿", category: "Food" },
  { name: "Candy", emoji: "🍬", category: "Food" },
  { name: "Fruit", emoji: "🍉", category: "Food" },
  { name: "Cake", emoji: "🎂", category: "Food" },
  { name: "Dessert", emoji: "🧁", category: "Food" },
  { name: "Vegetarian food", emoji: "🥦", category: "Food" },

  // Drinks
  { name: "Water", emoji: "💧", category: "Drinks" },
  { name: "Soda", emoji: "🥤", category: "Drinks" },
  { name: "Juice", emoji: "🧃", category: "Drinks" },
  { name: "Coffee", emoji: "☕", category: "Drinks" },
  { name: "Tea", emoji: "🍵", category: "Drinks" },
  { name: "Ice", emoji: "🧊", category: "Drinks" },

  // Decorations
  { name: "Balloons", emoji: "🎈", category: "Decorations" },
  { name: "Banners", emoji: "🎏", category: "Decorations" },
  { name: "Tablecloths", emoji: "🟪", category: "Decorations" },
  { name: "Candles", emoji: "🕯️", category: "Decorations" },
  { name: "Flowers", emoji: "💐", category: "Decorations" },
  { name: "Confetti", emoji: "🎊", category: "Decorations" },
  { name: "Lights", emoji: "✨", category: "Decorations" },

  // Equipment
  { name: "Chairs", emoji: "🪑", category: "Equipment" },
  { name: "Tables", emoji: "🪑", category: "Equipment" },
  { name: "Speakers", emoji: "🔊", category: "Equipment" },
  { name: "Microphone", emoji: "🎤", category: "Equipment" },
  { name: "Cooler", emoji: "🧊", category: "Equipment" },
  { name: "Grill", emoji: "🔥", category: "Equipment" },
  { name: "Plates", emoji: "🍽️", category: "Equipment" },
  { name: "Cups", emoji: "🥛", category: "Equipment" },
  { name: "Cutlery", emoji: "🍴", category: "Equipment" },
  { name: "Napkins", emoji: "🧻", category: "Equipment" },
  { name: "Trash bags", emoji: "🗑️", category: "Equipment" },
];
