import { FOODS_COPY } from "../pages/Foods.jsx";
import { DRINKS_COPY } from "../pages/Drinks.jsx";
import { SNACKS_COPY } from "../pages/Snacks.jsx";

const CATEGORY_SOURCES = {
  foods: FOODS_COPY,
  drinks: DRINKS_COPY,
  snacks: SNACKS_COPY,
};

function cloneArray(value) {
  return Array.isArray(value) ? [...value] : [];
}

function selectLanguageEntry(map, language) {
  if (!map) return null;
  return map[language] || map.vi || map.en || Object.values(map)[0] || null;
}

function buildCatalog() {
  const catalog = {};

  Object.entries(CATEGORY_SOURCES).forEach(([category, copy]) => {
    if (!catalog[category]) {
      catalog[category] = {};
    }

    Object.entries(copy).forEach(([language, content]) => {
      content.dishes.forEach((dish) => {
        const hero = dish.hero || {};
        (dish.spots || []).forEach((spot) => {
          const existing = catalog[category][spot.id] || {
            languages: {},
            gallery: cloneArray(spot.gallery),
            image: spot.image || hero.image || null,
            mapUrl: spot.mapUrl || null,
            dish: {
              id: dish.id,
              heroImage: hero.image || null,
              languages: {},
            },
          };

          if (!existing.image && (spot.image || hero.image)) {
            existing.image = spot.image || hero.image;
          }

          if (!existing.gallery.length && Array.isArray(spot.gallery) && spot.gallery.length) {
            existing.gallery = cloneArray(spot.gallery);
          }

          if (!existing.mapUrl && spot.mapUrl) {
            existing.mapUrl = spot.mapUrl;
          }

          existing.languages[language] = {
            name: spot.name,
            description: spot.description || "",
            address: spot.address || "",
            price: spot.price || "",
          };

          existing.dish.languages[language] = {
            title: hero.title || "",
            eyebrow: hero.eyebrow || "",
            description: hero.description || "",
          };

          catalog[category][spot.id] = existing;
        });
      });
    });
  });

  return catalog;
}

const SPOT_CATALOG = buildCatalog();

export function getSpotName(category, id, language = "vi") {
  const entry = SPOT_CATALOG[category]?.[id];
  if (!entry) return null;
  const languageEntry = selectLanguageEntry(entry.languages, language);
  return languageEntry?.name || null;
}

export function getSpotDetail(category, id, language = "vi") {
  const entry = SPOT_CATALOG[category]?.[id];
  if (!entry) return null;

  const languageEntry = selectLanguageEntry(entry.languages, language);
  if (!languageEntry) return null;

  const dishEntry = selectLanguageEntry(entry.dish.languages, language) || {};
  const gallery = entry.gallery && entry.gallery.length ? cloneArray(entry.gallery) : [];
  if (!gallery.length && entry.image) {
    gallery.push(entry.image);
  }

  return {
    id,
    category,
    name: languageEntry.name,
    description: languageEntry.description,
    address: languageEntry.address,
    price: languageEntry.price,
    image: entry.image,
    gallery,
    mapUrl: entry.mapUrl,
    dish: {
      id: entry.dish.id,
      heroImage: entry.dish.heroImage,
      title: dishEntry.title,
      eyebrow: dishEntry.eyebrow,
      description: dishEntry.description,
    },
  };
}
