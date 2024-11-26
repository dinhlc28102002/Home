import { useServiceAdminRequest } from '../../useServiceRequest';

function usePurchaseHistoryApi() {
  const PATH = '/license/list';
  const { Post, loading } = useServiceAdminRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

function useRenewPaymentApi() {
  const PATH = '/license/renew-payment';
  const { Post, loading } = useServiceAdminRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

export { usePurchaseHistoryApi, useRenewPaymentApi };
