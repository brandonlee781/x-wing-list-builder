interface ContentData {
  ships: {
    [s: string]: string;
  };
  pilots: {
    [s: string]: string;
  };
  upgrades: {
    [s: string]: string;
  };
  'reference-cards': number[];
}

export interface SourceData {
    id: number;
    name: string;
    image: string;
    thumb: string;
    wave: number;
    released: boolean;
    contents: ContentData;
    sku: string;
    release_date: string;
    announcement_date: string;
}
