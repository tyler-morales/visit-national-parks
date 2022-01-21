import {useState} from 'react'

// AWS
import {API} from 'aws-amplify'

// Icons
import {MdBookmark, MdBookmarkBorder} from 'react-icons/md'
import {BsCheckLg} from 'react-icons/bs'
import {AiFillCaretDown} from 'react-icons/ai'

// API
import {createSite, updateSite} from '../../../src/graphql/mutations'
import {listSites} from '../../../src/graphql/queries'

// Misc
import {v4 as uuidv4} from 'uuid'
import useSWR from 'swr'
import checkUser from '../../../hooks/checkUser'

export default function CollectionButton({parkCode, name, fullName, url}) {
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [visited, setVisited] = useState(null)
  const [bookmarked, setBookmarked] = useState(null)
  const [id, setId] = useState(uuidv4())

  const user = checkUser()

  // Once the  user data loads, call this function to populate the Collection button with the correct label ('Want to visit' or 'visited')
  const fetchUserSite = async (owner, code) => {
    try {
      const {data} = await API.graphql({
        query: listSites,
        variables: {
          filter: {
            code: {eq: code},
            owner: {eq: owner},
          },
        },
      })

      const userData = data?.listSites?.items[0]

      // Site is bookmarked, set UI to bookmarked
      if (userData?.bookmarked) {
        setBookmarked(true)
      }

      // Site is visited, set UI to visited
      if (userData?.visited) {
        setVisited(true)
      }

      if (userData != null) {
        setId(userData?.id)
      }

      // Create site object if no site exists
      if (userData == null) {
        setBookmarked(false)
        setVisited(false)

        const siteInfo = {
          id,
          name: fullName,
          code: parkCode,
          img: url,
          owner: user?.username,
          bookmarked: false,
          visited: false,
        }

        await API.graphql({
          query: createSite,
          variables: {input: siteInfo},
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })

        setBookmarked(false)
        setVisited(false)

        console.log(`${name} added for the first time`)
      }
      return userData
    } catch (err) {
      console.log('Site not added by user', err)
    }
  }
  // Only call the fetchUserSite method if `user` exists
  useSWR(user ? [user?.username, parkCode] : null, fetchUserSite)

  const openDropdown = () => {
    console.log('dropdown clicked')
    if (!user) alert('Please sign in or create an account')

    if (user) {
      if (toggleDropdown) {
        setToggleDropdown(false)
      } else {
        setToggleDropdown(true)
      }
    }
  }

  const toggleVisitedQuery = async () => {
    try {
      // A site exists, update it
      if (!visited) {
        await API.graphql({
          query: updateSite,
          variables: {
            input: {
              id,
              visited: true,
              bookmarked: false,
              owner: user?.username,
            },
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })
        setVisited(true)
        setBookmarked(false)
        setToggleDropdown(false)
        console.log(`${name} visited`)
      }
    } catch (err) {
      console.error(err)
    }
  }
  // When the user clicks on the button, update the state in the UI and database
  const handleDBQuery = async (clickType) => {
    try {
      // Make user log in if they are not already
      if (user) {
        setBookmarked(false)
      } else {
        alert('Please sign in or create an account')
      }

      const switchCollection = async (clickType) => {
        console.log(clickType)
        let newInput
        if (clickType == 'bookmark') {
          setVisited(false)
          setBookmarked(true)
          newInput = {id, bookmarked: true}
        }
        if (clickType == 'unbookmark') {
          setBookmarked(false)
          newInput = {id, bookmarked: false}
        }
        if (clickType == 'unvisit') {
          setVisited(false)
          setBookmarked(false)
          newInput = {id, visited: false, bookmarked: false}
        }

        await API.graphql({
          query: updateSite,
          variables: {input: newInput},
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })

        console.log(`${name} ${clickType}`)
      }

      // BOOKMARK SITE
      if (!bookmarked) {
        switchCollection(clickType)
      }
      // REMOVE BOOKMARK SITE
      if (bookmarked) {
        switchCollection(clickType)
      }
      // REMOVE VISIT
      if (visited) {
        switchCollection(clickType)
      }
    } catch (err) {
      console.error('errored out', err)
    }
  }

  function Bookmark({label, icon, type, clickType}) {
    return (
      <button
        aria-label={type}
        onClick={() => handleDBQuery(clickType)}
        className="relative flex items-center gap-3 text-white bg-blue-600 rounded-l-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
        <span className="flex items-center gap-3 px-4">
          {icon}
          <span>{label}</span>
        </span>
      </button>
    )
  }

  return (
    <div className="relative my-8 w-max">
      {/* Button */}
      <div className="flex">
        {!bookmarked && !visited && (
          <Bookmark
            label="Want to Visit"
            type="Bookmark"
            icon={<MdBookmarkBorder />}
            clickType="bookmark"
          />
        )}

        {bookmarked && (
          <Bookmark
            label="Bookmarked"
            type="Bookmarked"
            icon={<MdBookmark />}
            clickType="unbookmark"
          />
        )}

        {visited && (
          <button
            aria-label="Visited"
            onClick={() => handleDBQuery('unvisit')}
            className="flex items-center gap-3 px-4 py-2 pr-6 text-white bg-green-600 rounded-md hover:bg-green-700 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
            <BsCheckLg />
            <span>Visited</span>
          </button>
        )}

        {/* Arrow */}
        {!visited && (
          <button
            aria-label="Dropdown arrow"
            onClick={openDropdown}
            className={`px-4 py-3 pl-4 text-white rounded-r-md focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none ${
              visited
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}>
            <AiFillCaretDown />
          </button>
        )}
      </div>

      {/* Dropdown */}
      <button
        aria-label="Visited"
        onClick={toggleVisitedQuery}
        className={`shadow-lg absolute items-center w-full gap-3 mt-2 text-black rounded-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none`}>
        <span
          className={`flex items-center gap-3 px-4 ${
            toggleDropdown
              ? 'flex bg-white border-2 border-blue-600 rounded-md hover:bg-green-600 hover:border-green-800 hover:text-white'
              : 'hidden'
          }`}>
          <BsCheckLg />
          <span className="py-2">Visited</span>
        </span>
      </button>
    </div>
  )
}
