export const normalizeProducts = (data: any) => {
  if (!data) return [];

  if (Array.isArray(data)) return data;

  if (Array.isArray(data.products)) return data.products;

  if (Array.isArray(data.data?.products)) return data.data.products;

  if (Array.isArray(data.data)) return data.data;

  return [];
};