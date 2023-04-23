export const randomCh = (length) => {
  let id = '';

  for (var i = 0; i < length; i++) {
    id += 'ab1cd2efg3hij4klmn5opqr6stu7vw8xy9z'.split('')[
      Math.floor(Math.random() * 34)
    ];
  }

  return id;
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number);
};
