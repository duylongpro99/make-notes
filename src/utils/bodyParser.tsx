export const bodyParser = (value: string) => {
  try {
    JSON.parse(value);
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
