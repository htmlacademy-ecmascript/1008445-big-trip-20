import { render, remove } from '../framework/render.js';
import { UpdateType, UserAction } from '../const.js';
import { RenderPosition } from '../framework/render.js';
import EditPointView from '../components/point-edit/point-edit-view.js';

export default class NewPointPresenter {
  #editType = null;
  #destinations = null;
  #allOffers = null;

  #pointListContainer = null;
  #handleDataChange = null;
  #handleCancel = null;
  #editPointComponent = null;

  constructor({ pointListContainer, onDataChange, onCancelClick, editType }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleCancel = onCancelClick;
    this.#editType = editType;
  }

  init(destinations, allOffers) {
    if (this.#editPointComponent) {
      return;
    }

    this.#destinations = destinations;
    this.#allOffers = allOffers;

    this.#editPointComponent = new EditPointView({
      destinations: this.#destinations,
      allOffers: this.#allOffers,
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick,
      editType: this.#editType
    });

    render(this.#editPointComponent, this.#pointListContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (!this.#editPointComponent) {
      return;
    }
    this.#handleCancel();
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

  #handleCancelClick = () => {
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
