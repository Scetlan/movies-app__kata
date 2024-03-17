import { format, parseISO } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';

const formatDate = date => {
  const newDate = format(parseISO(date), 'MMMM d, y', { locale: enUS });
  return newDate[0].toUpperCase() + newDate.slice(1);
};

export default formatDate;