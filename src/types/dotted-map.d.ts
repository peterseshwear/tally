declare module 'dotted-map' {
  export interface DottedMapOptions {
    height?: number;
    width?: number;
    grid?: 'diagonal' | 'vertical';
    countries?: string[];
    region?: {
      lat: { min: number; max: number };
      lng: { min: number; max: number };
    };
  }

  export interface GetSVGOptions {
    radius?: number;
    color?: string;
    shape?: 'circle' | 'hexagon';
    backgroundColor?: string;
  }

  export default class DottedMap {
    constructor(options?: DottedMapOptions);
    getSVG(options?: GetSVGOptions): string;
    addPin(pin: {
      lat: number;
      lng: number;
      svgOptions?: { color?: string; radius?: number };
    }): void;
  }
}
