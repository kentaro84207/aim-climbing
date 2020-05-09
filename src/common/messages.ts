type Messages = {
  create: string;
  edit: string;
  delete: string;
  done: string;
  [key: string]: string;
};

const messages = {
  create: '課題を作成しました！',
  edit: '課題を編集しました',
  delete: '課題を削除しました',
  done: 'おめでとう🎉次はどれ登る？',
} as Messages;

export default messages;
