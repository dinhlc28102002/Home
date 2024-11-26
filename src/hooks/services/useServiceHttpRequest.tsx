import { useCallback, useMemo, useState } from "react";
import {
  ClientAdmin,
  ClientUser,
  HttpClient,
  Response,
} from "@/utils/HttpClient";
import { merge } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ERRORS_CODE, URL_ADMIN, URL_PAYMENT } from "@/utils/constants";
import { toast } from "react-toastify";

const useServiceHttpRequest = ({
  method,
  path,
  params,
  data,
}: {
  method?: string;
  path?: string;
  params?: any;
  data?: any;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  const client = new HttpClient(params);

  const isAdmin = useMemo(() => pathname.includes("/admin"), [pathname]);

  const planId = searchParams.get("planId");
  const salerId = searchParams.get("salerId");

  const options = useMemo(
    () => ({
      url: path,
      method: method == "Destroy" ? "Delete" : method,
      params: params ?? {},
      data: data ?? {},
    }),
    [data, params, method, path]
  );

  const handleRequest = useCallback(
    async ({ key, ...config }: any = {}, cb?: () => Promise<Response>) => {
      try {
        setLoading(true);

        let response = await (cb
          ? cb?.()
          : client.fetch(config.url, merge(options, config)));

        const { statusCode, ...rest } = response || {};

        const exceptionWithoutToast = [ERRORS_CODE.E00005, ERRORS_CODE.E00028];
        const exceptionAdminWithoutToast: string[] = [];
        if (
          !(
            statusCode == 200 ||
            (exceptionWithoutToast.includes(rest?.errorCode) && !isAdmin) ||
            (exceptionAdminWithoutToast.includes(rest?.errorCode) && isAdmin)
          )
        )
          toast.error(rest.errorMessage);

        if (
          statusCode === 401 ||
          statusCode === 401 ||
          (statusCode === 400 &&
            [ERRORS_CODE.E00007, ERRORS_CODE.E00024].includes(
              rest.errorCode
            )) ||
          statusCode === 403
        ) {
          if (isAdmin) {
            localStorage.removeItem("user_admin");
            router.push(URL_ADMIN.LOGIN);
          } else {
            localStorage.removeItem("user");
            router.push(
              `${URL_PAYMENT.LOGIN}?planId=${planId}&salerId=${salerId}`
            );
          }
        }

        return { _statusCode: statusCode, ...rest };
      } catch (err: any) {
        console.log(err);
        // Handle Errors here, handling is to be decided
        if (err.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          // console.log(err.response.data);
          // console.log(err.response.status);
          // console.log(err.response.headers);

          throw err.response;
        } else if (err.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(err.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("Error", err.message);

          return err;
        }
      } finally {
        setLoading(false);
      }
    },
    [client, options]
  );

  return {
    client,
    loading,
    request: handleRequest,
    ClientUser: {
      Get: (resource: string, otps?: any) =>
        handleRequest({}, () => ClientUser.Get(resource, otps)),
      Post: (resource: string, otps?: any) =>
        handleRequest({}, () => ClientUser.Post(resource, otps)),
      Put: (resource: string, otps?: any) =>
        handleRequest({}, () => ClientUser.Put(resource, otps)),
      Destroy: (resource: string, otps?: any) =>
        handleRequest({}, () => ClientUser.Destroy(resource, otps)),
    },

    ClientAdmin: {
      Get: (resource: string, otps?: any) =>
        handleRequest({}, () => ClientAdmin.Get(resource, otps)),
      Post: (resource: string, otps?: any) =>
        handleRequest({}, () => ClientAdmin.Post(resource, otps)),
      Put: (resource: string, otps?: any) =>
        handleRequest({}, () => ClientAdmin.Put(resource, otps)),
      Destroy: (resource: string, otps?: any) =>
        handleRequest({}, () => ClientAdmin.Destroy(resource, otps)),
    },
  };
};

export default useServiceHttpRequest;
