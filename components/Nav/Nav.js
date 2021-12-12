import {useState, useLayoutEffect} from 'react'
import Link from 'next/link'

// import PropTypes from 'prop-types'

import logo from '../../public/images/logo.svg'

export const Nav = () => {
  const [showNavOnClick, setShowNavOnClick] = useState(false)
  const [showNavOnScreenSize, setShowNavOnScreenSize] = useState(true)

  const toggleMenu = () => {
    setShowNavOnClick(!showNavOnClick)
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
        <div className="flex items-center justify-between w-full md:w-max md:pr-8">
          <Link href="/">
            <a className="md:rounded-md focus:ring-green-500 focus:outline-none focus:ring-2">
              <img
                src
                {...logo}
                alt="Parkway logo"
                className="cursor-pointer"
                style={{width: '200px', height: 'auto'}}
              />
            </a>
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
            <a
              id="parks"
              className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out border-b-green-800 border-b border-green-800 md:border-0 md:hover:bg-transparent md:hover:text-green-800 py-4   w-full text-center hover:bg-green-800 hover:text-white lg:pass md:rounded-md focus:ring-green-500 focus:outline-none focus:ring-2 p-4 md:py-4
                ${
                  showNavOnScreenSize ||
                  (showNavOnClick && showNavOnScreenSize != showNavOnClick)
                    ? 'visible'
                    : 'hidden'
                }
              `}>
              Parks
            </a>
          </Link>
          <Link href="/about">
            <a
              className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out border-b-green-800 border-b border-green-800 md:border-0 md:hover:bg-transparent md:hover:text-green-800 py-4   w-full text-center hover:bg-green-800 hover:text-white lg:pass md:rounded-md focus:ring-green-500 focus:outline-none focus:ring-2 p-4 md:py-4
                ${
                  showNavOnScreenSize ||
                  (showNavOnClick && showNavOnScreenSize != showNavOnClick)
                    ? 'visible'
                    : 'hidden'
                }
              `}>
              About
            </a>
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-full text-center md:flex-row md:text-left md:justify-end md:gap-6">
        <Link href="/log-in">
          <a
            className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out md:border-b-0 border-b-green-800 border-b border-green-800 py-4   hover:bg-green-800 hover:text-white md:hover:bg-transparent md:hover:text-green-800 lg:pass md:rounded-md focus:ring-green-500 focus:outline-none focus:ring-2 p-4 md:py-4 
              ${
                showNavOnScreenSize ||
                (showNavOnClick && showNavOnScreenSize != showNavOnClick)
                  ? 'visible'
                  : 'hidden'
              }
            `}>
            Log in
          </a>
        </Link>
        <Link href="/sign-up">
          <a
            className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out md:border-b-0 border-b-green-800 border-b border-green-800 py-4   hover:bg-green-800 hover:text-white md:hover:bg-transparent md:hover:text-green-800 lg:pass md:rounded-md focus:ring-green-500 focus:outline-none focus:ring-2 p-4 md:py-4
              ${
                showNavOnScreenSize ||
                (showNavOnClick && showNavOnScreenSize != showNavOnClick)
                  ? 'visible'
                  : 'hidden'
              }
            `}>
            Sign up
          </a>
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
