export type RecordItem = {
  id: number;
  moment: string;
  name: string;
  age: number;
  gamePlatform: 'PC' | 'XBOX' | 'PLAYSTATION';
  gameTitle: string;
  genreName: string;
}

export type RecordsResponse = {
  content: RecordItem[];
  totalPages: number;
}

export type Game = {
  id: number;
  title: string;
  platform: string;
}

export type PieChartData = {
  labels: string[];
  series: number[];
}

export type BarChartData = {
  x: string;
  y: number;
}