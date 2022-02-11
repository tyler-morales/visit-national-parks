import {useState, useEffect, useLayoutEffect} from 'react'
import Link from 'next/link'
import {Auth} from 'aws-amplify'
import {Cross as Hamburger} from 'hamburger-react'
import checkUser from '../../hooks/checkUser'
import {useRouter} from 'next/router'

import {FaSearch} from 'react-icons/fa'

export const Nav = ({mockUser}) => {
  const router = useRouter()
  const user = checkUser()
  const [showNavOnClick, setShowNavOnClick] = useState(false)
  const [showNavOnScreenSize, setShowNavOnScreenSize] = useState(true)
  const [isOpen, setOpen] = useState(false)
  const [searchInput, setSearchInput] = useState(null)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
    console.log(searchInput)
    router.push(`/results/?q=${searchInput}&start=0`)
    setSearchInput('')
  }

  return (
    <nav className="flex justify-between py-5 lg:w-10/12 m-auto items-center max-w-[1200px] px-5 lg:px-0 flex-col md:flex-row w-full bg-[#f5f5ee]">
      <div className="flex flex-col items-center w-max md:flex-row">
        <div className="flex items-center justify-between w-full md:w-max md:pr-8">
          {/* Logo */}
          <Link href="/">
            <a className="md:rounded-md ">
              <img
                src="/images/logo.svg"
                alt="Parkway logo"
                width="200px"
                height="64px"
                className="cursor-pointer"
              />
            </a>
          </Link>

          {/* Hamburger button */}
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
          {/* Parks */}
          <Link href="/parks">
            <a
              data-cy="parks"
              className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out border-b-green-800 border-b border-green-800 md:border-0 md:hover:bg-transparent md:hover:text-green-800 py-4   w-full text-center hover:bg-green-800 hover:text-white lg:pass md:rounded-md  p-4 md:py-2
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

          {/* About */}
          <Link href="/about">
            <a
              data-cy="about-page"
              className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out border-b-green-800 border-b border-green-800 md:border-0 md:hover:bg-transparent md:hover:text-green-800 py-4   w-full text-center hover:bg-green-800 hover:text-white lg:pass md:rounded-md  p-4 md:py-2
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

      {/* Search bar */}
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          className="px-4 py-2 rounded-md "
          type="text"
          placeholder="Search for anything"
          value={searchInput}
          name="search"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="px-4 py-2 font-bold text-white transition-all bg-green-700 border-2 border-transparent rounded-md focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none hover:bg-green-600"
          type="submit">
          <FaSearch />
        </button>
      </form>

      <div className="flex flex-col items-center text-center w-max md:flex-row md:text-left md:justify-end md:gap-6">
        {user || mockUser ? (
          <>
            {/* Profile */}
            <Link href="/profile">
              <a
                className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out md:border-b-0 border-b-green-800 border-b border-green-800 py-4   hover:bg-green-800 hover:text-white md:hover:bg-transparent md:hover:text-green-800 lg:pass md:rounded-md  p-4 md:py-2 
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

            {/* Logout */}
            <button
              onClick={() => {
                Auth.signOut()
                router.push('/')
              }}
              className={`font-display w-max font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out border-b-green-800 border-green-800 py-4 hover:bg-green-800 hover:text-white md:hover:bg-transparent md:rounded-md  p-4 md:py-2 border-2 md:border-green-800 md:hover:bg-green-800 md:hover:text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none
              ${
                showNavOnScreenSize ||
                (showNavOnClick && showNavOnScreenSize != showNavOnClick)
                  ? 'visible'
                  : 'hidden'
              }
            `}>
              Log out
            </button>
          </>
        ) : (
          <>
            {/* Login */}
            <Link href="/login">
              <a
                className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out md:border-b-0 border-b-green-800 border-b border-green-800 py-4   hover:bg-green-800 hover:text-white md:hover:bg-transparent md:hover:text-green-800 lg:pass md:rounded-md  p-4 md:py-2 
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
            {/* Signup */}
            <Link href="/signup">
              <a
                className={`font-display font-bold text-xl cursor-pointer text-green-800 transition-all duration-200 ease-in-out border-b-green-800 border-green-800 py-4 hover:bg-green-800 hover:text-white md:hover:bg-transparent md:rounded-md  p-4 md:py-2 border-2 md:border-green-800 md:hover:bg-green-800 md:hover:text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none
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
