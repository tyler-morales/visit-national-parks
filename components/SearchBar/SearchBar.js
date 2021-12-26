import {useState} from 'react'
import Select from 'react-select'

import Label from '../Forms/Label/Label'

const states = [
  {value: 'AL', label: 'Alabama'},
  {value: 'AK', label: 'Alaska'},
  {value: 'AZ', label: 'Arizona'},
  {value: 'AR', label: 'Arkansas'},
  {value: 'CA', label: 'California'},
  {value: 'CO', label: 'Colorado'},
  {value: 'CT', label: 'Connecticut'},
  {value: 'DE', label: 'Delaware'},
  {value: 'DC', label: 'District of Columbia'},
  {value: 'FL', label: 'Florida'},
  {value: 'GA', label: 'Georgia'},
  {value: 'HI', label: 'Hawaii'},
  {value: 'ID', label: 'Idaho'},
  {value: 'IL', label: 'Illinois'},
  {value: 'IN', label: 'Indiana'},
  {value: 'IA', label: 'Iowa'},
  {value: 'KS', label: 'Kansas'},
  {value: 'KY', label: 'Kentucky'},
  {value: 'LA', label: 'Louisiana'},
  {value: 'ME', label: 'Maine'},
  {value: 'MD', label: 'Maryland'},
  {value: 'MA', label: 'Massachusetts'},
  {value: 'MI', label: 'Michigan'},
  {value: 'MN', label: 'Minnesota'},
  {value: 'MS', label: 'Mississippi'},
  {value: 'MO', label: 'Missouri'},
  {value: 'MT', label: 'Montana'},
  {value: 'NE', label: 'Nebraska'},
  {value: 'NV', label: 'Nevada'},
  {value: 'NH', label: 'New Hampshire'},
  {value: 'NJ', label: 'New Jersey'},
  {value: 'NM', label: 'New Mexico'},
  {value: 'NY', label: 'New York'},
  {value: 'NC', label: 'North Carolina'},
  {value: 'ND', label: 'North Dakota'},
  {value: 'OH', label: 'Ohio'},
  {value: 'OK', label: 'Oklahoma'},
  {value: 'OR', label: 'Oregon'},
  {value: 'PA', label: 'Pennsylvania'},
  {value: 'PR', label: 'Puerto Rico'},
  {value: 'RI', label: 'Rhode Island'},
  {value: 'SC', label: 'South Carolina'},
  {value: 'SD', label: 'South Dakota'},
  {value: 'TN', label: 'Tennessee'},
  {value: 'TX', label: 'Texas'},
  {value: 'UT', label: 'Utah'},
  {value: 'VT', label: 'Vermont'},
  {value: 'VI', label: 'Virgin Islands'},
  {value: 'VA', label: 'Virginia'},
  {value: 'WA', label: 'Washington'},
  {value: 'WV', label: 'West Virginia'},
  {value: 'WI', label: 'Wisconsin'},
  {value: 'WY', label: 'Wyoming'},
]

