import { useServiceAdminRequest } from '../../useServiceRequest';

function useApiSalerList() {
  const PATH = '/saler/list';

  const { Post, data, loading } = useServiceAdminRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

function useApiSalerEdit() {
  const PATH = '/saler/edit';

  const { Post, loading } = useServiceAdminRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

function useApiSalerDestroy() {
  const PATH = '/saler/deactivate';

  const { Destroy, loading } = useServiceAdminRequest();

  return {
    fetchData: async ({ salerId, ...otps }: any) =>
      await Destroy({ path: `${PATH}/${salerId}`, ...otps }),
    loading,
  };
}

export { useApiSalerList, useApiSalerEdit, useApiSalerDestroy };
