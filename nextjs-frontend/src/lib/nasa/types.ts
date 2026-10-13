// ── APOD ──────────────────────────────────────────────────────────────────────
export interface ApodResponse {
  title:       string;
  date:        string;
  explanation: string;
  url:         string;
  hdurl?:      string;
  media_type:  'image' | 'video';
  copyright?:  string;
}

// ── Near-Earth Objects ─────────────────────────────────────────────────────────
export interface NeoCloseApproach {
  close_approach_date: string;
  miss_distance: {
    kilometers: string;
    lunar:      string;
  };
  relative_velocity: {
    kilometers_per_hour: string;
  };
}

export interface RawNeo {
  id:   string;
  name: string;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: NeoCloseApproach[];
}

export interface NeoFeedResponse {
  element_count: number;
  near_earth_objects: Record<string, RawNeo[]>;
}

// ── Chart-ready shapes ─────────────────────────────────────────────────────────
export interface NeoDayCount {
  date:      string;
  total:     number;
  hazardous: number;
}

export interface NeoAsteroid {
  id:           string;
  name:         string;
  hazardous:    boolean;
  diameterM:    number;
  distanceKm:   number;
  distanceLunar: number;
  velocityKph:  number;
  date:         string;
}

// ── EPIC ──────────────────────────────────────────────────────────────────────
export interface EpicImage {
  identifier: string;
  caption:    string;
  date:       string;
  imageUrl:   string;
}

// ── Exoplanets ────────────────────────────────────────────────────────────────
export interface ExoplanetYearCount {
  year:  number;
  total: number;
}
