
export interface Video {
  id: number;
  thumbnailUrl: string;
  title: string;
  views: string;
  age: string;
  duration: string;
  channel: {
    name: string;
    iconUrl: string;
  };
}