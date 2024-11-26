import { useServiceAdminRequest } from '../../useServiceRequest';

function useProfile() {
  const PATH = '/manager/profile';

  const { Get, data, loading } = useServiceAdminRequest();

  return {
    fetchData: async () => await Get({ path: PATH }),
    data,
    loading,
  };
}

function useVerifyEmail() {
  const PATH = '/manager/email-success';

  const { Get, data, loading } = useServiceAdminRequest();

  return {
    fetchData: async ({ code, ...otps }: any) =>
      await Get({ path: `${PATH}?code=${code}`, ...otps }),
    data,
    loading,
  };
}

function useChangeName() {
  const PATH = '/manager/change-name';
  const { Post, loading } = useServiceAdminRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

function useChangePassword() {
  const PATH = '/manager/change-password';
  const { Post, loading } = useServiceAdminRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

function useChangeEmail() {
  const PATH = '/manager/change-email';
  const { Post, loading } = useServiceAdminRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

export {
  useProfile,
  useVerifyEmail,
  useChangeName,
  useChangePassword,
  useChangeEmail,
};
