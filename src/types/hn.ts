export interface HNItem {
  id: number;
  type: "story" | "comment" | "job" | "poll" | "pollopt";
  by: string;
  time: number;
  text?: string;
  dead?: boolean;
  deleted?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
}

export interface HNStory extends HNItem {
  type: "story";
  title: string;
  score: number;
  descendants: number;
}

export interface HNComment {
  id: number;
  text: string;
  by: string;
  time: number;
  score?: number;
  kids?: HNComment[];
}

export interface HNUser {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted?: number[];
}
