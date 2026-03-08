export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN");
};

export const getStatusBadge = (status) => {
  switch (status) {
    case "Selected":
      return "badge-success";
    case "Rejected":
      return "badge-error";
    case "Pending":
      return "badge-warning";
    default:
      return "badge-neutral";
  }
};