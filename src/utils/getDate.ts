import { format } from 'date-fns';

export const getYYMM = () => format(new Date(), 'yyyy-MM');
