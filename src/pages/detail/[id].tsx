import { CardImage, Loading } from '@/components/Common';
import { GalleryAlbumData, GalleryImageData } from '@/utils/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Detail = () => {
  const router = useRouter();
  const { id, is_album } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [gallery, setGallery] = useState<GalleryImageData & GalleryAlbumData>();

  const getDetail = async (id: string, is_album: boolean) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/gallery/${is_album ? 'album' : 'image'}/${id}`
      );
      const res = await response.json();
      if (res.success) {
        setGallery(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof id === 'string') {
      getDetail(id, is_album === 'true');
    }
  }, [id, is_album]);

  return (
    <section className="mx-auto max-w-[880px] px-6 py-6 lg:px-12 2xl:px-20">
      <p className="w-full border border-gray-600">
        {is_album ? 'Album' : 'Image'}/{id}
      </p>
      {isLoading ? (
        <div className="text-center">
          <Loading />
        </div>
      ) : gallery ? (
        <div className="border border-gray-600">
          <CardImage key={gallery.id} item={gallery} pageFor="detail" />
        </div>
      ) : (
        <span>no gallery</span>
      )}
    </section>
  );
};

export default Detail;
