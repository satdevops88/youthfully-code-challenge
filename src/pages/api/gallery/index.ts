import { NextApiRequest, NextApiResponse } from 'next';
import { GalleryResponseData } from '@/utils/types';
import defaultHeader from '@/utils/functions';

async function getGallery(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { section, sort, page, window, showViral } = JSON.parse(req.body);

    const url = `${process.env.NEXT_PUBLIC_IMGUR_API_URL}/gallery/${section}/${sort}/${window}/${page}?showViral=${showViral}`;
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
  res: NextApiResponse<GalleryResponseData>
) {
  if (req.method === 'POST') {
    return getGallery(req, res);
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
