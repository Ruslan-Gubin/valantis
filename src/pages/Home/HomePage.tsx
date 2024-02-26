import { useEffect, useState } from "react";

import { productAdapter } from "@/entities";
import type {
  GetFilterItemsResponse,
  GetIdsResponse,
  GetItemsResponse,
  ProductModel,
} from "@/entities/product/DTO/product-dto";
import { usePagination } from "@/shared/hooks/usePagination";
import { TableMain, TableOptions } from "@/widgets/table/table-main/TableMain";
import { FilterOption, FilterTable } from "@/widgets/filter-table/FilterTable";
import { TableHeaderActions } from "@/widgets/table/table-header-actions/TableHeaderActions";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  const { changeCount, changePage, count, limit, page } = usePagination();
  const [productList, setProductList] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const filtersIds = (ids: string[]): string[] => {
    return Array.from(new Set(ids));
  };

  const getItems = (ids: string[]) => {
    (productAdapter.getItems({ ids }) as Promise<GetItemsResponse>)
      .then((response) => {
        if (response.hasOwnProperty("result")) {
          setProductList(response.result);
        } else {
          setIsLoading(false);
          throw "Failed id list not found";
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const fetchFilters = (payload: {
    price?: number;
    product?: string;
    brand?: string;
  }) => {
    setIsLoading(true);
    (productAdapter.filterItems(payload) as Promise<GetFilterItemsResponse>)
      .then((response) => {
        const filterId = filtersIds(response.result);
        getItems(filterId);
        changeCount(filterId.length);
      })
      .catch((error) => (console.error(error), setIsLoading(false)));
  };

  const getIdList = () => {
    setIsLoading(true);
    (
      productAdapter.fethIds({
        limit,
        offset: limit * (page - 1),
      }) as Promise<GetIdsResponse>
    )
      .then((response) => {
        if (response.hasOwnProperty("result")) {
          const filterId = filtersIds(response.result);
          getItems(filterId);
        } else {
          setIsLoading(false);
          throw "Failed id list not found";
        }
      })
      .catch((error) => (console.error(error), setIsLoading(false)));
  };

  useEffect(() => {
    getIdList();
  }, [page]);

  const resetPagination = () => changePage(1);

  const onCancelSearch = () => {
    resetPagination();
    changeCount(7992);
    getIdList();
    setIsSearch(false);
  };

  const onSubmitSearch = (values: {
    price?: number;
    product?: string;
    brand?: string;
  }) => {
    const payload: Record<string, string | number> = {};

    if (values.brand) {
      payload.bradn = values.brand;
    }

    if (values.price) {
      payload.price = Number(values.price);
    }

    if (values.product) {
      payload.product = values.product;
    }

    fetchFilters(payload);
    resetPagination();
    setIsSearch(true);
  };

  const dataFilterForTableBodyList = () => {
    const result = [];
    for (let i = 0; i < productList.length; i++) {
      const currentObject = productList[i];
      result.push([
        currentObject?.id,
        String(currentObject?.price),
        currentObject?.brand ? currentObject?.brand : "---",
        currentObject?.product,
      ]);
    }
    return result;
  };

  const tableOptions: TableOptions = {
    cellGridColums: "300px 150px 200px 1fr",
    headerDescription: ["ID", "Цена", "Бренд", "Название"],
    minWidth: 1200,
  };

  const dataFilterCell = dataFilterForTableBodyList();

  const filterOptions: FilterOption[] = [
    { label: "Название", field: "product", type: "text" },
    { label: "Цена", field: "price", type: "text" },
  ];

  return (
    <section className={styles.root}>
      <h1 className={styles.tableTitle}>список товаров</h1>
      <TableHeaderActions
        children={
          <FilterTable
            onSubminSearch={onSubmitSearch}
            onCancelSearch={onCancelSearch}
            filterOptions={filterOptions}
          />
        }
        links={[{ text: "Добавить пользователя", link: "/users/add" }]}
      />
      {tableOptions && (
        <TableMain
          isLoaded={isLoading}
          itemsList={dataFilterCell}
          options={tableOptions}
          image={false}
          totalCount={isSearch ? null : count}
          limit={limit}
          changePage={changePage}
          page={page}
        />
      )}
    </section>
  );
};

export default HomePage;
