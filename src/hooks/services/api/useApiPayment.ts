import { useServiceUserRequest } from '../useServiceRequest';
import { SUCCESS_CODE } from '@/utils/constants';

function useApiUpdateProfile() {
  const PATH = '/authentication/update-profile';
  const { Post, loading } = useServiceUserRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

function useApiAddCard() {
  const PATH = '/card/create';
  const { Post, loading } = useServiceUserRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

function useApiResgisterLicense() {
  const PATH = '/license/register';
  const { Post, loading } = useServiceUserRequest();

  const Multipayment =
    typeof window == 'object' ? window?.['Multipayment' as any] : null;
  if (Multipayment)
    Multipayment?.['init' as keyof typeof Multipayment]?.(
      process.env.NEXT_PUBLIC_SHOP_ID,
    );

  return {
    fetchData: async ({ body, ...otps }: any) => {
      const { cardName, cardNo, expire, securityCode, holderName, cardSeq } =
        body;
      const getToken = Multipayment?.['getToken' as keyof typeof Multipayment];
      if (getToken) {
        return cardSeq
          ? await Post({
              path: PATH,
              body: {
                ...body,
                cardSeq,
              },
              ...otps,
            })
          : await new Promise((resolve) =>
              getToken?.(
                {
                  cardno: cardNo,
                  expire,
                  securitycode: securityCode,
                  holdername: holderName,
                },
                async (res: any) => {
                  if (res?.resultCode == SUCCESS_CODE.TOKEN_SUCCESS) {
                    const {
                      tokenObject: { token },
                    } = res;
                    resolve(
                      await Post({
                        path: PATH,
                        body: {
                          ...body,
                          token,
                          cardName,
                        },
                        ...otps,
                      }),
                    );
                  }
                },
              ),
            );
      }
    },
    loading,
  };
}

function useApiFetchUserLogin() {
  const PATH = '/authentication/profile-user';
  const { Get, data, loading } = useServiceUserRequest();

  return {
    fetchData: async (otps: any) => await Get({ path: PATH, ...otps }),
    data,
    loading,
  };
}

function useApiFetchCard() {
  const PATH = '/card/list';
  const { Get, data, loading } = useServiceUserRequest();

  return {
    fetchData: async () => await Get({ path: PATH }),
    data,
    loading,
  };
}

function useApiFetchHistory() {
  const PATH = '/license/list';
  const { Get, data, loading } = useServiceUserRequest();

  return {
    fetchData: async () => await Get({ path: PATH }),
    data,
    loading,
  };
}

function useApiUnRegister() {
  const PATH = '/license/unregister';
  const { Post, loading } = useServiceUserRequest();

  return {
    fetchData: async (otps: any) => await Post({ path: PATH, ...otps }),
    loading,
  };
}

function useApiSaveCard() {
  const PATH = '/card/create';
  const { Post, loading } = useServiceUserRequest();
  const Multipayment =
    typeof window == 'object' ? window?.['Multipayment' as any] : null;
  if (Multipayment)
    Multipayment?.['init' as keyof typeof Multipayment]?.(
      process.env.NEXT_PUBLIC_SHOP_ID,
    );

  return {
    fetchData: async ({
      body: { cardName, cardNo, expire, securityCode, holderName },
      ...otps
    }: any) => {
      const getToken = Multipayment?.['getToken' as keyof typeof Multipayment];
      if (getToken) {
        return await new Promise((resolve) =>
          getToken?.(
            {
              cardno: cardNo,
              expire: expire.substr(2) + expire.substr(0, 2),
              securitycode: securityCode,
              holdername: holderName,
            },
            async (res: any) => {
              if (res?.resultCode == SUCCESS_CODE.TOKEN_SUCCESS) {
                const {
                  tokenObject: { token },
                } = res;
                resolve(
                  await Post({
                    path: PATH,
                    body: { token, cardName },
                    ...otps,
                  }),
                );
              }
            },
          ),
        );
      }
    },
    loading,
  };
}

export {
  useApiUpdateProfile,
  useApiAddCard,
  useApiResgisterLicense,
  useApiFetchUserLogin,
  useApiFetchCard,
  useApiFetchHistory,
  useApiUnRegister,
  useApiSaveCard,
};
