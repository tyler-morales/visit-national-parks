import Image from 'next/image'

export default function HeroImage({image}) {
  const {url, altText, caption, credit} = image

  return (
    <figure className="block">
      <Image
        src={url}
        alt={altText}
        height={450}
        width={1080}
        layout="responsive"
        className="object-cover rounded-xl"
      />
      <figcaption className="mt-3 text-sm italic text-center">
        <span>{caption}</span>
        <span className="italic"> {credit}</span>
      </figcaption>
    </figure>
  )
}
