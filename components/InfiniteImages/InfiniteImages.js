import Image from 'next/image'

const images = [1, 2, 3, 4, 5, 6, 7, 8]
const imagesReversed = [16, 15, 14, 13, 12, 11, 10, 9]

export default function InfiniteImages() {
  return (
    <div className="infinite-slider">
      <div className="relative flex justify-around gap-5 infinite-scroller">
        {/* Images */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex gap-6 md:flex-col ${
              image % 2 == 0 ? '' : 'mt-8'
            }`}>
            <Image
              width={200}
              height={250}
              layout="fixed"
              className="object-cover rounded-lg shadow-lg"
              src={`/images/infinite-slider/img${image + index}.jpeg`}
            />
            <Image
              width={200}
              height={250}
              layout="fixed"
              className="object-cover rounded-lg shadow-lg"
              src={`/images/infinite-slider/img${image + index + 1}.jpeg`}
            />
          </div>
        ))}
      </div>
      {/* Reversed images row*/}
      <div className="relative flex flex-row-reverse justify-around gap-5 ml-8 infinite-scroller">
        {/* Images */}
        {imagesReversed.map((image, index) => (
          <div
            key={index}
            className={`flex gap-6 md:flex-col ${
              image % 2 == 0 ? '' : 'mt-8'
            }`}>
            <Image
              width={200}
              height={250}
              layout="fixed"
              className="object-cover rounded-lg shadow-lg"
              src={`/images/infinite-slider/img${image - index}.jpeg`}
            />
            <Image
              width={200}
              height={250}
              layout="fixed"
              className="object-cover rounded-lg shadow-lg"
              src={`/images/infinite-slider/img${image - index - 1}.jpeg`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
