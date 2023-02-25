import Link from 'next/link';
import { CardImage, Loading } from '@/components/Common';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GalleryAlbumData, GalleryImageData } from '@/utils/types';
import Masonry from 'react-masonry-css';

type ResultsProps = {
  hasMore: boolean;
  data: (GalleryImageData & GalleryAlbumData)[];
  handleNext: () => void;
};

export const Results = ({ hasMore, data, handleNext }: ResultsProps) => {
  if (!data.length)
    return <p>{hasMore ? 'Click button to search images' : 'No results'}</p>;

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={handleNext}
      hasMore={hasMore}
      loader={
        <div className="flex justify-center">
          <Loading />
        </div>
      }
      style={{ overflow: 'initial' }}
    >
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
        className="flex w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {data?.map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            className="block"
            target={'_blank'}
            href={`/detail/${item.is_album ? 'album' : 'image'}/${item.id}`}
          >
            <CardImage item={item} />
          </Link>
        ))}
      </Masonry>
    </InfiniteScroll>
  );
};
