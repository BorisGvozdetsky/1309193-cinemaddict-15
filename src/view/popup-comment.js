const createPopupCommentTemplate = (itm) => {
  const {author, comment, date, emotion} = itm;
  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img  src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

export {createPopupCommentTemplate};
