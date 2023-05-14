export default class PointAdapter {
  static adaptToClient(point, destinations, allOffers) {
    const pointTypeOffers = allOffers.find((offer) => offer.type === point.type);
    const offers = pointTypeOffers.offers.filter((offer) => point.offers.includes(offer.id));
    const destination = destinations.find((dest) => dest.id === point.destination);
    const adaptedPoint = {
      ...point,
      dateFrom: point['date_from'] ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
      price: point['base_price'],
      destination,
      offers
    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['base_price'];
    return adaptedPoint;
  }


  static adaptToSever(point) {
    const destination = point.destination.id;
    const offers = point.offers.map((offer) => offer.id);
    const dateFromISO = point.dateFrom ? (new Date(point.dateFrom)).toISOString() : null;
    const dateToISO = point.dateTo ? (new Date(point.dateTo)).toISOString() : null;
    const adaptedPoint = {
      ...point,
      'date_from': dateFromISO,
      'date_to': dateToISO,
      'is_favorite': point.isFavorite,
      'base_price': parseInt(point.price, 10),
      destination,
      offers
    };

    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.price;

    return adaptedPoint;
  }
}
