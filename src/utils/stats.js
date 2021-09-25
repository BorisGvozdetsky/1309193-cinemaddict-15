import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const getFilmGenres = (films) => films.reduce((accumulator, film) => accumulator.concat(film.filmInfo.genre), []);

const makeItemsUnique = (items) => [...new Set(items)];

const sortGenreByCount = (genreA, genreB) => {
  const genreCountA = genreA.count;
  const genreCountB = genreB.count;

  return genreCountB - genreCountA;
};

const getGenresSorted = (uniqueGenres, films) => {
  const uniqueFilms = uniqueGenres.map((element) => ({
    genre: element,
    count: films.filter((film) => film === element).length,
  }));

  uniqueFilms.sort(sortGenreByCount);

  return {
    labels: uniqueFilms.map((element) => element.genre),
    data: uniqueFilms.map((element) => element.count),
  };
};

const getFilmsInPeriod = (from, to, films) => films.filter((film) => dayjs(film.userDetails.watchingDate).isBetween(from, to, null, []));

const getHoursAndMinutes = (minutes) => minutes ? {hours: Math.floor(minutes / 60), minutes: minutes % 60} : {hours: 0, minutes: 0};

const getTotalDuration = (films) => getHoursAndMinutes(films.reduce((acc, film) => acc + film.filmInfo.runtime, 0));

export {getFilmGenres, makeItemsUnique, sortGenreByCount, getGenresSorted, getFilmsInPeriod, getHoursAndMinutes, getTotalDuration};