const activities = [
  {
    value: '09DF0950-D319-4557-A57E-04CD2F63FF42',
    label: '🎨 Arts and Culture',
  },
  {
    value: '13A57703-BB1A-41A2-94B8-53B692EB7238',
    label: '🔭 Astronomy',
  },
  {
    value: '5F723BAD-7359-48FC-98FA-631592256E35',
    label: '🚙 Auto and ATV',
  },
  {
    value: '7CE6E935-F839-4FEC-A63E-052B1DEF39D2',
    label: '🚴‍♀️ Biking',
  },
  {
    value: '071BA73C-1D3C-46D4-A53C-00D5602F7F0E',
    label: '⛵️ Boating',
  },
  {
    value: 'A59947B7-3376-49B4-AD02-C0423E08C5F7',
    label: '⛺️ Camping',
  },
  {
    value: '07CBCA6A-46B8-413F-8B6C-ABEDEBF9853E',
    label: '🪖 Canyoneering',
  },
  {
    value: 'BA316D0F-92AE-4E00-8C80-DBD605DC58C3',
    label: '🦇 Caving',
  },
  {
    value: 'B12FAAB9-713F-4B38-83E4-A273F5A43C77',
    label: '🧗‍♀️ Climbing',
  },
  {
    value: 'C11D3746-5063-4BD0-B245-7178D1AD866C',
    label: '🧭 Compass and GPS',
  },
  {
    value: '8C495067-8E94-4D78-BBD4-3379DACF6550',
    label: '🐶 Dog Sledding',
  },
  {
    value: 'AE42B46C-E4B7-4889-A122-08FE180371AE',
    label: '🎣 Fishing',
  },
  {
    value: 'D72206E4-6CD1-4441-A355-F8F1827466B1',
    label: '🚁 Flying',
  },
  {
    value: '1DFACD97-1B9C-4F5A-80F2-05593604799E',
    label: '🥪 Food',
  },
  {
    value: '3F3ABD16-2C52-4EAA-A1F6-4235DE5686F0',
    label: '⛳️ Golfing',
  },
  {
    value: 'B33DC9B6-0B7D-4322-BAD7-A13A34C584A3',
    label: '🗺 Guided Tours',
  },
  {
    value: '42FD78B9-2B90-4AA9-BC43-F10E9FEA8B5A',
    label: '🤟 Hands-On',
  },
  {
    value: 'BFF8C027-7C8F-480B-A5F8-CD8CE490BFBA',
    label: '🥾 Hiking',
  },
  {
    value: '0307955A-B65C-4CE4-A780-EB36BAAADF0B',
    label: '🐎 Horse Trekking',
  },
  {
    value: '8386EEAF-985F-4DE8-9037-CCF91975AC94',
    label: '🦌 Hunting and Gathering',
  },
  {
    value: '5FF5B286-E9C3-430E-B612-3380D8138600',
    label: '⛸ Ice Skating',
  },
  {
    value: 'DF4A35E0-7983-4A3E-BC47-F37B872B0F25',
    label: '👧 Junior Ranger Program',
  },
  {
    value: 'B204DE60-5A24-43DD-8902-C81625A09A74',
    label: '📒 Living History',
  },
  {
    value: 'C8F98B28-3C10-41AE-AA99-092B3B398C43',
    label: '📇 Museum Exhibits',
  },
  {
    value: '4D224BCA-C127-408B-AC75-A51563C42411',
    label: '🚣‍♀️ Paddling',
  },
  {
    value: '0C0D142F-06B5-4BE1-8B44-491B90F93DEB',
    label: '🎥 Park Film',
  },
  {
    value: '7779241F-A70B-49BC-86F0-829AE332C708',
    label: '🎢 Playground',
  },
  {
    value: '42CF4021-8524-428E-866A-D33097A4A764',
    label: '🤿 SCUBA Diving',
  },
  {
    value: '24380E3F-AD9D-4E38-BF13-C8EEB21893E7',
    label: '🛍 Shopping',
  },
  {
    value: 'F9B1D433-6B86-4804-AED7-B50A519A3B7C',
    label: '⛷ Skiing',
  },
  {
    value: '3EBF7EAC-68FC-4754-B6A4-0C38A1583D45',
    label: '🤿 Snorkeling',
  },
  {
    value: 'C38B3C62-1BBF-4EA1-A1A2-35DE21B74C17',
    label: '❄️ Snow Play',
  },
  {
    value: '7C912B83-1B1B-4807-9B66-97C12211E48E',
    label: '❄️ Snowmobiling',
  },
  {
    value: '01D717BC-18BB-4FE4-95BA-6B13AD702038',
    label: '🎿 Snowshoeing',
  },
  {
    value: 'AE3C95F5-E05B-4A28-81DD-1C5FD4BE88E2',
    label: '🏄‍♀️ Surfing',
  },
  {
    value: '587BB2D3-EC35-41B2-B3F7-A39E2B088AEE',
    label: '🏊‍♀️ Swimming',
  },
  {
    value: '94369BFD-F186-477E-8713-AE2A745154DA',
    label: '👨‍👩‍👧‍👦 Team Sports',
  },
  {
    value: '4D06CEED-90C6-4B69-B264-32CC90B69BA6',
    label: '💦 Tubing',
  },
  {
    value: '8A1C7B17-C2C6-4F7C-9539-EA1E19971D80',
    label: '🌊 Water Skiing',
  },
  {
    value: '0B685688-3405-4E2A-ABBA-E3069492EC50',
    label: '🔎 Wildlife Watching',
  },
]

