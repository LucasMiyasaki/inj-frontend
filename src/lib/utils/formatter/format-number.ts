const mapToNumeric = function mapToNumeric(value: string): string {
    return value.replace(/[^\d]/g, "");
};

export const formatToInt = function formatToInt(value: string): string {
    return mapToNumeric(value)
        .replace(/[^\d]/g, "");
}