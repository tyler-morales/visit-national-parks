import Image from 'next/image'

const images = [1, 2, 3, 4, 5, 6, 7, 8]
const imagesReversed = [16, 15, 14, 13, 12, 11, 10, 9]

export default function InfiniteImages() {
  // Create an Image for each column of images
  const createImage = (image, direction, index, position) => {
    return (
      <Image
        width={200}
        height={250}
        layout="fixed"
        className="object-cover rounded-lg shadow-lg"
        // Reverse the order after the initial set of images has rendered (the index parameter reverses the order & position parameter reverses the position)
        src={`/images/infinite-slider/img${
          direction == 'forward'
            ? image + index + position
            : image - index - position
        }.jpeg`}
      />
    )
  }

  // Map over images and return a column of 2 images
  const createImageColumn = (array, direction) => {
    return array.map((image, index) => (
      // Create a column of two stacked images
      <div
        key={index}
        // Offset every other column by 20px
        className={`flex gap-6 md:flex-col ${image % 2 == 0 && 'mt-8'}`}>
        {createImage(image, direction, index, 0)}
        {createImage(image, direction, index, 1)}
      </div>
    ))
  }

  return (
    <div className="infinite-slider">
      {/* Set of images */}
      <div className="relative flex justify-around gap-5 infinite-scroller">
        {createImageColumn(images, 'forward')}
      </div>

      {/* Set of reversed images (this set creates an illusion of an infinite loop) */}
      <div className="relative flex flex-row-reverse justify-around gap-5 ml-8 infinite-scroller">
        {createImageColumn(imagesReversed, 'reversed')}
      </div>
    </div>
  )
}
