import { useState } from "react";


const usePagination = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [count, setCount] = useState<number>(7992);

  const changeCount = (count: number) =>  count && setCount(() => count);

  const changePage = (page: number) =>  setPage(Number(page));
  
  const changeLimit = ({ limit }: { limit: number }) => (setLimit(Number(limit)),setPage(1));

  return { changePage, changeLimit, changeCount, page, limit, count };
}

export { usePagination }