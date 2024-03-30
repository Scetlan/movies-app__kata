import { format, parseISO } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';

const formatDateMovie = date => {
  const newDate = format(parseISO(date), 'MMMM d, y', { locale: ru });
  return newDate[0].toUpperCase() + newDate.slice(1);
};

export default formatDateMovie;