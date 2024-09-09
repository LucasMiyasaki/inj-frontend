export const translatePaymentType = (type: string): string => {
  switch (type) {
    case "PIX":
      return "Pix";
    case "CASH":
      return "Dinheiro";
    default:
      return "";
  }
};
