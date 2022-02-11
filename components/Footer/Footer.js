import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="max-w-[1200px] xl:m-auto pb-12 mx-6 lg:mb-6 border-t pt-6 border-green-800">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <Link href="/">
          <a className="md:rounded-md">
            <img
              src="/images/logo.svg"
              alt="Parkway logo"
              width="200px"
              height="64px"
              className="cursor-pointer"
            />
          </a>
        </Link>
        <div className="flex flex-col gap-6 mt-6 text-green-800 md:flex-row md:mt-0 md:items-center">
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/parks">
            <a>Parks</a>
          </Link>
          <Link href="/events">
            <a>Events</a>
          </Link>
          <Link href="/webcams">
            <a>Webcams</a>
          </Link>
          <Link href="/news">
            <a>News</a>
          </Link>
          <Link href="/alerts">
            <a>Alerts</a>
          </Link>
        </div>
      </div>
      <h4 className="mt-6 text-sm text-center text-gray-500">
        Designed & Developed with ♡ by{' '}
        <a
          target="_blank"
          href="https://www.tylermorales.dev/"
          className="hover:underline hover:text-underline underline-offset-2 hover:text-black">
          Tyler Morales
        </a>
      </h4>
    </footer>
  )
}
