export const COLLECTION_NAMES = {
  notes: "notes",
};

export const collections = [
  {
    name: COLLECTION_NAMES.notes,
    id: import.meta.env.VITE_COLLECTION_NOTES_ID,
  },
];

export type TCollectionName = keyof typeof COLLECTION_NAMES;
