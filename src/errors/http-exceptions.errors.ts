export const httpExceptionMessages = {
  notFound: {
    product: (id: number): string => {
      return `Товар с Id = ${id} не найден`;
    },
    recommendation: (id: number): string => {
      return `Рекомендация с Id = ${id} не найдена`;
    },
    category: (id: number): string => {
      return `Категория с Id = ${id} не найден`;
    },
    parameter: (id: number): string => {
      return `Параметр с Id = ${id} не найден`;
    },
    userAddress: (id: number): string => {
      return `Адрес с Id = ${id} не найден`;
    },
  },
  type: {
    vendor:
      'Параметр id производителей должен быть последовательностью чисел, разделённых дефисом',
  },
};
