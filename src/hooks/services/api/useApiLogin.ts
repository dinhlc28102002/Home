import { useServiceUserRequest } from '../useServiceRequest';

function useApiGetPlanInfo() {
  const PATH = '/plan/info';

  const { Get, data, loading } = useServiceUserRequest();

  return {
    fetchData: async (otps: any) => await Get({ path: PATH, ...otps }),
    data,
    loading,
  };
}

function useApiLogin() {
  const PATH = '/authentication/request-password';
  const { Post, loading } = useServiceUserRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

function useApiConfirmPassword() {
  const PATH = '/authentication/verify-password';
  const { Post, loading } = useServiceUserRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

export { useApiGetPlanInfo, useApiLogin, useApiConfirmPassword };
