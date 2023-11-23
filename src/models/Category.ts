export type Category = {
  id: string;
  name: string;
  nameAR: string;
  nameRUS: string;
  subCategories: SubCategory[];
};

export type SubCategory = {
  id: string;
  name: string;
  nameAR: string;
  nameRUS: string;
  categoryId: string;
};
