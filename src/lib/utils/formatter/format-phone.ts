const NonNumeric = /\D/g;

const mapToNumeric = function mapToNumeric(value: string): string {
  return value.replace(NonNumeric, "");
};

export const formatToPhone = function formatToPhone(value: string): string {
  return mapToNumeric(value)
    .replace(/(\d{1,2})/, "($1")
    .replace(/(\(\d{2})(\d{1,4})/, "$1) $2")
    .replace(/( \d{4,5})(\d{1,4})/, "$1-$2");
};
