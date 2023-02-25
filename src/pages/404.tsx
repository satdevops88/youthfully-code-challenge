import Link from 'next/link';

export default function Page404() {
  return (
    <section className="container mx-auto px-6 py-8 lg:px-12 2xl:px-20">
      <h1 className="text-center text-4xl">
        <p className="py-8">There is no page</p>
        <Link className="underline" href={'/'}>
          Go to Home
        </Link>
      </h1>
    </section>
  );
}
