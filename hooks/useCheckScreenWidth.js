import {useState, useEffect} from 'react'

const useCheckScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth)
    }

    changeWidth()

    window.addEventListener('resize', changeWidth)

    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])

  return screenWidth
}

export default useCheckScreenWidth
