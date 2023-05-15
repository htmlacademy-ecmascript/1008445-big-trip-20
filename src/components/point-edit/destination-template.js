const createPointDestinationOptionTemplate = (name) => `<option value="${ name }"></option>`;
const createPointDestinationOptionsTemplate = (destinations) =>
  destinations.map(({ name }) => createPointDestinationOptionTemplate(name)).join('');

const createDistinationTempate = (destinationName, destinations, isDisabled) =>
  /*html*/`<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" ${ isDisabled ? 'disabled' : '' } value="${ destinationName }" list="destination-list-1">
  <datalist id="destination-list-1">
    ${ createPointDestinationOptionsTemplate(destinations) }
  </datalist>`;

export { createDistinationTempate };
