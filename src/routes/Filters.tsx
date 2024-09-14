import { FilterIcon, FilterRemoveIcon, NoteIcon } from '@primer/octicons-react';
import { type FC, useContext } from 'react';

import Checkbox from '@atlaskit/checkbox';

import { Header } from '../components/Header';
import { Legend } from '../components/settings/Legend';
import { AppContext } from '../context/App';
import { BUTTON_CLASS_NAME } from '../styles/atlasify';
import { Size } from '../types';
import type { Category, Product, ReadState } from '../utils/api/types';
import {
  CATEGORIES,
  READ_STATES,
  getCategoryDetails,
  getReadStateDetails,
} from '../utils/filters';
import { PRODUCTS, getProductDetails } from '../utils/product';
import { formatProperCase } from '../utils/helpers';

export const FiltersRoute: FC = () => {
  const { settings, clearFilters, updateSetting } = useContext(AppContext);

  const shouldShowCategory = (category: Category) => {
    return settings.filterCategories.includes(category);
  };

  const updateCategoryFilter = (category: Category, checked: boolean) => {
    let categories: Category[] = settings.filterCategories;

    if (checked) {
      categories.push(category);
    } else {
      categories = categories.filter((c) => c !== category);
    }

    updateSetting('filterCategories', categories);
  };

  const shouldShowReadState = (readState: ReadState) => {
    return settings.filterReadStates.includes(readState);
  };

  const updateReadStateFilter = (readState: ReadState, checked: boolean) => {
    let readStates: ReadState[] = settings.filterReadStates;

    if (checked) {
      readStates.push(readState);
    } else {
      readStates = readStates.filter((rs) => rs !== readState);
    }

    updateSetting('filterReadStates', readStates);
  };

  const shouldShowProduct = (product: Product) => {
    return settings.filterProducts.includes(product);
  };

  const updateProductFilter = (product: Product, checked: boolean) => {
    let products: Product[] = settings.filterProducts;

    if (checked) {
      products.push(product);
    } else {
      products = products.filter((p) => p !== product);
    }

    updateSetting('filterProducts', products);
  };

  return (
    <div className="flex h-screen flex-col" data-testid="filters">
      <Header fetchOnBack={true} icon={FilterIcon}>
        Filters
      </Header>

      <div className="flex-grow overflow-x-auto px-8">
        <fieldset className="mb-3">
          <Legend icon={NoteIcon}>Category</Legend>

          {Object.keys(CATEGORIES).map((category: Category) => {
            return (
              <Checkbox
                key={category}
                name={category}
                label={formatProperCase(getCategoryDetails(category).name)}
                isChecked={shouldShowCategory(category)}
                onChange={(evt) =>
                  updateCategoryFilter(category, evt.target.checked)
                }
              />
            );
          })}
        </fieldset>

        <fieldset className="mb-3">
          <Legend icon={NoteIcon}>Read State</Legend>

          {Object.keys(READ_STATES).map((readState: ReadState) => {
            return (
              <Checkbox
                key={readState}
                name={readState}
                label={formatProperCase(getReadStateDetails(readState).name)}
                isChecked={shouldShowReadState(readState)}
                onChange={(evt) =>
                  updateReadStateFilter(readState, evt.target.checked)
                }
              />
            );
          })}
        </fieldset>

        <fieldset className="mb-3">
          <Legend icon={NoteIcon}>Products</Legend>

          {Object.keys(PRODUCTS).map((product: Product) => {
            return (
              <Checkbox
                key={`checkbox-${product}`}
                name={product}
                label={formatProperCase(getProductDetails(product).name)}
                isChecked={shouldShowProduct(product)}
                onChange={(evt) =>
                  updateProductFilter(product, evt.target.checked)
                }
              />
            );
          })}
        </fieldset>
      </div>

      <div className="flex items-center justify-between bg-gray-200 px-3 py-1 text-sm dark:bg-gray-darker">
        <div />
        <div>
          <button
            type="button"
            className={BUTTON_CLASS_NAME}
            title="Clear filters"
            onClick={clearFilters}
          >
            <FilterRemoveIcon
              size={Size.LARGE}
              className="mr-2"
              aria-label="Clear filters"
            />
            Clear filters
          </button>
        </div>
      </div>
    </div>
  );
};
