import {useState} from 'react'
import Link from 'next/link'
import {RiDeleteBinLine} from 'react-icons/ri'
import {RiEdit2Line} from 'react-icons/ri'
import {deleteSite} from '../../src/graphql/mutations'
import {API} from 'aws-amplify'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function SiteTable({tab, visitedSites, bookmarkedSites}) {
  const [currentVisitedSites, setVisitedSites] = useState(visitedSites)
  const [currentBookmarkedSites, setBookmarkedSites] = useState(bookmarkedSites)
  const [sortDir, setSortDir] = useState('ASC')

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

  const editSite = ({id, name}) => {
    console.log(`Editing ${name} | id:${id} `)
  }

  const TableItems = ({site, num}) => {
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
        <td data-th="Average-rating" className="text-left ">
          <span className="text-lg font-bold text-green-800">3.8</span>
        </td>
        {tab == 'visited' && (
          <td data-th="Your-rating" className="text-left ">
            <span className="text-lg font-bold text-green-800">4.5</span>
          </td>
        )}

        <td data-th="list" className="text-left ">
          <span className="text-green-800 text-md">2017 Grand Canyon Trip</span>
        </td>
        {tab == 'visited' && (
          <td data-th="visited" className="text-left">
            <span className="text-lg text-green-800">6/2017</span>
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
      {name: 'Avg. Rating', sortable: false},
      {name: 'Your Rating', sortable: false},
      {name: 'Collection', sortable: false},
      {name: 'Visited', sortable: false},
      {name: 'Settings', sortable: false},
    ]
    const bookmarkedHeaders = [
      {name: 'Image', sortable: false},
      {name: 'Name', sortable: true},
      {name: 'Avg. Rating', sortable: false},
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
      <SitesTable
        data={tab == 'visited' ? currentVisitedSites : currentBookmarkedSites}
      />
      <ToastContainer />
    </>
  )
}