interface ICoordinate {
  lat: number;
  lng: number;
}

interface Ibounds {
  northeast: ICoordinate;
  southwest: ICoordinate;
}

interface IGeometry {
  bounds: Ibounds;
  location: ICoordinate;
  location_type: string;
  viewport: Ibounds;
}

interface IAddress {
  long_name: string;
  short_name: string;
  types: string[];
}

interface IResults {
  address_components: IAddress[];
  formatted_address: string;
  geometry: IGeometry;
  place_id: string;
  types: string[];
}

export interface IData {
  results: IResults[];
  status: string;
}
