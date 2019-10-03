import moment from 'moment';

const articles = [
  {
    id: 1,
    createdOn: moment('Sep-23-2019 14:06', 'MMM-DD-Y HH:mm'),
    title: 'Article title',
    article: 'Article body',
    authorId: 1,
    inappropriateFlag: false,
    inappropriateFlagCount: 0
  }
];

export default articles;
