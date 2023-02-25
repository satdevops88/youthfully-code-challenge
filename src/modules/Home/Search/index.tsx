import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, Checkbox, Select } from '@/components/Form';
import { Results } from '../Results';
import { sectionOptions, sortOptions, windowOptions } from '@/utils/constant';
import {
  GalleryAlbumData,
  GalleryImageData,
  GalleryRequestData,
} from '@/utils/types';
import { Loading } from '@/components/Common';

const INITIAL_PAYLOAD = {
  section: 'hot',
  sort: 'viral',
  window: 'day',
  showViral: false,
};

export const Search = () => {
  const {
    reset,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(INITIAL_PAYLOAD);
  }, [reset]);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [formResults, setFormResults] = useState<GalleryRequestData>({});
  const [galleries, setGalleries] = useState<
    (GalleryImageData & GalleryAlbumData)[]
  >([]);
  const [isLoading, setLoading] = useState(false);

  const getGalleries = async (data: GalleryRequestData) => {
    try {
      setLoading(true);
      const response = await fetch('/api/gallery', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const res = await response.json();

      if (res.success && !!res.data.length) {
        setGalleries((prev) => [...prev, ...res.data]);
        setHasMore(res.data.length !== 0);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    const newPage = page + 1;
    setPage(newPage);
    getGalleries({ ...formResults, page: newPage });
  };

  const onSubmit = async (data: FieldValues) => {
    const payload = {
      ...data,
      page: 0,
    };

    setPage(0);
    setGalleries([]);
    setFormResults(payload);
    getGalleries(payload);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 py-12 search-terms"
      >
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-10">
          <Select
            name="section"
            errors={errors}
            register={register}
            validation={{ required: 'This is required' }}
            label="Section"
            options={sectionOptions}
            fullWidth
          />
          <Select
            name="sort"
            errors={errors}
            register={register}
            validation={{ required: 'This is required' }}
            label="Sort"
            options={sortOptions}
            fullWidth
          />
          <Select
            name="window"
            errors={errors}
            register={register}
            validation={{ required: 'This is required' }}
            label="Window"
            options={windowOptions}
            fullWidth
            disabled={watch('section') !== 'top'}
          />
        </div>
        <div className="flex justify-between">
          <Checkbox
            id="showViral"
            name="showViral"
            label="Viral Images"
            register={register}
            disabled={watch('section') !== 'user'}
          />
          <Button type="submit">Search</Button>
        </div>
      </form>

      {page === 0 && isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <Results data={galleries} hasMore={hasMore} handleNext={handleNext} />
      )}
    </>
  );
};
