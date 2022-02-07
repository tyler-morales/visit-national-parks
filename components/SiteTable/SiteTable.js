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
} from '../../src/graphql/mutations'
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
  const [sortDir, setSortDir] = useState('ASC')
  const [modalSite, setModalSite] = useState(null)

  const sort = () => {
    if (sortDir == 'ASC') {
      setSortDir('DEC')
      currentVisitedSites = currentVisitedSites.sort((a, b) => a.name > b.name)
      currentBookmarkedSites = currentBookmarkedSites.sort(
        (a, b) => a.name > b.name
      )
    } else {
      setSortDir('ASC')
      currentVisitedSites = currentVisitedSites.sort((a, b) => a.name < b.name)
      currentBookmarkedSites = currentBookmarkedSites.sort(
        (a, b) => a.name < b.name
      )
    }
  }

  const removeSite = async ({id, name}) => {
    try {
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
    try {
      // Edit site rating to database
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

  const editReview = async (site, review) => {
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

  const editDate = async (site, date) => {
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
      <tr className="w-full">
        <td data-th="Image" className="text-left ">
          <Link href={`/park/${site.code}`}>
            <a>
              <img
                src={site.img}
                alt={site.fullName}
                className="rounded-lg w-[150px] h-[100px] object-cover"
              />
            </a>
          </Link>
        </td>
        <td data-th="Name" className="group max-w-[150px] text-left">
          <Link href={`/park/${site.code}`}>
            <a>
              <span className="text-lg font-bold text-green-800 group-hover:underline group-hover:underline-offset-4 group-hover:decoration-wavy">
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
              {site.rating || 'n/a'}
            </span>
          </td>
        )}
        <td data-th="collection" className="text-left ">
          <span className="text-green-800 text-md">
            {collectionName[0]?.label || 'n/a'}
          </span>
        </td>
        {tab == 'visited' && (
          <td data-th="visited" className="text-left">
            <span className="text-lg text-green-800">
              {site.dateVisited || 'n/a'}
            </span>
          </td>
        )}

        <td data-th="Settings" className="text-left ">
          <div className="flex flex-col gap-2 text-gray-700">
            <button
              onClick={() => editSite(site, num)}
              className="flex items-center w-full gap-2 items-between text-small">
              <RiEdit2Line size="1.25em" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => removeSite(site, num)}
              className="flex items-center w-full gap-2 items-between text-small">
              <RiDeleteBinLine size="1.25em" />
              <span>Delete</span>
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
      {name: 'Your Rating', sortable: false},
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
        if (sortable) {
          return (
            <th
              key={index}
              onClick={sort}
              className="text-sm font-thin text-left text-green-800 uppercase">
              <span className="cursor-pointer">
                {name} {sortDir == 'ASC' ? '🔽' : '🔼'}
              </span>
            </th>
          )
        } else {
          return (
            <th
              key={index}
              className="text-sm font-thin text-left text-green-800 uppercase">
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
          <tr className="w-full">{createTableHead()}</tr>
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
