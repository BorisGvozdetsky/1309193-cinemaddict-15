const EMOJIS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'areadyWatched',
  FAVORITES: 'favorites',
};

const MenuItem = {
  FILMS: 'FILMS',
  STATISTICS: 'STATISTICS',
};

const StatsPeriod = {
  ALLTIME: 30000,
  TODAY: 1,
  WEEK: 6,
  MOUNTH: 30,
  YEAR: 365,
};

const WatchedFilm = {
  ZERO: 0,
  MIN: 10,
  MAX: 20,
};

const UserRank = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};


export {EMOJIS, SortType, UserAction, UpdateType, FilterType, MenuItem, StatsPeriod, WatchedFilm, UserRank, State};
