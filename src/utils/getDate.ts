import { format } from 'date-fns';

const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();
const firstDay = new Date(y, m, 1);
const lastDay = new Date(y, m + 1, 0);

export const getYYMM = () => format(new Date(), 'yyyy-MM');

export const getThisMonth = m + 1;

export const firstDate = firstDay;

export const lastDate = lastDay;
