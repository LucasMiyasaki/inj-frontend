export const translateBookType = (type: string): string => {
  switch (type) {
    case "GOSPEL":
      return "Evangelho";
    case "CHILD":
      return "Infantil";
    case "DEVOTIONAL":
      return "Devocional";
    case "THEOLOGY":
      return "Teologia";
    case "BIBLE_STUDY":
      return "Estudo Bíblico";
    case "CHRISTIAN_FICTION":
      return "Ficção Cristã";
    case "SPIRITUAL_SELF_HELP":
      return "Autoajuda Espiritual";
    case "BIOGRAPHY":
      return "Biografia";
    case "MISSIONS":
      return "Missões";
    case "CHRISTIAN_EDUCATION":
      return "Educação Cristã";
    case "FAMILY":
      return "Família";
    case "CHRISTIAN_LEADERSHIP":
      return "Liderança Cristã";
    default:
      return "";
  }
};
