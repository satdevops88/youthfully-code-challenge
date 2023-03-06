import { GalleryItem } from '@/modules/GalleryItem';
import { GalleryAlbumData, GalleryImageData } from '@/utils/types';

type DetailProps = {
  data: GalleryAlbumData & GalleryImageData;
};

const Detail = ({ data }: DetailProps) => {
  if (!data) return <></>;

  const { id, is_album } = data;

  return (
    <section className="mx-auto max-w-[880px] px-6 py-6 lg:px-12 2xl:px-20">
      <p className="w-full border border-gray-400 p-2">
        {is_album ? 'Album' : 'Image'}/{id}
      </p>

      <div className="border border-t-0 border-gray-400">
        <GalleryItem item={data} />
      </div>
    </section>
  );
};

export const getStaticProps = async function ({
  params,
}: {
  params: {
    slug: string[];
  };
}) {
  const [image, slug] = params.slug;
  if (!image || !slug) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  const API_URL = `${
    process.env.NEXT_PUBLIC_DOMAIN || ''
  }/api/gallery/${image}/${slug}`;

  let data = null;
  try {
    const response = await fetch(API_URL);
    const res = await response.json();
    if (res.success) {
      data = res.data;
    }
  } catch (err) {
    console.log(err);
  }

  if (!data) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default Detail;
