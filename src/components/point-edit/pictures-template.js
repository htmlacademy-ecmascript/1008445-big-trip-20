import he from 'he';

const createPictureTemplate = ({ src }) => `<img class="event__photo" src="${ src }" alt="Event photo">`;
const createPicturesTemplate = (pictures) => pictures.map((picture) => createPictureTemplate(picture)).join('');
const createDestinationSectionTemplate = (destanationDescription, pictures) =>
  /*html*/`<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${ he.encode(destanationDescription) }</p>
      <div class="event__photos-container">
      <div class="event__photos-tape">${ createPicturesTemplate(pictures) }</div>        
    </div>
  </section>`;

export { createDestinationSectionTemplate };
