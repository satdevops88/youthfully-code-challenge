import { useEffect, useState } from 'react';
import Image from 'next/image';
import { GalleryAlbumData, GalleryImageData } from '@/utils/types';

interface ICardImageProps {
  item: GalleryImageData & GalleryAlbumData;
}

export const CardImage = ({ item }: ICardImageProps) => {
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [thumbnailWidth, setThumbnailWidth] = useState(0);
  const [thumbnailHeight, setThumbnailHeight] = useState(0);
  const [isVideo, setIsVideo] = useState(false);
  const {
    is_album,
    images,
    cover,
    cover_width,
    cover_height,
    title,
    link,
    width,
    height,
    type,
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
    <div className="w-full pb-6">
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
            <div className="absolute bottom-0 w-full text-xs bg-gray-400">
              <p className="text-sm text-center">{title ?? 'No Title'}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
