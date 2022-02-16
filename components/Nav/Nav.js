import {useState, useEffect} from 'react'
import Link from 'next/link'
import {Auth} from 'aws-amplify'
import {Cross as Hamburger} from 'hamburger-react'
import checkUser from '../../hooks/checkUser'
import {useRouter} from 'next/router'

import useQuery from '../../hooks/useQuery'

import {FaSearch} from 'react-icons/fa'

export const Nav = ({mockUser}) => {
  const router = useRouter()
  const user = checkUser()
  const {searchQuery, dispatch} = useQuery()

  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)
  const [isOpen, setOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
    setOpen(!isOpen)
  }

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)

    dispatch({
      type: 'SET_QUERY',
      payload: searchInput,
    })

    router.push(`/results/?q=${searchInput}&start=0`)
    setSearchInput('')
  }

  return (
    <nav className="flex justify-between py-5 lg:w-10/12 m-auto items-center max-w-[1200px] px-5 lg:px-0 flex-col md:flex-row w-full bg-[#f5f5ee]">
      <div className="flex flex-col items-center w-full lg:w-max md:flex-row">
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
            onClick={toggleNav}
            className="cursor-pointer md:hidden">
            <Hamburger
              color="rgb(22 101 52)"
              toggled={isOpen}
              toggle={setOpen}
            />
          </button>
        </div>

        {(toggleMenu || screenWidth > 768) && (
          <div className="flex flex-col w-full md:gap-6 md:flex-row md:w-min">
            {/* Parks */}
            <Link href="/parks">
              <a
                data-cy="parks"
                className="w-full p-4 py-4 text-xl font-bold text-center text-green-800 transition-all duration-200 ease-in-out border-b border-green-800 cursor-pointer font-display border-b-green-800 md:border-0 md:hover:bg-transparent md:hover:text-green-800 hover:bg-green-800 hover:text-white lg:pass md:rounded-md md:py-2">
                Parks
              </a>
            </Link>

            {/* About */}
            <Link href="/about">
              <a
                data-cy="about-page"
                className="w-full p-4 py-4 text-xl font-bold text-center text-green-800 transition-all duration-200 ease-in-out border-b border-green-800 cursor-pointer font-display border-b-green-800 md:border-0 md:hover:bg-transparent md:hover:text-green-800 hover:bg-green-800 hover:text-white lg:pass md:rounded-md md:py-2">
                About
              </a>
            </Link>
          </div>
        )}
      </div>

      {screenWidth > 1100 && (
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
      )}

      {(toggleMenu || screenWidth > 768) && (
        <div className="flex flex-col items-center w-full text-center lg:w-max md:flex-row md:text-left md:justify-end md:gap-6">
          {user || mockUser ? (
            <>
              {/* Profile */}
              <Link href="/profile">
                <a className="w-full py-4 text-xl font-bold text-green-800 transition-all duration-200 ease-in-out border-b border-green-800 cursor-pointer lg:w-min -4 font-display md:border-b-0 border-b-green-800 hover:bg-green-800 hover:text-white md:hover:bg-transparent md:hover:text-green-800 lg:pass md:rounded-md md:py-2">
                  Profile
                </a>
              </Link>

              {/* Logout */}
              <button
                onClick={() => {
                  Auth.signOut()
                  router.push('/')
                }}
                className="w-full p-4 py-4 text-xl font-bold text-green-800 transition-all duration-200 ease-in-out border-green-800 cursor-pointer md:border-2 lg:w-max font-display border-b-green-800 hover:bg-green-800 hover:text-white md:hover:bg-transparent md:rounded-md md:py-2 md:border-green-800 md:hover:bg-green-800 md:hover:text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
                Log out
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link href="/login">
                <a className="p-4 py-4 text-xl font-bold text-green-800 transition-all duration-200 ease-in-out border-green-800 cursor-pointer font-display md:border-b-0 border-b-green-800 hover:bg-green-800 hover:text-white md:hover:bg-transparent md:hover:text-green-800 lg:pass md:rounded-md md:py-2">
                  Log in
                </a>
              </Link>
              {/* Signup */}
              <Link href="/signup">
                <a className="p-4 py-4 text-xl font-bold text-green-800 transition-all duration-200 ease-in-out border-2 border-green-800 cursor-pointer font-display border-b-green-800 hover:bg-green-800 hover:text-white md:hover:bg-transparent md:rounded-md md:py-2 md:border-green-800 md:hover:bg-green-800 md:hover:text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
                  Create Account
                </a>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
