import { isArray } from 'lodash';

export type Options = {
  baseUrl: string;
  defaultOpts?: any;
  key?: 'user' | 'user_admin';
};

export type Response = {
  statusCode: number;
  _statusCode: number;
  message?: string;
  data?: any;
};

export class HttpClient {
  baseUrl;
  defaultOpts = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  key = 'user';

  constructor(otps: Options) {
    if (otps?.baseUrl) {
      this.baseUrl =
        otps.baseUrl.slice(-1) === '/'
          ? otps.baseUrl.slice(0, -1)
          : otps.baseUrl;
    }
    this.defaultOpts = { ...this.defaultOpts, ...(otps?.defaultOpts ?? {}) };
    this.key = otps?.key || 'user';
  }

  async fetch(resource: string, otpProps?: any): Promise<any> {
    let status = null;

    const isURL = /^(http|https):\/\//.test(resource);

    try {
      if (!isURL && resource.slice(0, 1) !== '/') {
        resource = `/${resource}`;
      }
      const url = this.baseUrl ? `${this.baseUrl}${resource}` : resource;
      const { headers = {}, ...otps } = otpProps;
      if (otps.body) otps.body = JSON.stringify(otps.body);
      let token = otps.token;

      if (typeof window !== 'undefined') {
        const { token: tokenStorage } = JSON.parse(
          localStorage.getItem(this.key) || '{}',
        );
        token = tokenStorage;
      }
      let res = await fetch(url, {
        cache: 'no-store',
        ...this.defaultOpts,
        ...(() =>
          token && !isURL
            ? {
                headers: {
                  ...this.defaultOpts.headers,
                  Authorization: `Bearer ${token}`,
                  ...headers,
                },
              }
            : {
                headers: {
                  ...this.defaultOpts.headers,
                  ...headers,
                },
              })(),
        ...otps,
      } as RequestInit | any).then(async (res: any) => {
        status = res.status;

        const string = await res.text();

        const data = string === '' ? {} : JSON.parse(string);

        return {
          ...(isArray(data) ? { data } : data),
          statusCode: res?.status,
        } as Response;
      });
      return res;
    } catch (err: any) {
      console.log(err.response);
      return {
        statusCode: status,
      };
    }
  }

  async Get(resource: string, otps?: any): Promise<Response> {
    const queryParams = Object.values(otps?.params || {}).some(
      (param) => !!param,
    )
      ? '?' +
        (await new URLSearchParams({
          ...Object.entries(otps?.params).reduce((arr: any, [key, value]) => {
            if (!!(value + '')?.length) arr[key] = value;
            return arr;
          }, {}),
        }))
      : '';
    return await this.fetch(resource + queryParams, { method: 'GET', ...otps });
  }

  Post(resource: string, otps?: any): Promise<Response> {
    return this.fetch(resource, { method: 'POST', ...otps });
  }

  Put(resource: string, otps?: any): Promise<Response> {
    return this.fetch(resource, { method: 'PUT', ...otps });
  }

  Destroy(resource: string, otps?: any): Promise<Response> {
    return this.fetch(resource, { method: 'DELETE', ...otps });
  }
}

export const ClientUser = new HttpClient({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL as string}`,
});

export const ClientAdmin = new HttpClient({
  baseUrl: `${process.env.NEXT_PUBLIC_API_ADMIN_URL as string}`,
  key: 'user_admin',
});
