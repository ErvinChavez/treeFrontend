//format status strings for display
export const formatStatus = (status) =>
  status.replaceAll("_"," ").replace(/\b\w/g, (c) => c.toUpperCase());