const topics = [
  {
    value: '28AEAE85-9DDA-45B6-981B-1CFCDCC61E14',
    label: '🌍 African American Heritage',
  },
  {
    value: 'F3883A66-A7CB-461B-868E-1B5932224B25',
    label: '🇺🇸 American Revolution',
  },
  {
    value: 'FB3641FE-67A3-4EC7-B9C4-0A0867776798',
    label: '🌊 Ancient Seas',
  },
  {
    value: '0D00073E-18C3-46E5-8727-2F87B112DDC6',
    label: '🦅 Animals',
  },
  {
    value: '7F81A0CB-B91F-4896-B9A5-41BE9A54A27B',
    label: '🪨 Archeology',
  },
  {
    value: '69693007-2DF2-4EDE-BB3B-A25EBA72BDF5',
    label: '🏰 Architecture and Building',
  },
  {
    value: '77B7EFDF-1A74-409C-8BA2-324EC919DB0E',
    label: '🐻‍❄️  Arctic',
  },
  {
    value: '00F3C3F9-2D67-4802-81AE-CCEA5D3BA370',
    label: '🎨 Arts',
  },
  {
    value: '227D2677-28CA-4CBF-997F-61108975A497',
    label: '🌏 Asian American Heritage',
  },
  {
    value: 'B912363F-771C-4098-BA3A-938DF38A9D7E',
    label: '✈️ Aviation',
  },
  {
    value: 'FC27FD15-62AA-4662-A97F-8E2A1A7CDE35',
    label: '💰 Banking',
  },
  {
    value: 'D10852A3-443C-4743-A5FA-6DD6D2A054B3',
    label: '🎂 Birthplace',
  },
  {
    value: '607D41B0-F830-4C07-A557-BCEF880A3929',
    label: '🪦 Burial, Cemetery and Gravesite',
  },
  {
    value: 'BCE3ACBE-7871-495B-AEA3-5E19BC482405',
    label: '🏔 Canyons and Canyonlands',
  },
  {
    value: 'E25F3456-43ED-45DD-93BC-057F9B944F7A',
    label: '🦇 Caves, Caverns and Karst',
  },
  {
    value: '4DC11D06-00F1-4A01-81D0-89CCCCE4FF50',
    label: '☀️ Climate Change',
  },
  {
    value: '46FC5CBD-9AD5-48F1-B4DA-1357031B1D2E',
    label: '🏝 Coasts, Islands and Atolls',
  },
  {
    value: '7F12224B-217A-4B07-A4A2-636B1CE7F221',
    label: '🇬🇧 Colonization and Settlement',
  },
  {
    value: '1170EEB6-5070-4760-8E7D-FF1A98272FAD',
    label: '🛍 Commerce',
  },
  {
    value: 'DAAD7F5E-9112-45F2-9A27-DA51B639F27E',
    label: '🦫 Dams',
  },
  {
    value: 'CDD8F34E-3BD4-425A-8264-4F0BA0DFBA38',
    label: '🏜 Dunes',
  },
  {
    value: 'FE005582-12C5-472C-8229-3CB004DB050E',
    label: '⚙️ Engineering',
  },
  {
    value: 'D9FC6D14-F8C7-4EBA-86EA-DFD99B6BB4F5',
    label: '🔒 Enslavement',
  },
  {
    value: 'F79C1242-80FF-40F0-A0C1-5FFCBA172EC0',
    label: '🐟 Estuaries and Mangroves',
  },
  {
    value: '12EA2B56-17EC-410A-A10D-BFBA87A0669B',
    label: '🗺 Explorers and Expeditions',
  },
  {
    value: '1F833C99-A75D-4F9E-9256-B96523485466',
    label: '🚜 Farming and Agriculture',
  },
  {
    value: '04A39AB8-DD02-432F-AE5F-BA1267D41A0D',
    label: '🔥 Fire',
  },
  {
    value: '9F6A7003-59D6-4438-935F-760FD04C1073',
    label: '👣 Foothills, Plains and Valleys',
  },
  {
    value: '41B1A0A3-11FF-4F55-9CB9-034A7E28B087',
    label: '🌳 Forests and Woodlands',
  },
  {
    value: '988B4AFC-F478-4673-B66D-E6BDB0CCFF35',
    label: '🏯 Forts',
  },
  {
    value: 'F6D3A52E-608F-47D6-96DF-1FD64122A2FC',
    label: '🦖 Fossils and Paleontology',
  },
  {
    value: 'F0F97E32-2F29-41B4-AF98-9FBE8DAB36B1',
    label: '🪨 Geology',
  },
  {
    value: 'F16A7A2C-174D-4FD8-9203-8D8D8EAD644B',
    label: '🌡 Geothermal',
  },
  {
    value: 'FBB14C45-1663-4714-9D28-B2B99874644D',
    label: '🥶 Glaciers',
  },
  {
    value: '94262026-92F5-48E9-90EF-01CEAEFBA4FF',
    label: '🌾 Grasslands',
  },
  {
    value: 'F12B6BDB-2FE9-4961-9DC2-59FEBC0990CD',
    label: '😭 Great Depression',
  },
  {
    value: '4BE01DC5-52E6-4F18-8C9A-B22D65965F6D',
    label: '💧 Groundwater',
  },
  {
    value: '78078CA8-DCBC-4320-A7BF-259A56D55CA2',
    label: '🌎 Hispanic American Heritage',
  },
  {
    value: '2B428F59-9148-40C1-B38E-130589F2540E',
    label: '🗽 Immigration',
  },
  {
    value: '66151063-AD2D-43C4-A385-5876B5AAD4F3',
    label: '🚀 Impact Craters',
  },
  {
    value: '351EE154-87AA-46B0-BBA1-ED604368ACE9',
    label: '🔒 Incarceration',
  },
  {
    value: '0B575E33-B68F-4F3D-998E-B03284606CF3',
    label: '🏭 Industry',
  },
  {
    value: 'E0AB480F-3A94-4DC1-8B21-9555F2C59B32',
    label: '🏳️‍🌈 LGBTQ American Heritage',
  },
  {
    value: '14FA9FF3-7D86-4406-9A6D-BE9032A1C578',
    label: '💪 Laborer and Worker',
  },
  {
    value: '1CF1F6BB-A037-445B-8CF2-81428E50CE52',
    label: '🐟 Lakes',
  },
  {
    value: 'AF4F1CDF-E6C4-4886-BA91-8BC887DC2793',
    label: '🏡 Landscape Design',
  },
  {
    value: '9FCC01C6-F068-4A05-9A78-23FEBFADAF56',
    label: '🌎 Latino American Heritage',
  },
  {
    value: '4C9D4777-A9DA-47D1-A0B9-F4A3C98BC1B3',
    label: '🦀 Maritime',
  },
  {
    value: '4B3CD083-7500-434B-A8C2-D355925E0245',
    label: '🚑 Medicine',
  },
  {
    value: '69E16062-0E4F-4DE0-91FB-E4EDB2484572',
    label: '🛤 Migrations',
  },
]

