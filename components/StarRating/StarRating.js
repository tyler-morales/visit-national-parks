import React, {useState} from 'react'
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'

export default function StarRating({rating, changeRating}) {
  const [stars, setStarCount] = useState(rating)

  const changeColor = (rating) => {
    setStarCount(rating)
    changeRating(rating)
  }

  const createStar = (rating) => {
    return (
      <div key={rating}>
        {stars >= rating ? (
          <span>
            {' '}
            <AiFillStar
              color="yellow"
              onClick={() => changeColor(rating)}
              size="1.25em"
              className="cursor-pointer"
            />
          </span>
        ) : (
          <span>
            <AiFillStar
              color="#d9d9d9"
              onClick={() => changeColor(rating)}
              size="1.25em"
              className="cursor-pointer"
            />
          </span>
        )}
      </div>
    )
  }

  const renderStars = () => {
    const totalStars = []
    for (let i = 1; i <= 5; i++) {
      totalStars.push(createStar(i))
    }
    return totalStars
  }

  return (
    <div className="flex items-center gap-2">
      <span>Rating {stars}/5</span>
      <div className="flex">{renderStars(5)}</div>
    </div>
  )
}
