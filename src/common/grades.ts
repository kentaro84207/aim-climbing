type Grades = {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
  g: string;
  h: string;
  i: string;
  [key: string]: string;
};

const grades = {
  a: '10',
  b: '20',
  c: '40',
  d: '80',
  e: '160',
  f: '320',
  g: '640',
  h: '1280',
  i: '2560',
} as Grades;

export default grades;
