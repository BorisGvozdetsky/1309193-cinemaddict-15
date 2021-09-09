import dayjs from 'dayjs';

export const humanizeDate = (date) => dayjs(date).format('YYYY/MM/DD hh:mm');

export const humanizeDatePopup = (date) => dayjs(date).format('DD MMMM YYYY');

export const humanizeDateFilm = (date) => dayjs(date).format('YYYY');

export const sortFilmByDate = (filmA, filmB) => dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));

export const sortFilmByRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

export const humanizeRuntime = (time) => `${Math.floor(time / 60)}h ${time % 60}m`;

export const sortFilmByComments = (filmA, filmB) => filmB.comments.length - filmA.comments.length;
