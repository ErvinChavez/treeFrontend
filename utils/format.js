//format status strings for display
export const formatStatus = (status) =>
  status.replaceAll("_"," ").replace(/\b\w/g, (c) => c.toUpperCase());

//display labels for payment methods
const PAYMENT_METHOD_LABELS = {
  check: "Check",
  zelle: "Zelle",
  venmo: "Venmo",
  cashapp: "Cash App",
  cash: "Cash",
  card: "Card",
};

export const PAYMENT_METHODS = Object.keys(PAYMENT_METHOD_LABELS);

export const formatPaymentMethod = (method) => PAYMENT_METHOD_LABELS[method] || method;

//format a currency amount for display
export const formatCurrency = (amount) =>
  Number(amount || 0).toLocaleString("en-US", { style: "currency", currency: "USD" });