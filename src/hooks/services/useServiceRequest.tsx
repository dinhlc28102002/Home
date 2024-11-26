import { useState } from "react";
import useServiceHttpRequest from "./useServiceHttpRequest";
import { useMutation } from "@tanstack/react-query";
import { useLoading } from "@/context/LoadingContext";

const useServiceRequest = (
  clientSelect?: "ClientUser" | "ClientAdmin" | null,
  params?: Record<string, string>
) => {
  const { setLoading } = useLoading();
  const service = useServiceHttpRequest({ ...params });

  const { loading, request: handleRequest } = service;
  const client = service[clientSelect as keyof typeof service] as any;

  const [data, setData] = useState();

  async function request(
    method: "Get" | "Post" | "Put" | "Destroy",
    path: string,
    otps?: any
  ) {
    setLoading(true);
    const response = await (clientSelect
      ? client[method](path, otps)
      : handleRequest({ method, url: path, ...otps }));
    return response;
  }

  const actions = {
    onSuccess: (data: any) => {
      setData(data);
      setLoading(false);
    },
    onError: (err: any) => {
      console.log(err);
      setLoading(false);
    },
  };

  const mutation = useMutation({
    mutationFn: async ({ method, otps, path }: any) => {
      return await request(method, path, otps);
    },
    ...actions,
  });

  return {
    loading,
    data,
    request: ({ path, method, ...otps }: ParamRequest) =>
      mutation.mutateAsync({ method, path, otps }),
    Get: ({ path, ...otps }: ParamRequest) =>
      mutation.mutateAsync({ method: "Get", path, otps }),
    Post: ({ path, ...otps }: ParamRequest) =>
      mutation.mutateAsync({ method: "Post", path, otps }),
    Put: ({ path, ...otps }: ParamRequest) =>
      mutation.mutateAsync({ method: "Put", path, otps }),
    Destroy: ({ path, ...otps }: ParamRequest) =>
      mutation.mutateAsync({ method: "Destroy", path, otps }),
  };
};

const useServiceUserRequest = () => {
  return useServiceRequest("ClientUser");
};

const useServiceAdminRequest = () => {
  return useServiceRequest("ClientAdmin");
};

export { useServiceUserRequest, useServiceAdminRequest, useServiceRequest };
