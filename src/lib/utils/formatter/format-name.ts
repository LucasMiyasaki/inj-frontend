export const formatName = (name?: string): string | undefined => {
  if (name) {
    const length = name.split(" ").length;

    return name.split(" ")[0] + name.split(" ")[length - 1].charAt(0)+".";
  }
};
