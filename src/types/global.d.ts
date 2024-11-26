type Method = 'Get' | 'Post' | 'Put' | 'Destroy';

type ParamRequest = {
  path: string;
  method?: string;
};

type DataResponse = {
  currentPage?: number;
  data?: any[];
  pageSize?: number;
  totalPage?: number;
  totalRecord?: number;
};

type Shop = {
  name: string;
  address: string;
  status: number;
  url: string;
  id: number;
  salerName: string;
  totalDay: string;
  totalMonth: string;
  totalYear: string;
  id: numer;
};

type Customer = {
  id: string;
  customerName: string;
  birthday: string;
  email: string;
  totalDay: string;
  totalMonth: string;
  totalYear: string;
};

type Plan = {
  id: string;
  planName: string;
};

type FormInputs = {
  fullName: string;
};
