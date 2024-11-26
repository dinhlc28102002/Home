import { useEffect, useMemo, useState } from 'react';

type Props = {
  onGetList: (cb: () => void) => void;
};

type Data = {
  list?: [];
  pageSize?: number;
  totalPage?: number;
  totalRecord?: number;
  currentPage?: number;
};

export function useInit({ onGetList }: Props) {
  const [dataFetchs, setDataFetchs] = useState<Data>({});

  const activePage = useMemo(() => dataFetchs?.currentPage || 0, [dataFetchs]);
  const totalPages = useMemo(() => dataFetchs?.totalPage || 0, [dataFetchs]);

  useEffect(() => {
    onInit();
  }, []);

  function onInit(param?: { page: number }) {
    onGetList?.(() => {});
  }

  const handlePageClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onInit({ page });
    }
  };

  return {
    onInit,
  };
}
