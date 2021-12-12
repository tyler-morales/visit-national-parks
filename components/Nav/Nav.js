import {useState, useLayoutEffect} from 'react'
import Link from 'next/link'
import Hamburger from '../Hamburger/Hamburger'

// import PropTypes from 'prop-types'

import logo from '../../public/images/logo.svg'

export const Nav = () => {
  const [showNavOnClick, setShowNavOnClick] = useState(false)
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const [showNavOnScreenSize, setShowNavOnScreenSize] = useState(true)

  const toggleMenu = () => {
    setShowNavOnClick(!showNavOnClick)
    setHamburgerOpen(!hamburgerOpen)
  }

  useLayoutEffect(() => {
    if (window.innerWidth < 768) setShowNavOnScreenSize(false)

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowNavOnScreenSize(true)
        setShowNavOnClick(false)
      } else if (window.innerWidth < 768) {
        setShowNavOnScreenSize(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <nav className="flex justify-between py-5 lg:w-10/12 m-auto items-center max-w-[1080px] px-5 lg:px-0 flex-col md:flex-row w-full ">
      <div className="flex flex-col items-center w-full md:flex-row">
        <div className="flex items-center justify-between w-full md:w-max">
          <Link href="/">
            <img
              src
              {...logo}
              alt="Parkway logo"
              className="md:mr-8"
              style={{width: '200px', height: 'auto'}}
            />
          </Link>
          <button
            id="menu-icon"
            onClick={toggleMenu}
            className="cursor-pointer md:hidden">
            🍔
          </button>
        </div>

        <div className="flex flex-col w-full md:gap-6 md:flex-row md:w-min">
          <Link href="/parks">
            <span
              id="parks"
              className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out border-b-green-800 border-b border-green-800 md:border-0 md:hover:bg-transparent md:hover:text-green-800 py-4 md:py-0 md:pb-0 w-full text-center hover:bg-green-800 hover:text-white lg:pass 
                ${
                  showNavOnScreenSize ||
                  (showNavOnClick && showNavOnScreenSize != showNavOnClick)
                    ? 'visible'
                    : 'hidden'
                }
              `}>
              Parks
            </span>
          </Link>
          <Link href="/about">
            <span
              className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out border-b-green-800 border-b border-green-800 md:border-0 md:hover:bg-transparent md:hover:text-green-800 py-4 md:py-0 md:pb-0 w-full text-center hover:bg-green-800 hover:text-white lg:pass 
                ${
                  showNavOnScreenSize ||
                  (showNavOnClick && showNavOnScreenSize != showNavOnClick)
                    ? 'visible'
                    : 'hidden'
                }
              `}>
              About
            </span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-full text-center md:flex-row md:text-left md:justify-end md:gap-6">
        <Link href="/log-in">
          <span
            className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out md:border-b-0 border-b-green-800 border-b border-green-800 py-4 md:py-0 md:pb-0 hover:bg-green-800 hover:text-white md:hover:bg-transparent md:hover:text-green-800  lg:pass 
              ${
                showNavOnScreenSize ||
                (showNavOnClick && showNavOnScreenSize != showNavOnClick)
                  ? 'visible'
                  : 'hidden'
              }
            `}>
            Log in
          </span>
        </Link>
        <Link href="/sign-up">
          <span
            className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out md:border-b-0 border-b-green-800 border-b border-green-800 py-4 md:py-0 md:pb-0 hover:bg-green-800 hover:text-white md:hover:bg-transparent md:hover:text-green-800 lg:pass 
              ${
                showNavOnScreenSize ||
                (showNavOnClick && showNavOnScreenSize != showNavOnClick)
                  ? 'visible'
                  : 'hidden'
              }
            `}>
            Sign up
          </span>
        </Link>
      </div>
    </nav>
  )
}

Nav.propTypes = {
  //   label: PropTypes.string.isRequired,
  //   onClick: PropTypes.func,
}

Nav.defaultProps = {}
