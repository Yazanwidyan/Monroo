import { useContext } from 'react';

import { LookupsContext } from '../../../../contexts/LookupsContext';
import { EditServiceProviderContext } from '../../../../contexts/EditServiceProviderContext';

export type MultiSelectOption = {
    label: string;
    value: string;
    catID: string;
};

export default function useEditServiceProviderCategories() {
    const { categories, subCategories } = useContext(LookupsContext);

    const { selectedCategory, selectedSubCategories, filteredSubCategories, handleCategoryChange, handleSubCategoriesChange } = useContext(EditServiceProviderContext);

    return {
        categories,
        subCategories,
        selectedCategory,
        selectedSubCategories,
        handleCategoryChange,
        handleSubCategoriesChange,
        filteredSubCategories,
    };
}
