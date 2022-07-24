type PaginateParams = {
  [k: string]: any;
  offset: number;
  limit: number;
};

export interface Paginate {
  paginate(query: any, page: number, pageSize: number): PaginateParams;
}
