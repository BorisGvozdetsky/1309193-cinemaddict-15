const PlaceTypes = {
  BEFOREEND: 'beforeend',
  AFTERBEGIN: 'afterbegin',
};

const filmToFilterMap = {
  all: (films) => films.length,
  watchlist: (films) => films.filter((film) => film.userDetails.watchlist).length,
  alreadyWatched: (films) => films.filter((film) => film.userDetails.alreadyWatched).length,
  favorite: (films) => films.filter((film) => film.userDetails.favorite).length,
};

const render = (container, element, place = PlaceTypes.BEFOREEND) => {
  switch (place) {
    case PlaceTypes.AFTERBEGIN:
      container.prepend(element);
      break;
    case PlaceTypes.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countTasks]) => ({
    name: filterName,
    count: countTasks(films),
  }),
);

export {render, createElement, generateFilter, PlaceTypes};
