import { FOODS_COPY } from "../pages/Foods.jsx";
import { DRINKS_COPY } from "../pages/Drinks.jsx";
import { SNACKS_COPY } from "../pages/Snacks.jsx";

const CATEGORY_INFO = {
  foods: {
    basePath: "/foods",
    labels: {
      vi: "Món ăn",
      en: "Foods",
    },
  },
  drinks: {
    basePath: "/drinks",
    labels: {
      vi: "Thức uống",
      en: "Drinks",
    },
  },
  snacks: {
    basePath: "/snacks",
    labels: {
      vi: "Ăn vặt",
      en: "Snacks",
    },
  },
};

const CATEGORIES = [
  { key: "foods", copy: FOODS_COPY },
  { key: "drinks", copy: DRINKS_COPY },
  { key: "snacks", copy: SNACKS_COPY },
];

function resolveLanguageCopy(copy, language) {
  if (!copy) return null;
  if (copy[language]) return copy[language];
  if (copy.vi) return copy.vi;
  if (copy.en) return copy.en;
  const firstLocale = Object.values(copy)[0];
  return firstLocale || null;
}

export function getSearchItems(language = "vi") {
  return CATEGORIES.flatMap(({ key, copy }) => {
    const localized = resolveLanguageCopy(copy, language);
    if (!localized || !Array.isArray(localized.dishes)) return [];

    return localized.dishes.map((dish) => {
      const hero = dish.hero || {};
      const categoryMeta = CATEGORY_INFO[key];
      const categoryLabel =
        (categoryMeta?.labels && (categoryMeta.labels[language] || categoryMeta.labels.vi)) || key;

      return {
        id: `${key}-${dish.id}`,
        slug: dish.id,
        name: hero.title || dish.name || "",
        eyebrow: hero.eyebrow || "",
        description: hero.description || "",
        image: hero.image || "",
        category: key,
        categoryLabel,
        url: categoryMeta ? `${categoryMeta.basePath}#${dish.id}-details` : `/${key}`,
        raw: dish,
      };
    });
  });
}

