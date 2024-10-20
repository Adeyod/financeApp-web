const capitalizeFirstLetter = (value: string) => {
  const result = value.charAt(0).toUpperCase() + value.slice(1);
  return result;
};

const formatDate = (date = new Date()) => {
  const f_date = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const weekDayPrefix = f_date.split(' ')[0].substring(0, 3);
  const dateFormatted = `${weekDayPrefix}, ${f_date.split(',')[1]}, ${
    f_date.split(',')[2]
  }`;

  return dateFormatted;
};

const formattedNumber = (prop: number) => {
  const formatter = new Intl.NumberFormat('en-US');

  // const convertedProp = Number(prop);

  const result = formatter.format(prop);
  return result;
};

export { capitalizeFirstLetter, formatDate, formattedNumber };
