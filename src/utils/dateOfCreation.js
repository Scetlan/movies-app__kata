import { format, parseISO } from "date-fns";

const formattedDate = (date) => {
  const parsedDate = parseISO(date);
  return format(parsedDate, "MMMM d, yyyy");
}

export default formattedDate;