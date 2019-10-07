import moment from 'moment';

const dateTime = new Date('Oct-06-2019 17:03');

const articles = [
  {
    id: 1,
    createdOn: moment(dateTime).format('MMM-DD-Y HH:mm'),
    title: 'Article title',
    article: 'Article body',
    authorId: 1,
    category: 'pivotal-tracker',
    inappropriateFlag: false,
    inappropriateFlagCount: 0
  },
  {
    id: 2,
    createdOn: moment(dateTime).format('MMM-DD-Y HH:mm'),
    title: 'Another Article title',
    article: 'Another Article body',
    authorId: 1,
    category: 'pivotal-tracker',
    inappropriateFlag: false,
    inappropriateFlagCount: 0
  }
];

export default articles;
