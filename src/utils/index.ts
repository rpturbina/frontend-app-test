export const isEmpty = (obj: Record<string, unknown>) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const formatDateToIDLocaleString = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateToYYYYMMDD = (date: string | Date): string => {
  return new Date(date).toISOString().split('T')[0];
};

export const formatDateToDateAndTime = (inputDatetime: string): string => {
  const date = new Date(inputDatetime);

  date.setHours(date.getHours() + 7);

  const outputDatetime =
    date
      .toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .replace(',', '') +
    ' ' +
    date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

  return outputDatetime;
};
