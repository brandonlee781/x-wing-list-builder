type faction = 'rebel' | 'imperial' | 'scum';
type roundType = 'swiss' | 'elimination';

export interface Upgrades {
  amd?: string[];
  bomb?: string[];
  crew?: string[];
  ept?: string[];
  illicit?: string[];
  mod?: string[];
  samd?: string[];
  system?: string[];
  title?: string[];
  turret?: string[];
  torpedo?: string[];
}

interface Pilot {
  name: string;
  ship: string;
  upgrades?: Upgrades;
}

export interface List {
  faction: faction;
  pilots: Pilot[];
  vendor: { listjuggler: {}; };
  version: string;
}

interface Rank {
  elimination?: number;
  swiss?: number;
}

interface Player {
  list: List;
  mov: number;
  name: string;
  rank: Rank;
  score: number;
  sos: string;
}

interface Match {
  player1: string;
  player1points: number;
  player2: string;
  player2points: number;
  result: string;
}

interface Round {
  matches: Match[];
  'round-number': number;
  'round-type': roundType;
}

interface Venue {
  city: string;
  country: string;
  lat: string;
  lon: string;
  name: string;
  state: string;
}

export interface Tournament {
  date: string;
  format: string;
  id: number;
  name: string;
  players: Player[];
  route_length: 60;
  rounds: Round[];
  type: string;
  venue?: Venue;
}

export interface Tournaments {
  tournaments: string[];
}
