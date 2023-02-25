export type GalleryImageData = {
  id: string;
  title: string;
  description: string;
  datetime: number;
  type: string;
  animated: boolean;
  width: number;
  height: number;
  size: number;
  views: number;
  bandwidth: number;
  deletehash?: string;
  link: string;
  gifv?: string;
  mp4?: string;
  mp4_size?: number;
  looping?: boolean;
  vote: string;
  favorite: boolean;
  nsfw: boolean;
  comment_count: number;
  topic: string;
  topic_id: number;
  section: string;
  account_url: string;
  account_id: number;
  ups: number;
  downs: number;
  points: number;
  score: number;
  is_album: boolean;
  in_most_viral: boolean;
};

export type ImageData = {
  id: string;
  title: string;
  description: string;
  datetime: number;
  type: string;
  animated: boolean;
  width: number;
  height: number;
  size: number;
  views: number;
  bandwidth: number;
  deletehash?: string;
  name?: string;
  section: string;
  link: string;
  gifv?: string;
  mp4?: string;
  mp4_size?: number;
  looping?: boolean;
  favorite: boolean;
  nsfw: boolean;
  vote: string;
  in_gallery: boolean;
};

export type GalleryAlbumData = {
  id: string;
  title: string;
  description: string;
  datetime: number;
  cover: string;
  cover_width: number;
  cover_height: number;
  account_url: string;
  account_id: number;
  privacy: string;
  layout: string;
  views: number;
  link: string;
  ups: number;
  downs: number;
  points: number;
  score: number;
  is_album: boolean;
  vote: string;
  favorite: boolean;
  nsfw: boolean;
  comment_count: number;
  topic: string;
  topic_id: number;
  images_count: number;
  images: ImageData[];
  in_most_viral: boolean;
};

export type GalleryAlbumResponseData = {
  data: GalleryAlbumData;
  success: boolean;
  Status: number;
};

export type GalleryRequestData = {
  section?: string; //'hot' | 'top' | 'user';
  sort?: string; //'viral' | 'top' | 'time' | 'rising';
  page?: number;
  window?: string; // 'day' | 'week' | 'month' | 'year' | 'all';
  showViral?: boolean;
};

export type GalleryResponseData = {
  data: (GalleryImageData | GalleryAlbumData)[];
  success: boolean;
  Status: number;
};

export type OptionProps = {
  name: string;
  value: string | number;
};
