import { NextApiRequest, NextApiResponse } from 'next';
import { GalleryAlbumData } from '@/utils/types';
import defaultHeader from '@/utils/functions';

export type GalleryAlbumResponseData = {
  data: GalleryAlbumData;
  success: boolean;
  Status: number;
};

async function getGalleryAlbum(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    const url = `${process.env.NEXT_PUBLIC_IMGUR_API_URL}/gallery/album/${id}`;
    await fetch(url, { headers: defaultHeader() })
      .then((response) => response.text())
      .then((result) => res.end(result))
      .catch((error) => res.json({ message: error.message, success: false }));
  } catch (error) {
    res.json({
      message: new Error(String(error)).message,
      success: false,
    });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GalleryAlbumResponseData>
) {
  if (req.method === 'GET') {
    return getGalleryAlbum(req, res);
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