export default function SearchBar() {
  const [tab, setTab] = useState('name')
  const [selectedState, setselectedState] = useState(null)
  const [selectedActivity, setselectedActivity] = useState(null)
  const [selectedTopic, setselectedTopic] = useState(null)

  const tabStyles = {
    active: 'bg-green-200 backdrop-opacity-10',
  }

  return (
    <div className="p-8 pt-4 bg-white border-2 border-gray-200 rounded-3xl">
      {/* Nav Buttons */}
      <div className="pb-8 border-b-2 border-gray-200">
        <span className="block mb-6 text-sm text-gray-500">Search by</span>
        <div className="flex gap-10">
          <button
            onClick={() => setTab('name')}
            className={`transition-all px-6 py-3  text-green-800 text-lg rounded-full text-md w-40 font-bold hover:border-green-800 hover:border-2 border-2 border-transparent ${
              tab == 'name' ? tabStyles.active : null
            }`}>
            Park Name
          </button>
          <button
            onClick={() => setTab('filter')}
            className={`transition-all px-6 py-3  text-green-800 text-lg rounded-full text-md w-40 font-bold hover:border-green-800 hover:border-2 border-2 border-transparent ${
              tab == 'filter' ? tabStyles.active : null
            }`}>
            Filters
          </button>
        </div>
      </div>
      {/* Input and filters */}
      {tab == 'name' && (
        <form className="mt-8">
          <div className="flex flex-col justify-between gap-4">
            <Label title="Park Name" for="parkName" />
            <div className="flex justify-between gap-4">
              <input
                type="text"
                name="parkName"
                placeholder="Yellowstone"
                className="w-full px-6 py-3 bg-gray-100 rounded-full"
              />
              <button
                type="submit"
                className="px-4 py-3 text-white bg-green-800 rounded-full w-36 ring-blue-500 ring-offset-white ring-offset-2 focus:outline-none focus:ring-2">
                Search
              </button>
            </div>
          </div>
        </form>
      )}
      {tab == 'filter' && (
        <form className="mt-8">
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-full gap-4">
              <Label title="States" for="states" />
              <Select
                options={states}
                defaultValue={selectedState}
                onChange={setselectedState}
                id="states"
                isMulti
              />
            </div>
            <div className="flex flex-col w-full gap-4">
              <Label title="Activity" for="activity" />
              <Select
                options={activities}
                defaultValue={selectedActivity}
                onChange={setselectedActivity}
                id="activity"
                isMulti
              />
            </div>
            <div className="flex flex-col w-full gap-4">
              <Label title="Topics" for="topic" />
              <Select
                options={topics}
                defaultValue={selectedTopic}
                onChange={setselectedTopic}
                id="topic"
                isMulti
              />
            </div>
            <button
              type="submit"
              className="self-end w-48 px-4 py-3 text-white bg-green-800 rounded-full h-min ring-blue-500 ring-offset-white ring-offset-2 focus:outline-none focus:ring-2">
              Search
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
