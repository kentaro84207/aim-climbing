import { format } from 'date-fns';

const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();
// 1週間前まで表示
const firstDay = new Date(y, m, -6);
const lastDay = new Date(y, m + 1, 0);

export const getYYMM = format(new Date(), 'yyyyMM');

export const getThisMonth = m + 1;

export const firstDate = firstDay;

export const lastDate = lastDay;
