import dayjs from 'dayjs';
import {getRandomInteger} from './common.js';
import {WatchedFilm, UserRank} from '../const.js';

export const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

export const humanizeDate = (date) => dayjs(date).format('YYYY/MM/DD hh:mm');

export const humanizeDatePopup = (date) => dayjs(date).format('DD MMMM YYYY');

export const humanizeDateFilm = (date) => dayjs(date).format('YYYY');

export const sortFilmByDate = (filmA, filmB) => dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));

export const sortFilmByRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

export const humanizeRuntime = (time) => `${Math.floor(time / 60)}h ${time % 60}m`;

export const sortFilmByComments = (filmA, filmB) => filmB.comments.length - filmA.comments.length;

export const getUserRank = (watchedFilmCount) => {
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
