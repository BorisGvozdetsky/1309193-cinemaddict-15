import dayjs from 'dayjs';
import {getRandomInteger} from './common.js';
import {WatchedFilm, UserRank} from '../const.js';

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

const humanizeDate = (date) => dayjs(date).format('YYYY/MM/DD hh:mm');

const humanizeDatePopup = (date) => dayjs(date).format('DD MMMM YYYY');

const humanizeDateFilm = (date) => dayjs(date).format('YYYY');

const sortFilmByDate = (filmA, filmB) => dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));

const sortFilmByRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

const humanizeRuntime = (time) => `${Math.floor(time / 60)}h ${time % 60}m`;

const sortFilmByComments = (filmA, filmB) => filmB.comments.length - filmA.comments.length;

const getUserRank = (watchedFilmCount) => {
  const isNovice = watchedFilmCount > WatchedFilm.ZERO && watchedFilmCount <= WatchedFilm.MIN;
  const isFan = watchedFilmCount > WatchedFilm.MIN && watchedFilmCount <= WatchedFilm.MAX;
  const isMovieBuff = watchedFilmCount > WatchedFilm.MAX;

  if (isNovice) {
    return UserRank.NOVICE;
  } else if (isFan) {
    return UserRank.FAN;
  } else if (isMovieBuff) {
    return UserRank.MOVIE_BUFF;
  }
  return '';
};

export {generateDate, humanizeDate, humanizeDatePopup, humanizeDateFilm, sortFilmByDate, sortFilmByRating, humanizeRuntime, sortFilmByComments, getUserRank};
