import {useState, useEffect, useLayoutEffect} from 'react'
import Link from 'next/link'
import {Auth} from 'aws-amplify'
import {Cross as Hamburger} from 'hamburger-react'
import checkUser from '../../hooks/checkUser'
// import PropTypes from 'prop-types'

export const Nav = () => {
  const user = checkUser()
  const [showNavOnClick, setShowNavOnClick] = useState(false)
  const [showNavOnScreenSize, setShowNavOnScreenSize] = useState(true)
  const [isOpen, setOpen] = useState(false)

  const toggleMenu = () => {
    setShowNavOnClick(!showNavOnClick)
  }

  useLayoutEffect(() => {
    if (window.innerWidth < 768) setShowNavOnScreenSize(false)

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowNavOnScreenSize(true)
        setShowNavOnClick(false)
        setOpen(false)
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
    <nav className="flex justify-between py-5 lg:w-10/12 m-auto items-center max-w-[1080px] px-5 lg:px-0 flex-col md:flex-row w-full bg-[#f5f5ee]">
      <div className="flex flex-col items-center w-full md:flex-row">
        <div className="flex items-center justify-between w-full md:w-max md:pr-8">
          <Link href="/">
            <a className="md:rounded-md focus-visible:ring-green-500 focus-visible:outline-none focus-visible:ring-2">
              <img
                src="/images/logo.svg"
                alt="Parkway logo"
                className="cursor-pointer"
                style={{width: '200px', height: 'auto'}}
              />
            </a>
          </Link>

          <button
            data-cy="hamburger-icon"
            onClick={toggleMenu}
            className="cursor-pointer md:hidden">
            <Hamburger
              color="rgb(22 101 52)"
              toggled={isOpen}
              toggle={setOpen}
            />
          </button>
        </div>

        <div className="flex flex-col w-full md:gap-6 md:flex-row md:w-min">
          <Link href="/parks">
            <a
              data-cy="parks"
              className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out border-b-green-800 border-b border-green-800 md:border-0 md:hover:bg-transparent md:hover:text-green-800 py-4   w-full text-center hover:bg-green-800 hover:text-white lg:pass md:rounded-md focus-visible:ring-green-500 focus-visible:outline-none focus-visible:ring-2 p-4 md:py-2
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
              data-cy="about-page"
              className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out border-b-green-800 border-b border-green-800 md:border-0 md:hover:bg-transparent md:hover:text-green-800 py-4   w-full text-center hover:bg-green-800 hover:text-white lg:pass md:rounded-md focus-visible:ring-green-500 focus-visible:outline-none focus-visible:ring-2 p-4 md:py-2
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
        {user ? (
          <Link href="/profile">
            <a
              className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out md:border-b-0 border-b-green-800 border-b border-green-800 py-4   hover:bg-green-800 hover:text-white md:hover:bg-transparent md:hover:text-green-800 lg:pass md:rounded-md focus-visible:ring-green-500 focus-visible:outline-none focus-visible:ring-2 p-4 md:py-2 
              ${
                showNavOnScreenSize ||
                (showNavOnClick && showNavOnScreenSize != showNavOnClick)
                  ? 'visible'
                  : 'hidden'
              }
            `}>
              Profile
            </a>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <a
                className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out md:border-b-0 border-b-green-800 border-b border-green-800 py-4   hover:bg-green-800 hover:text-white md:hover:bg-transparent md:hover:text-green-800 lg:pass md:rounded-md focus-visible:ring-green-500 focus-visible:outline-none focus-visible:ring-2 p-4 md:py-2 
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
            <Link href="/signup">
              <a
                className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out border-b-green-800 border-green-800 py-4 hover:bg-green-800 hover:text-white md:hover:bg-transparent md:rounded-md focus-visible:ring-green-500 focus-visible:outline-none focus-visible:ring-2 p-4 md:py-2 border-2 md:border-green-800 md:hover:bg-green-800 md:hover:text-white
              ${
                showNavOnScreenSize ||
                (showNavOnClick && showNavOnScreenSize != showNavOnClick)
                  ? 'visible'
                  : 'hidden'
              }
            `}>
                Create Account
              </a>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

Nav.propTypes = {
  //   label: PropTypes.string.isRequired,
  //   onClick: PropTypes.func,
}

Nav.defaultProps = {}
