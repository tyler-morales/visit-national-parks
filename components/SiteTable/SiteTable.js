import {useState} from 'react'
import Link from 'next/link'
import {RiDeleteBinLine} from 'react-icons/ri'
import {RiEdit2Line} from 'react-icons/ri'
import {
  deleteSite,
  updateSite,
  createCollection,
  createSiteCollections,
  updateSiteCollections,
  deleteSiteCollections,
} from '../../src/graphql/mutations'

import {listSiteCollections} from '../../src/graphql/queries'
import {API} from 'aws-amplify'
import {ToastContainer, toast} from 'react-toastify'
import useModal from '../../hooks/useModal'
import Modal from '../../components/Modal/Modal'

import 'react-toastify/dist/ReactToastify.css'

export default function SiteTable({
  tab,
  visitedSites,
  bookmarkedSites,
  collections,
  allSiteCollections,
}) {
  // Modal state
  const {modalOpen, close, open} = useModal()
  const [currentVisitedSites, setVisitedSites] = useState(visitedSites)
  const [currentBookmarkedSites, setBookmarkedSites] = useState(bookmarkedSites)
  const [sortDir, setSortDir] = useState(null)
  const [sortRatingDir, setSortRatingDir] = useState(null)
  const [modalSite, setModalSite] = useState(null)
  console.log(currentVisitedSites.map((site) => site.name))

  // Sort columns
  const sort = (type) => {
    const changeSort = (direction) => {
      const change = direction == 'ASC' ? '<' : '>'

      // Refactor: Can I somehow pass in a variable to change the sort direction?
      //  Sort sites and bookmarked sites dynamically
      // let updateVisitSites = currentVisitedSites.sort((a, b) =>
      //   `a[type] ${change} b[type]` ? 1 : -1
      // )
      // let updateBookMarkSites = currentBookmarkedSites.sort((a, b) =>
      //   `a[type] ${change} b[type]` ? 1 : -1
      // )

      if (direction == 'ASC') {
        setVisitedSites(
          currentVisitedSites.sort((a, b) => (a[type] < b[type] ? 1 : -1))
        )
        setBookmarkedSites(
          currentBookmarkedSites.sort((a, b) => (a[type] < b[type] ? 1 : -1))
        )
        if (type == 'name') setSortDir('DEC')
        if (type == 'rating') setSortRatingDir('DEC')
      } else {
        setVisitedSites(
          currentVisitedSites.sort((a, b) => (a[type] > b[type] ? 1 : -1))
        )
        setBookmarkedSites(
          currentBookmarkedSites.sort((a, b) => (a[type] > b[type] ? 1 : -1))
        )
        if (type == 'name') setSortDir('ASC')
        if (type == 'rating') setSortRatingDir('ASC')
      }
    }

    // Sort columns by name
    if (type == 'name') sortDir == 'ASC' ? changeSort('ASC') : changeSort('DEC')
    // Sort columns by rating
    if (type == 'rating')
      sortRatingDir == 'ASC' ? changeSort('ASC') : changeSort('DEC')
  }

  const removeSite = async ({id, name}) => {
    try {
      // Delete site collections from specfic site
      // 1. query for the site collection specfic to the site
      const {data} = await API.graphql({
        query: listSiteCollections,
        variables: {
          filter: {
            siteID: {eq: id},
          },
        },
      })

      const siteCollectionID = data?.listSiteCollections?.items[0]?.id
      // 2. Delete ALL site collections for specfic site
      API.graphql({
        query: deleteSiteCollections,
        variables: {input: {id: siteCollectionID}},
      })

      // Delete site from database
      API.graphql({query: deleteSite, variables: {input: {id}}})

      // Filter site from local state
      let collection =
        tab == 'visited' ? currentVisitedSites : currentBookmarkedSites

      let newSites = collection.filter((item) => item.id != id)

      tab == 'visited'
        ? setVisitedSites(newSites)
        : setBookmarkedSites(newSites)

      toast(`${name} removed`)
    } catch (err) {
      console.error(err)
    }
  }

  const editSite = (site) => {
    setModalSite(site)
    open()
  }

  const editRating = async (site, rating) => {
    console.log('edited rating')
    // UPDATE: local state
    setVisitedSites(
      currentVisitedSites.map((item) => {
        return item.id === site.id ? {...item, rating} : item
      })
    )

    // UPDATE: database
    try {
      await API.graphql({
        query: updateSite,
        variables: {
          input: {
            id: site?.id,
            rating,
            owner: site?.username,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
    } catch (err) {
      console.error(err)
    }
  }

  const editReview = async (site, review, rating) => {
    console.log('edited review')
    // UPDATE: local state
    setVisitedSites(
      currentVisitedSites.map((item) => {
        return item.id === site.id ? {...item, review, rating} : item
      })
    )
    // UPDATE: database
    try {
      // Edit site review to database
      await API.graphql({
        query: updateSite,
        variables: {
          input: {
            id: site?.id,
            review,
            owner: site?.username,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
    } catch (err) {
      console.error(err)
    }
  }

  const editDate = async (site, date, rating, review) => {
    console.log('edited date')
    // UPDATE: local state
    setVisitedSites(
      currentVisitedSites.map((item) => {
        return item.id === site.id
          ? {
              ...item,
              dateVisited: `${date.year} ${date.month} ${date.day}`,
              rating,
              review,
            }
          : item
      })
    )

    // UPDATE: database
    try {
      // Edit site review to database
      await API.graphql({
        query: updateSite,
        variables: {
          input: {
            id: site?.id,
            visited: true,
            bookmarked: false,
            dateVisited: `${date.year} ${date.month} ${date.day}`,
            owner: site?.username,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
    } catch (err) {
      console.error(err)
    }
  }

  const addNewCollection = async (site, collection) => {
    // Add new collection
    try {
      await API.graphql({
        query: createCollection,
        variables: {
          input: {
            id: collection.id,
            name: collection.label,
            owner: site?.owner,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
      toast('New collection added', collection)
    } catch (err) {
      console.error(err)
    }
  }

  const editCollection = async (site, collection, id) => {
    try {
      await API.graphql({
        query: updateSiteCollections,
        variables: {
          input: {
            id,
            collectionID: collection.id,
            siteID: site.id,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
      toast(`${site.name} changed its collection to "${collection.label}"`)
    } catch (err) {
      console.error(err)
    }
  }

  const createSiteCollection = async (site, collection) => {
    try {
      await API.graphql({
        query: createSiteCollections,
        variables: {
          input: {
            collectionID: collection.id,
            siteID: site.id,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
      toast(`${site.name} added "${collection.label}" to its collection`)
    } catch (err) {
      console.error(err)
    }
  }

  const TableItems = ({site, num}) => {
    let collectionId = site?.collections.items[0]?.collectionID

    let collectionName = collections.filter((collection) => {
      return collection.id == collectionId
    })

    return (
      <tr className="flex flex-col w-full gap-2 mb-4 md:table-row md:mb-0">
        <td data-th="Image" className="text-left ">
          <Link href={`/park/${site.code}`}>
            <a>
              <img
                src={site.img}
                alt={site.fullName}
                className="rounded-lg w-full md:w-[150px] h-[150px] md:h-[100px] object-cover"
              />
            </a>
          </Link>
        </td>
        <td data-th="Name" className="group md:max-w-[150px] text-left">
          <Link href={`/park/${site.code}`}>
            <a>
              <span className="text-lg font-bold text-center text-green-800 md:text-left group-hover:underline group-hover:underline-offset-4 group-hover:decoration-wavy">
                {site.name}
              </span>
            </a>
          </Link>
        </td>
        {/* TODO: WORK IN PROGRESS */}
        {/* <td data-th="Average-rating" className="text-left ">
          <span className="text-lg font-bold text-green-800">3.8</span>
        </td> */}
        {tab == 'visited' && (
          <td data-th="Your-rating" className="text-left ">
            <span className="text-lg font-bold text-green-800">
              <span className="font-normal md:hidden">Your Rating: </span>&nbsp;
              {site.rating || 'n/a'}
            </span>
          </td>
        )}
        <td data-th="collection" className="text-left ">
          <span className="text-green-800 text-md">
            <span className="text-lg md:hidden">Collection: </span>&nbsp;
            <span className="text-lg md:text-base">
              {collectionName[0]?.label || 'n/a'}
            </span>
          </span>
        </td>
        {tab == 'visited' && (
          <td data-th="visited" className="text-left">
            <span className="text-lg text-green-800">
              <span className="md:hidden">Date Visited: </span>&nbsp;
              {site.dateVisited || 'n/a'}
            </span>
          </td>
        )}

        <td data-th="Settings" className="text-left ">
          <div className="flex gap-2 text-gray-700 md:flex-col-reverse">
            <button
              onClick={() => removeSite(site, num)}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white bg-red-400 rounded-md md:text-black md:rounded-none md:p-0 items-between text-small md:bg-transparent md:justify-start">
              <RiDeleteBinLine size="1.25em" />
              <span>Delete</span>
            </button>
            <button
              onClick={() => editSite(site, num)}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 bg-green-400 rounded-md md:rounded-none md:p-0 items-between text-small-3 md:bg-transparent md:justify-start">
              <RiEdit2Line size="1.25em" />
              <span>Edit</span>
            </button>
          </div>
        </td>
      </tr>
    )
  }

  const SitesTable = ({data}) => {
    const visitedHeaders = [
      {name: 'Image', sortable: false},
      {name: 'Name', sortable: true},
      // {name: 'Avg. Rating', sortable: false},
      {name: 'Your Rating', sortable: true},
      {name: 'Collection', sortable: false},
      {name: 'Visited', sortable: false},
      {name: 'Settings', sortable: false},
    ]
    const bookmarkedHeaders = [
      {name: 'Image', sortable: false},
      {name: 'Name', sortable: true},
      // {name: 'Avg. Rating', sortable: false},
      {name: 'Collection', sortable: false},
      {name: 'Settings', sortable: false},
    ]
    const createTableHead = () => {
      let selectedHeaders
      switch (tab) {
        case 'visited':
          selectedHeaders = visitedHeaders
          break
        case 'bookmark':
          selectedHeaders = bookmarkedHeaders
          break
        default:
          break
      }

      return selectedHeaders.map(({name, sortable}, index) => {
        let sortType
        if (name == 'Name') sortType = 'name'
        if (name == 'Your Rating') sortType = 'rating'

        if (sortable) {
          return (
            <th
              key={index}
              onClick={() => sort(sortType)}
              className="text-sm font-thin text-left text-green-800 uppercase">
              {name == 'Name' ? (
                <span className="pr-2 border-r-2 border-green-600 cursor-pointer md:p-0 md:border-0">
                  {name} {sortDir == 'ASC' ? '🔼 (Z-A)' : '🔽 (A-Z)'}
                </span>
              ) : (
                <span className="cursor-pointer">
                  {name} {sortRatingDir == 'ASC' ? '🔼' : '🔽'}
                </span>
              )}
            </th>
          )
        } else {
          return (
            <th
              key={index}
              className="hidden text-sm font-thin text-left text-green-800 uppercase md:table-cell">
              {name}
            </th>
          )
        }
      })
    }

    return (
      <table
        className="w-full mt-12 border-separate"
        style={{borderSpacing: '15px'}}>
        <tbody>
          <tr>
            <th className="text-xs tracking-widest text-left text-green-800 uppercase md:hidden">
              Sort
            </th>
          </tr>
          <tr className="flex w-full gap-2 pb-4 mb-4 border-b-2 border-green-300 md:table-row md:mb-0 md:border-0 md:pb-0">
            {createTableHead()}
          </tr>
          {data?.map((site, index) => (
            <TableItems key={index} site={site} num={index} />
          ))}
        </tbody>
      </table>
    )
  }
  return (
    <>
      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          handleClose={close}
          site={modalSite}
          allCollections={collections}
          siteCollections={allSiteCollections}
          editRating={editRating}
          editReview={editReview}
          editDate={editDate}
          addNewCollection={addNewCollection}
          editCollection={editCollection}
          createSiteCollection={createSiteCollection}
        />
      )}
      <SitesTable
        data={tab == 'visited' ? currentVisitedSites : currentBookmarkedSites}
      />
      <ToastContainer />
    </>
  )
}
