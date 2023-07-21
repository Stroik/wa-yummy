export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() % 100;
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const padNumber = (number: number): string => number.toString().padStart(2, '0');

  const formattedDate = `${padNumber(day)}/${padNumber(month)}/${padNumber(year)} ${padNumber(
    hours
  )}:${padNumber(minutes)}`;

  return formattedDate;
};

export const formatNumber = (num: number): string | number =>
  num < 1000 ? num : `${Math.round(num / 1000)}K`;

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
