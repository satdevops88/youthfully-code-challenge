import { useEffect, useState } from 'react';
import Image from 'next/image';
import { GalleryAlbumData, GalleryImageData } from '@/utils/types';
import clsx from 'clsx';

interface ICardImageProps {
  pageFor?: 'home' | 'detail';
  item: GalleryImageData & GalleryAlbumData;
}

export const CardImage = ({ pageFor = 'home', item }: ICardImageProps) => {
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [thumbnailWidth, setThumbnailWidth] = useState(0);
  const [thumbnailHeight, setThumbnailHeight] = useState(0);
  const [isVideo, setIsVideo] = useState(false);
  const {
    is_album,
    images,
    description,
    cover,
    cover_width,
    cover_height,
    title,
    link,
    width,
    height,
    type,
    ups,
    downs,
    score,
  } = item;

  useEffect(() => {
    if (is_album) {
      if (cover) {
        const coverImage = images.find((image) => image.id === cover);
        if (coverImage) {
          setIsVideo(coverImage?.type?.includes('video'));
          setThumbnailWidth(cover_width);
          setThumbnailHeight(cover_height);
          setThumbnailUrl(coverImage.link);
        }
      }
    } else {
      setIsVideo(type?.includes('video'));
      setThumbnailWidth(width);
      setThumbnailHeight(height);
      setThumbnailUrl(link);
    }
  }, [
    cover,
    is_album,
    images,
    link,
    type,
    cover_width,
    cover_height,
    width,
    height,
  ]);

  return (
    <div className={clsx('w-full', pageFor === 'home' && 'pb-6')}>
      <div className="relative flex justify-center">
        {thumbnailUrl && (
          <>
            {isVideo ? (
              <video
                autoPlay
                muted
                loop
                style={{ width: thumbnailWidth, height: 'auto' }}
              >
                <source src={thumbnailUrl} />
              </video>
            ) : (
              <Image
                src={thumbnailUrl}
                alt={title ?? ''}
                width={thumbnailWidth}
                height={thumbnailHeight}
                placeholder="blur"
                blurDataURL={'/no-thumbnail.png'}
              />
            )}
            <div className="absolute bottom-0 w-full bg-gray-400 text-xs">
              {pageFor === 'home' ? (
                <p className="text-center text-sm">{title ?? 'No Title'}</p>
              ) : (
                <>
                  <p>Title: {title ?? 'No Title'}</p>
                  <p>Description: {description ?? 'No Description'}</p>
                  <p>UpVotes: {ups ?? 0}</p>
                  <p>DownVotes: {downs ?? 0}</p>
                  <p>Score: {score ?? 0}</p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
