export const formatTimestampToDate = (timestamp: string) => {
  const timestampArr = timestamp.split('T');
  const date = timestampArr[0];
  const time = timestampArr[1];

  const [year, month, day] = [
    date.split('-')[0],
    date.split('-')[1],
    date.split('-')[2]
  ];

  const [hour, minute] = [time.split(':')[0], time.split(':')[1]];

  return `${day}/${month}/${year} ${hour}:${minute}`;
};
