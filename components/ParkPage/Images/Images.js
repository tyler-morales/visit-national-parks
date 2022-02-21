import Image from 'next/image'

export default function Images({images, title}) {
  return (
    <section>
      <h2 className="mt-24 text-3xl font-bold text-green-800 mb-7">{title}</h2>
      <section className="gap-10 columns-1 sm:columns-2 md:columns-3">
        {images.map((img, index) => {
          return (
            <figure
              key={index}
              className="block mb-10 text-center break-inside-avoid-column">
              <Image
                layout="responsive"
                width="100%"
                height="100%"
                className="object-cover w-full bg-gray-200 rounded-xl"
                src={img.url}
                alt={img.altText}
              />
              <figcaption className="z-10 mt-4 text-sm italic text-gray-600">
                {img.altText}
              </figcaption>
            </figure>
          )
        })}
      </section>
    </section>
  )
}
