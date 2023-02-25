import { useEffect, useState } from 'react';
import Image from 'next/image';
import { GalleryAlbumData, GalleryImageData } from '@/utils/types';

interface IGalleryItemProps {
  item: GalleryImageData & GalleryAlbumData;
}

const Text = ({
  label,
  description,
}: {
  label: string;
  description: string | number;
}) => {
  return (
    <p className="text-base text-cyan-800 lg:text-lg">
      {label}: <span className="ml-0.5 font-medium">{description}</span>
    </p>
  );
};

export const GalleryItem = ({ item }: IGalleryItemProps) => {
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
    <div className="relative flex flex-col items-center justify-center">
      {thumbnailUrl && (
        <>
          <div className="p-4 lg:p-6">
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
          </div>

          <div className="w-full p-4 text-xs border-t border-t-gray-400 bg-slate-200 lg:p-6">
            <Text label="Title" description={title ?? 'No Title'} />
            <Text
              label="Description"
              description={description ?? 'No Description'}
            />
            <Text label="UpVotes" description={ups ?? 0} />
            <Text label="DownVotes" description={downs ?? 0} />
            <Text label="Score" description={score ?? 0} />
          </div>
        </>
      )}
    </div>
  );
};
