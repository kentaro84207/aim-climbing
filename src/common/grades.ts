import pink from '@material-ui/core/colors/pink';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import lightBlue from '@material-ui/core/colors/lightBlue';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import grey from '@material-ui/core/colors/grey';

type Grades = {
  [key: number]: string;
};

const grades = {
  0: '10-8級',
  1: '7級',
  2: '6級',
  3: '5級',
  4: '4級',
  5: '3級',
  6: '2級',
  7: '1級',
  8: '初段',
  9: '二段',
  10: '三段',
  11: '四段',
  12: '五段',
} as Grades;

export const gradeColors = {
  0: pink[300],
  1: orange[500],
  2: green[800],
  3: lightBlue[100],
  4: indigo[800],
  5: red.A700,
  6: yellow[500],
  7: grey[500],
  8: grey[800],
  9: grey[800],
  10: grey[800],
  11: grey[800],
  12: grey[800],
} as Grades;

export const contrastText = {
  0: '#000',
  1: '#000',
  2: '#fff',
  3: '#000',
  4: '#fff',
  5: '#fff',
  6: '#000',
  7: '#000',
  8: '#fff',
  9: '#fff',
  10: '#fff',
  11: '#fff',
  12: '#fff',
} as Grades;

export default grades;
