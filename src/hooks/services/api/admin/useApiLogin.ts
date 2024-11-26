import { useServiceAdminRequest } from '../../useServiceRequest';

function useAdminLoginApi() {
  const PATH = '/authentication/login';
  const { Post, loading } = useServiceAdminRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

function useAdminForgotPassApi() {
  const PATH = '/authentication/forgot-password';
  const { Post, loading } = useServiceAdminRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

function useAdminResetPassApi() {
  const PATH = '/authentication/reset-password';
  const { Post, loading } = useServiceAdminRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

export { useAdminLoginApi, useAdminForgotPassApi, useAdminResetPassApi };
