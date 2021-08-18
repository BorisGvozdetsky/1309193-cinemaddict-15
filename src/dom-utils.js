const PlaceTypes = {
  BEFOREEND: 'beforeend',
  AFTERBEGIN: 'afterbegin',
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

export {render, createElement, PlaceTypes};
