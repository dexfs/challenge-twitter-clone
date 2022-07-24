export type PaginationOutput<Item = any> = {
  items: Item[];
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};

export class PaginationOutputMapper {
  static toOuput<Item = any>(items: Item[], params: any) {
    const last_page = Math.ceil(params.count / params.pageSize);
    return {
      items,
      total: params.count,
      per_page: parseInt(params.pageSize),
      last_page,
      current_page: parseInt(params.page),
    };
  }
}
