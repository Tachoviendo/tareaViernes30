export type Metadata = {
  total: number;
  page: number;
  limit: number;
  last_page: number;
};

// Forma en que llega una lista por páginas: los datos y la info de la página
export type Paginado<T> = {
  data: T[];
  meta: Metadata;
};

export type PaginacionParams = {
  page?: number;
  limit?: number;
};
