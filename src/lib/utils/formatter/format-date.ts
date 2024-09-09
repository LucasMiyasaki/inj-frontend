const NonNumeric = /\D/g;

const mapToNumeric = function mapToNumeric(value: string): string {
  return value.replace(NonNumeric, "");
};

export const formatToDateTime = function formatToDateTime(value: string): string {
  return mapToNumeric(value)
    .replace(/(\d{2})(\d{1,2})/, "$1/$2")
    .replace(/(\d{2})(\d{1,2})/, "$1/$2")
    .replace(/(\d{2})(\d{1,4})/, "$1 $2")
    .replace(/(\d{2})(\d{1,2})/, "$1:$2")
};

export const formatToDate = function formatToDate(value: string): string {
  return mapToNumeric(value)
    .replace(/(\d{2})(\d{1,2})/, "$1/$2")
    .replace(/(\d{2})(\d{1,2})/, "$1/$2")
}