export const httpExceptionMessages = {
  notFound: {
    product: (id: number): string => {
      return `Товар с Id = ${id} не найден`;
    },
    recommendation: (id: number): string => {
      return `Рекомендация с Id = ${id} не найдена`;
    },
  },
  type: {
    vendor:
      'Параметр id производителей должен быть последовательностью чисел, разделённых дефисом',
  },
};
