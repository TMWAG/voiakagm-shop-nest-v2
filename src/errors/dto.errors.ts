export const dtoValidationError = {
  type: {
    string: 'Должен быть строкой',
    int: 'Должен быть целым числом',
    bool: 'Должен быть булевого типа',
    email: 'Должен быть адресом электронной почты',
    phone: 'Должен быть номером телефона',
    positive: 'Не может быть отрицательным',
    uuidV4: 'Должен быть uuid v4',
    partOfEnum: (en: string[]): string => {
      return `Должно иметь одно из следующих значений: ${en.join(', ')}`;
    },
  },
  length: {
    min: (min: number): string => {
      return `Не может быть меньше ${min}`;
    },
    max: (max: number): string => {
      return `Не может быть больше ${max}`;
    },
    fromTo: (min: number, max: number): string => {
      return `Должен быть длинной ${min}-${max} символа`;
    },
    in: (from: number, to: number): string => {
      return `Должно быть в диапазоне от ${from} до ${to}`;
    },
  },
};
