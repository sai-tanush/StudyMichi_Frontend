export const getCardClassName = (index: number, card: { order: number }) => {
  let classNames = '';

  if (index === 0) {
    classNames += 'lg:col-span-2 lg:h-[250px] ';
  }

  classNames +=
    card.order % 2 === 1
      ? 'bg-richblack-700 lg:h-[250px] '
      : 'bg-richblack-900 lg:h-[250px] ';

  if (card.order === 3) {
    classNames += 'lg:col-start-2 ';
  }

  return classNames.trim();
};
