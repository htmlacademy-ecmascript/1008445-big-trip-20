import { render, remove, RenderPosition } from '../framework/render.js';
import PointListView from '../components/point-list/point-list-view.js';
import SortView from '../components/sort/sort-view.js';
import NoPointView from '../components/no-point/no-point-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../components/loading/loading-view.js';
import { FilterType, SortType, UpdateType, UserAction, EditType, TimeLimit } from '../const.js';
import { sortByDay, sortByDurationTime, sortByPrice } from '../utils/point.js';
import { filter } from '../utils/filter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import newPointButtonView from '../components/add-point-button/new-point-button-view.js';

export default class TripPresenter {
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #pointPresenters = new Map();
  #isLoading = true;
  #isCreating = false;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #newPointPresenter = null;

  #pointModel = null;
  #filterModel = null;

  #tripBodyContainer = null;
  #tripInfoContainer = null;
  #newPointButtonComponent = null;
  #sortComponent = null;
  #noPointComponent = null;
  #pointListComponent = new PointListView();
  #loadingComponent = new LoadingView();

  constructor({ tripBodyContainer, tripInfoContainer, pointModel, filterModel }) {
    this.#tripBodyContainer = tripBodyContainer;
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListComponent,
      onDataChange: this.#handleViewAction,
      onCancelClick: this.#handleNewPointCancelButtonClick,
      editType: EditType.CREATING
    });

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredTasks = filter[ this.#filterType ](points);
    switch(this.#currentSortType) {
      case SortType.DURATION_TIME:
        return filteredTasks.sort(sortByDurationTime);
      case SortType.PRICE:
        return filteredTasks.sort(sortByPrice);
    }

    return filteredTasks.sort(sortByDay);
  }

  get destinations() {
    return this.#pointModel.destinations;
  }

  get allOffers() {
    return this.#pointModel.allOffers;
  }

  init() {
    this.#renderNewPointButton();
    this.#renderTrip();
  }

  #renderNoPointMessage() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#tripBodyContainer);
  }

  #renderNewPointButton() {
    this.#newPointButtonComponent = new newPointButtonView({
      onSave: this.#handleNewPointSaveButtonClick,
      pointModel: this.#pointModel
    });

    render(this.#newPointButtonComponent, this.#tripInfoContainer, RenderPosition.BEFOREEND);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripBodyContainer);
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#tripBodyContainer);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinations: this.destinations,
      allOffers: this.allOffers,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripBodyContainer);
  }

  #renderTrip() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if (!this.points.length && !this.#isCreating) {
      this.#renderNoPointMessage();
      return;
    }
    this.#renderSort();
    this.#renderPointList();
    this.#renderPoints();
  }

  #clearTrip({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointModel.updatedPoint(updateType, update);
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch (error) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id)?.init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({ resetSortType: true });
        this.#renderTrip();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearTrip();
        this.#renderTrip();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  };

  #handleNewPointCancelButtonClick = () => {
    this.#isCreating = false;
    this.#newPointButtonComponent.setDisabled(false);
    if (!this.points.length) {
      remove(this.#sortComponent);
      this.#sortComponent = null;
      this.#renderNoPointMessage();
    }
  };

  #handleNewPointSaveButtonClick = () => {
    this.#newPointButtonComponent.setDisabled(true);
    this.#isCreating = true;
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.destinations, this.allOffers);
  };
}
