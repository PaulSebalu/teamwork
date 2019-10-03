import moment from 'moment';

const comments = [
  {
    id: 1,
    createdOn: moment('Sep-23-2019 14:06', 'MMM-DD-Y HH:mm'),
    article: 1,
    comment: 'Sample comment',
    author: 1
  },
  {
    id: 2,
    createdOn: moment('Sep-23-2019 14:06', 'MMM-DD-Y HH:mm'),
    article: 1,
    comment: 'Another comment',
    author: 1
  },
  {
    id: 3,
    createdOn: moment('Sep-23-2019 14:06', 'MMM-DD-Y HH:mm'),
    article: 2,
    comment: 'Another comment',
    author: 1
  }
];

export default comments;
