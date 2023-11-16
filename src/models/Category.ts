export type Category = {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export type SubCategory = {
  id: string;
  name: string;
  categoryId: string;
}
