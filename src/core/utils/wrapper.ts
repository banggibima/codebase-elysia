interface Meta {
  page: number;
  size: number;
  count: number;
  total: number;
  sort: string;
  order: string;
}

interface Pagination {
  code: number;
  meta: Meta;
  data: any;
}

interface List {
  code: number;
  data: any;
}

interface Detail {
  code: number;
  data: any;
}

interface Success {
  code: number;
  message: string;
}

interface Error {
  code: number;
  message: string;
}

function pagination(code: number, meta: Meta, data: any) {
  const response: Pagination = {
    code,
    meta,
    data,
  };

  return response;
}

function list(code: number, data: any) {
  const response: List = {
    code,
    data,
  };

  return response;
}

function detail(code: number, data: any) {
  const response: Detail = {
    code,
    data,
  };

  return response;
}

function success(code: number, message: string) {
  const response: Success = {
    code,
    message,
  };

  return response;
}

function error(code: number, message: string) {
  const response: Error = {
    code,
    message,
  };

  return response;
}

const wrapper = {
  pagination,
  list,
  detail,
  success,
  error,
};

export default wrapper;
