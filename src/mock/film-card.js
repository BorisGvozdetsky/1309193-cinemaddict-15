import {getRandomPositiveInteger, getRandomArrayElement, shuffleArray, getRandomFloatInteger, getRandomUniqueInteger, getRandomInteger} from '../utils/common.js';
import {humanizeDate} from '../utils/film.js';
import dayjs from 'dayjs';

const RATING_MAX = 9;
const COMMENTS_AMOUNT = 5;

const FILM_TITLES = [
  'Made for each other',
  'Popeye meets Sinbad',
  'Sagebrush trail',
  'Santa Claus conquers the Martians',
  'The dance of life',
  'The greate flamarion',
  'The man with the golden arm',
];

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const DIRECTORS = [
  'Anthony Mann',
  'Quentin Tarantino',
  'Steven Spielberg',
  'Alfred Hitchcock',
  'Stanley Kubrick',
  'Tim Burton',
  'Francis Ford Coppola',
  'Martin Scorsese',
  'Brian De Palma',
];

const WRITERS = [
  'Quentin Tarantino',
  'Ethan Coen',
  'Aaron Sorkin',
  'Charlie Kaufman',
  'Ernest Lehman',
  'James Cameron',
  'John Huston',
  'Kevin Smith',
  'Woody Allen',
];

const ACTORS = [
  'Tom Cruise',
  'Chris Hemsworth',
  'Henry Cavill',
  'Chris Evans',
  'Vin Diesel',
  'Leonardo Dicaprio',
  'Robert Downey Jr.',
];

const COUNTRIES = [
  'Argentina',
  'Malta',
  'Brazil',
  'Portugal',
  'Dominica',
  'Sweden',
  'Greece',
];

const GENRES = [
  'Musical',
  'Western',
  'Comedy',
  'Cartoon',
  'Drama',
  'Mystery',
];

const EMOJI = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const AUTHORS = [
  'Борис',
  'Натали',
  'Виктор',
  'Нина',
  'Владимир',
];

const MESSAGES = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
];

const AGE_RATING = [0, 6, 12, 18];

const descriptionCount = {
  MIN: 1,
  MAX: 5,
};

const actorsCount = {
  MIN: 1,
  MAX: 3,
};

const writersCount = {
  MIN: 1,
  MAX: 3,
};

const genreCount = {
  MIN: 1,
  MAX: 3,
};

const runtime = {
  MIN: 80,
  MAX: 200,
};

const generateDate = () => {
  const maxDaysGap = -20;
  const daysGap = getRandomInteger(0, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

const generateComment = () => {
  const date = generateDate();
  return {
    id: getRandomUniqueInteger(0, 100),
    author: getRandomArrayElement(AUTHORS),
    comment: getRandomArrayElement(MESSAGES),
    date: humanizeDate(date),
    emotion: (getRandomArrayElement(EMOJI)),
  };
};

const generateFilmCard = (index) => {
  const comments = new Array(getRandomPositiveInteger(0, COMMENTS_AMOUNT)).fill(null).map(generateComment);
  const descriptions = shuffleArray(DESCRIPTIONS).slice(0, getRandomPositiveInteger (descriptionCount.MIN, descriptionCount.MAX));
  const actors = shuffleArray(ACTORS).slice(0, getRandomPositiveInteger (actorsCount.MIN, actorsCount.MAX));
  const writers = shuffleArray(WRITERS).slice(0, getRandomPositiveInteger (writersCount.MIN, writersCount.MAX));
  const genres = shuffleArray(GENRES).slice(0, getRandomPositiveInteger (genreCount.MIN, genreCount.MAX));
  const date = generateDate();
  return {
    id: index,
    comments: comments,
    filmInfo: {
      title: getRandomArrayElement(FILM_TITLES),
      alternativeTitle: getRandomArrayElement(FILM_TITLES),
      totalRating: getRandomFloatInteger(0, RATING_MAX),
      poster: getRandomArrayElement(POSTERS),
      ageRating: getRandomArrayElement(AGE_RATING),
      director: getRandomArrayElement(DIRECTORS),
      writers: writers.join(', '),
      actors: actors.join(', '),
      release: {
        date: date,
        releaseCountry: getRandomArrayElement(COUNTRIES),
      },
      runtime: getRandomInteger(runtime.MIN, runtime.MAX),
      genre: genres,
      description: descriptions.join(' '),
    },
    userDetails: {
      watchlist: Boolean(getRandomPositiveInteger(0, 1)),
      alreadyWatched: Boolean(getRandomPositiveInteger(0, 1)),
      watchingDate: date,
      favorite: Boolean(getRandomPositiveInteger(0, 1)),
    },
  };
};

export {generateFilmCard};
