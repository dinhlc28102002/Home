import { useServiceAdminRequest } from '../../useServiceRequest';

function useAdminCustomerApi() {
  const PATH = '/customer/list';
  const { Post, loading } = useServiceAdminRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

function usePlanApi() {
  const PATH = '/plan/list';
  const { Get, data, loading } = useServiceAdminRequest();

  return {
    fetchData: async () => await Get({ path: PATH }),
    data,
    loading,
  };
}

export { useAdminCustomerApi, usePlanApi };
