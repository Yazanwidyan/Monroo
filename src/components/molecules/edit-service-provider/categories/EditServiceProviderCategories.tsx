import { Flex, FormControl, FormLabel } from '@chakra-ui/react';
import { Select as MultiSelect } from 'chakra-react-select';

import useEditServiceProviderCategories from './useEditServiceProviderCategories';
import styles from './EditServiceProviderCategories.module.scss';
import { useTranslation } from 'react-i18next';

export default function EditServiceProviderCategories() {
    const state = useEditServiceProviderCategories();
    const { t, i18n } = useTranslation();

    return (
        <Flex flexDirection="column" gap="12px" mb={4}>
            <FormControl isRequired>
                <FormLabel>{t('register.select_category')}</FormLabel>
                <MultiSelect
                    required
                    value={state.selectedCategory}
                    className={styles.categoriesMultiSelect}
                    isSearchable={true}
                    onChange={state.handleCategoryChange}
                    placeholder={t('register.select_category')}
                    name="category"
                    options={state.categories.map((category) => ({
                        label: i18n.language == 'en' ? category.name : i18n.language == 'ar' ? category.nameAR : category.nameRUS,
                        value: category.id,
                        catID: category.id,
                        name: category.name,
                        nameAR: category.nameAR,
                        nameRUS: category.nameRUS,
                    }))}
                />
            </FormControl>
            <FormControl isRequired isDisabled={!state.selectedCategory}>
                <FormLabel>{t('register.select_subcategory')}</FormLabel>
                <MultiSelect
                    required
                    value={state.selectedSubCategories}
                    className={styles.subCategoriesMultiSelect}
                    isSearchable={true}
                    onChange={state.handleSubCategoriesChange}
                    placeholder={t('register.select_subcategory')}
                    name="subCategories"
                    options={state.filteredSubCategories.map((category) => ({
                        label: i18n.language == 'en' ? category.name : i18n.language == 'ar' ? category.nameAR : category.nameRUS,
                        value: category.id,
                        id: category.id,
                        name: category.name,
                        nameAR: category.nameAR,
                        nameRUS: category.nameRUS,
                        catID: category.categoryId,
                    }))}
                />
            </FormControl>
        </Flex>
    );
}
