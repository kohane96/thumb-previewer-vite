import { Video } from './types';

const DEFAULT_CHANNEL = {
  name: 'チャンネル名',
  iconUrl: 'https://picsum.photos/seed/channel_icon/48/48',
};

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 100,
    thumbnailUrl: 'https://picsum.photos/seed/landscape1/320/180',
    title: 'ここに動画タイトルが入ります',
    views: '4052',
    age: '8 か月前',
    duration: '42:37',
    channel: DEFAULT_CHANNEL,
  },
  {
    id: 1,
    thumbnailUrl: 'https://picsum.photos/seed/nature/320/180',
    title: 'ここに動画タイトルが入ります',
    views: '5700',
    age: '7 か月前',
    duration: '24:19',
    channel: DEFAULT_CHANNEL,
  },
  {
    id: 3,
    thumbnailUrl: 'https://picsum.photos/seed/mountains/320/180',
    title: 'ここに動画タイトルが入ります',
    views: '3499',
    age: '10 か月前',
    duration: '20:11',
    channel: DEFAULT_CHANNEL,
  },
  {
    id: 4,
    thumbnailUrl: 'https://picsum.photos/seed/city/320/180',
    title: 'ここに動画タイトルが入ります',
    views: '1.2万',
    age: '1年前',
    duration: '15:55',
    channel: DEFAULT_CHANNEL,
  },
];
