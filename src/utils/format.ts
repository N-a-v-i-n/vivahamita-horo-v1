export const formatValue = (value: any): string => {
  if (value === null || value === undefined || value === "") {
    return "Not Provided";
  }
  if (Array.isArray(value) && value.length === 0) {
    return "Not Provided";
  }
  if (typeof value === "object" && Object.keys(value).length === 0) {
    return "Not Provided";
  }
  return String(value);
};
