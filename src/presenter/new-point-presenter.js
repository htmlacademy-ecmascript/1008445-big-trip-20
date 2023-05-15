import { render, remove } from '../framework/render.js';
import { UpdateType, UserAction } from '../const.js';
import { RenderPosition } from '../framework/render.js';
import EditPointView from '../components/point-edit/point-edit-view.js';

export default class NewPointPresenter {
  #destinations = null;
  #offers = null;

  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #editPointComponent = null;

  constructor({ pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(destinations, offers) {
    if (this.#editPointComponent) {
      return;
    }

    this.#destinations = destinations;
    this.#offers = offers;

    this.#editPointComponent = new EditPointView({
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });
    render(this.#editPointComponent, this.#pointListContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (!this.#editPointComponent) {
      return;
    }
    this.#handleDestroy();
    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setAborting() {
    const resetFromState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this.#editPointComponent.shake(resetFromState);
  }

  setSaving() {
    this.#editPointComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.target.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };
}
