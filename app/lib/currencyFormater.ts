export const Formater = (value: string) => {
  const numaricvalue = parseFloat(value);
  if (isNaN(numaricvalue)) return "";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(numaricvalue);
};
