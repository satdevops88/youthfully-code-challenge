export default function defaultHeader() {
  const headers = new Headers();
  headers.append(
    'Authorization',
    `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`
  );
  return headers;
}
