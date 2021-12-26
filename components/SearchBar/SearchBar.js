import {useState} from 'react'
import Select from 'react-select'

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

const parks = [
  {
    value: 'abli',
    label: 'Abraham Lincoln Birthplace National Historical Park',
  },
  {value: 'acad', label: 'Acadia National Park'},
  {value: 'adam', label: 'Adams National Historical Park'},
  {value: 'afam', label: 'African American Civil War Memorial'},
  {value: 'afbg', label: 'African Burial Ground National Monument'},
  {value: 'agfo', label: 'Agate Fossil Beds National Monument'},
  {value: 'alka', label: 'Ala Kahakai National Historic Trail'},
  {value: 'alag', label: 'Alagnak Wild River'},
  {value: 'anch', label: 'Alaska Public Lands'},
  {value: 'alca', label: 'Alcatraz Island'},
  {
    value: 'aleu',
    label: 'Aleutian Islands World War II National Historic Area',
  },
  {value: 'alfl', label: 'Alibates Flint Quarries National Monument'},
  {
    value: 'alpo',
    label: 'Allegheny Portage Railroad National Historic Site',
  },
  {value: 'amme', label: 'American Memorial Park'},
  {value: 'amis', label: 'Amistad National Recreation Area'},
  {value: 'anac', label: 'Anacostia Park'},
  {value: 'ande', label: 'Andersonville National Historic Site'},
  {value: 'anjo', label: 'Andrew Johnson National Historic Site'},
  {value: 'ania', label: 'Aniakchak National Monument & Preserve'},
  {value: 'anti', label: 'Antietam National Battlefield'},
  {value: 'apis', label: 'Apostle Islands National Lakeshore'},
  {value: 'appa', label: 'Appalachian National Scenic Trail'},
  {
    value: 'apco',
    label: 'Appomattox Court House National Historical Park',
  },
  {value: 'arch', label: 'Arches National Park'},
  {value: 'arpo', label: 'Arkansas Post National Memorial'},
  {value: 'arho', label: 'Arlington House, The Robert E. Lee Memorial'},
  {value: 'asis', label: 'Assateague Island National Seashore'},
  {value: 'azru', label: 'Aztec Ruins National Monument'},
  {value: 'badl', label: 'Badlands National Park'},
  {value: 'bawa', label: 'Baltimore-Washington Parkway'},
  {value: 'band', label: 'Bandelier National Monument'},
  {
    value: 'bepa',
    label: "Belmont-Paul Women's Equality National Monument",
  },
  {value: 'beol', label: "Bent's Old Fort National Historic Site"},
  {value: 'bela', label: 'Bering Land Bridge National Preserve'},
  {value: 'bibe', label: 'Big Bend National Park'},
  {value: 'bicy', label: 'Big Cypress National Preserve'},
  {value: 'biho', label: 'Big Hole National Battlefield'},
  {
    value: 'biso',
    label: 'Big South Fork National River & Recreation Area',
  },
  {value: 'bith', label: 'Big Thicket National Preserve'},
  {value: 'bica', label: 'Bighorn Canyon National Recreation Area'},
  {value: 'bicr', label: 'Birmingham Civil Rights National Monument'},
  {value: 'bisc', label: 'Biscayne National Park'},
  {value: 'blca', label: 'Black Canyon Of The Gunnison National Park'},
  {
    value: 'blrv',
    label: 'Blackstone River Valley National Historical Park',
  },
  {value: 'blri', label: 'Blue Ridge Parkway'},
  {value: 'blue', label: 'Bluestone National Scenic River'},
  {value: 'bowa', label: 'Booker T Washington National Monument'},
  {
    value: 'boaf',
    label: 'Boston African American National Historic Site',
  },
  {
    value: 'boha',
    label: 'Boston Harbor Islands National Recreation Area',
  },
  {value: 'bost', label: 'Boston National Historical Park'},
  {value: 'brcr', label: 'Brices Cross Roads National Battlefield Site'},
  {
    value: 'brvb',
    label: 'Brown v. Board of Education National Historic Site',
  },
  {value: 'brca', label: 'Bryce Canyon National Park'},
  {value: 'buis', label: 'Buck Island Reef National Monument'},
  {value: 'buff', label: 'Buffalo National River'},
  {value: 'cabr', label: 'Cabrillo National Monument'},
  {value: 'cali', label: 'California National Historic Trail'},
  {value: 'cane', label: 'Camp Nelson National Monument'},
  {value: 'cana', label: 'Canaveral National Seashore'},
  {value: 'cari', label: 'Cane River Creole National Historical Park'},
  {value: 'cach', label: 'Canyon de Chelly National Monument'},
  {value: 'cany', label: 'Canyonlands National Park'},
  {value: 'caco', label: 'Cape Cod National Seashore'},
  {value: 'caha', label: 'Cape Hatteras National Seashore'},
  {
    value: 'came',
    label: 'Cape Henry Memorial Part of Colonial National Historical Park',
  },
  {value: 'cakr', label: 'Cape Krusenstern National Monument'},
  {value: 'calo', label: 'Cape Lookout National Seashore'},
  {value: 'cahi', label: 'Capitol Hill Parks'},
  {value: 'care', label: 'Capitol Reef National Park'},
  {
    value: 'cajo',
    label: 'Captain John Smith Chesapeake National Historic Trail',
  },
  {value: 'cavo', label: 'Capulin Volcano National Monument'},
  {value: 'carl', label: 'Carl Sandburg Home National Historic Site'},
  {value: 'cave', label: 'Carlsbad Caverns National Park'},
  {value: 'cawo', label: 'Carter G. Woodson Home National Historic Site'},
  {value: 'cagr', label: 'Casa Grande Ruins National Monument'},
  {value: 'casa', label: 'Castillo de San Marcos National Monument'},
  {value: 'cacl', label: 'Castle Clinton National Monument'},
  {value: 'camo', label: 'Castle Mountains National Monument'},
  {value: 'cato', label: 'Catoctin Mountain Park'},
  {value: 'cebr', label: 'Cedar Breaks National Monument'},
  {
    value: 'cebe',
    label: 'Cedar Creek & Belle Grove National Historical Park',
  },
  {value: 'chcu', label: 'Chaco Culture National Historical Park'},
  {value: 'cham', label: 'Chamizal National Memorial'},
  {value: 'chis', label: 'Channel Islands National Park'},
  {value: 'chpi', label: 'Charles Pinckney National Historic Site'},
  {
    value: 'chyo',
    label: 'Charles Young Buffalo Soldiers National Monument',
  },
  {value: 'chat', label: 'Chattahoochee River National Recreation Area'},
  {
    value: 'choh',
    label: 'Chesapeake & Ohio Canal National Historical Park',
  },
  {value: 'cbpo', label: 'Chesapeake Bay'},
  {
    value: 'chch',
    label: 'Chickamauga & Chattanooga National Military Park',
  },
  {value: 'chic', label: 'Chickasaw National Recreation Area'},
  {value: 'chir', label: 'Chiricahua National Monument'},
  {value: 'chri', label: 'Christiansted National Historic Site'},
  {value: 'ciro', label: 'City Of Rocks National Reserve'},
  {value: 'cwdw', label: 'Civil War Defenses of Washington'},
  {value: 'clba', label: 'Clara Barton National Historic Site'},
  {value: 'colo', label: 'Colonial National Historical Park'},
  {value: 'colm', label: 'Colorado National Monument'},
  {value: 'colt', label: 'Coltsville National Historical Park'},
  {value: 'cong', label: 'Congaree National Park'},
  {value: 'coga', label: 'Constitution Gardens'},
  {value: 'coro', label: 'Coronado National Memorial'},
  {value: 'cowp', label: 'Cowpens National Battlefield'},
  {value: 'crla', label: 'Crater Lake National Park'},
  {
    value: 'crmo',
    label: 'Craters Of The Moon National Monument & Preserve',
  },
  {value: 'cuga', label: 'Cumberland Gap National Historical Park'},
  {value: 'cuis', label: 'Cumberland Island National Seashore'},
  {value: 'cure', label: 'Curecanti National Recreation Area'},
  {value: 'cuva', label: 'Cuyahoga Valley National Park'},
  {value: 'cech', label: 'César E. Chávez National Monument'},
  {
    value: 'daav',
    label: 'Dayton Aviation Heritage National Historical Park',
  },
  {value: 'deso', label: 'De Soto National Memorial'},
  {value: 'deva', label: 'Death Valley National Park'},
  {value: 'dewa', label: 'Delaware Water Gap National Recreation Area'},
  {value: 'dena', label: 'Denali National Park & Preserve'},
  {value: 'depo', label: 'Devils Postpile National Monument'},
  {value: 'deto', label: 'Devils Tower National Monument'},
  {value: 'dino', label: 'Dinosaur National Monument'},
  {value: 'drto', label: 'Dry Tortugas National Park'},
  {value: 'ddem', label: 'Dwight D. Eisenhower Memorial'},
  {value: 'ebla', label: "Ebey's Landing National Historical Reserve"},
  {value: 'edal', label: 'Edgar Allan Poe National Historic Site'},
  {value: 'efmo', label: 'Effigy Mounds National Monument'},
  {value: 'eise', label: 'Eisenhower National Historic Site'},
  {
    value: 'elca',
    label: 'El Camino Real de Tierra Adentro National Historic Trail',
  },
  {
    value: 'elte',
    label: 'El Camino Real de los Tejas National Historic Trail',
  },
  {value: 'elma', label: 'El Malpais National Monument'},
  {value: 'elmo', label: 'El Morro National Monument'},
  {value: 'elro', label: 'Eleanor Roosevelt National Historic Site'},
  {
    value: 'elis',
    label: 'Ellis Island Part of Statue of Liberty National Monument',
  },
  {value: 'euon', label: "Eugene O'Neill National Historic Site"},
  {value: 'ever', label: 'Everglades National Park'},
  {value: 'feha', label: 'Federal Hall National Memorial'},
  {value: 'fiis', label: 'Fire Island National Seashore'},
  {value: 'fila', label: 'First Ladies National Historic Site'},
  {value: 'frst', label: 'First State National Historical Park'},
  {value: 'flni', label: 'Flight 93 National Memorial'},
  {value: 'flfo', label: 'Florissant Fossil Beds National Monument'},
  {value: 'foth', label: "Ford's Theatre"},
  {value: 'fobo', label: 'Fort Bowie National Historic Site'},
  {value: 'foda', label: 'Fort Davis National Historic Site'},
  {value: 'fodo', label: 'Fort Donelson National Battlefield'},
  {value: 'fodu', label: 'Fort Dupont Park'},
  {value: 'fofo', label: 'Fort Foote Park'},
  {value: 'fofr', label: 'Fort Frederica National Monument'},
  {value: 'fola', label: 'Fort Laramie National Historic Site'},
  {value: 'fols', label: 'Fort Larned National Historic Site'},
  {value: 'foma', label: 'Fort Matanzas National Monument'},
  {
    value: 'fomc',
    label: 'Fort McHenry National Monument and Historic Shrine',
  },
  {value: 'fomr', label: 'Fort Monroe National Monument'},
  {value: 'fone', label: 'Fort Necessity National Battlefield'},
  {value: 'fopo', label: 'Fort Point National Historic Site'},
  {value: 'fopu', label: 'Fort Pulaski National Monument'},
  {value: 'fora', label: 'Fort Raleigh National Historic Site'},
  {value: 'fosc', label: 'Fort Scott National Historic Site'},
  {value: 'fosm', label: 'Fort Smith National Historic Site'},
  {value: 'fost', label: 'Fort Stanwix National Monument'},
  {
    value: 'fosu',
    label: 'Fort Sumter and Fort Moultrie National Historical Park',
  },
  {value: 'foun', label: 'Fort Union National Monument'},
  {
    value: 'fous',
    label: 'Fort Union Trading Post National Historic Site',
  },
  {value: 'fova', label: 'Fort Vancouver National Historic Site'},
  {value: 'fowa', label: 'Fort Washington Park'},
  {value: 'fobu', label: 'Fossil Butte National Monument'},
  {value: 'frde', label: 'Franklin Delano Roosevelt Memorial'},
  {value: 'frdo', label: 'Frederick Douglass National Historic Site'},
  {value: 'frla', label: 'Frederick Law Olmsted National Historic Site'},
  {
    value: 'frsp',
    label: 'Fredericksburg & Spotsylvania National Military Park',
  },
  {value: 'frri', label: 'Freedom Riders National Monument'},
  {value: 'frhi', label: 'Friendship Hill National Historic Site'},
  {value: 'gaar', label: 'Gates Of The Arctic National Park & Preserve'},
  {value: 'jeff', label: 'Gateway Arch National Park'},
  {value: 'gate', label: 'Gateway National Recreation Area'},
  {value: 'gari', label: 'Gauley River National Recreation Area'},
  {value: 'gegr', label: 'General Grant National Memorial'},
  {value: 'gero', label: 'George Rogers Clark National Historical Park'},
  {
    value: 'gewa',
    label: 'George Washington Birthplace National Monument',
  },
  {value: 'gwca', label: 'George Washington Carver National Monument'},
  {value: 'gwmp', label: 'George Washington Memorial Parkway'},
  {value: 'gett', label: 'Gettysburg National Military Park'},
  {value: 'gicl', label: 'Gila Cliff Dwellings National Monument'},
  {value: 'glba', label: 'Glacier Bay National Park & Preserve'},
  {value: 'glac', label: 'Glacier National Park'},
  {value: 'glca', label: 'Glen Canyon National Recreation Area'},
  {value: 'glec', label: 'Glen Echo Park'},
  {value: 'glde', label: 'Gloria Dei Church National Historic Site'},
  {value: 'goga', label: 'Golden Gate National Recreation Area'},
  {value: 'gosp', label: 'Golden Spike National Historical Park'},
  {value: 'gois', label: 'Governors Island National Monument'},
  {value: 'grca', label: 'Grand Canyon National Park'},
  {value: 'para', label: 'Grand Canyon-Parashant National Monument'},
  {value: 'grpo', label: 'Grand Portage National Monument'},
  {value: 'grte', label: 'Grand Teton National Park'},
  {value: 'grko', label: 'Grant-Kohrs Ranch National Historic Site'},
  {value: 'grba', label: 'Great Basin National Park'},
  {value: 'greg', label: 'Great Egg Harbor River'},
  {value: 'grfa', label: 'Great Falls Park'},
  {value: 'grsa', label: 'Great Sand Dunes National Park & Preserve'},
  {value: 'grsm', label: 'Great Smoky Mountains National Park'},
  {value: 'grsp', label: 'Green Springs'},
  {value: 'gree', label: 'Greenbelt Park'},
  {value: 'gumo', label: 'Guadalupe Mountains National Park'},
  {value: 'guco', label: 'Guilford Courthouse National Military Park'},
  {value: 'guis', label: 'Gulf Islands National Seashore'},
  {value: 'hafo', label: 'Hagerman Fossil Beds National Monument'},
  {value: 'hale', label: 'Haleakalā National Park'},
  {value: 'hagr', label: 'Hamilton Grange National Memorial'},
  {value: 'hamp', label: 'Hampton National Historic Site'},
  {value: 'haha', label: 'Harmony Hall'},
  {value: 'hafe', label: 'Harpers Ferry National Historical Park'},
  {value: 'hart', label: 'Harriet Tubman National Historical Park'},
  {
    value: 'hatu',
    label: 'Harriet Tubman Underground Railroad National Historical Park',
  },
  {value: 'hstr', label: 'Harry S Truman National Historic Site'},
  {value: 'havo', label: 'Hawaiʻi Volcanoes National Park'},
  {value: 'heho', label: 'Herbert Hoover National Historic Site'},
  {
    value: 'jame',
    label: 'Historic Jamestowne Part of Colonial National Historical Park',
  },
  {
    value: 'hofr',
    label: 'Home Of Franklin D Roosevelt National Historic Site',
  },
  {value: 'home', label: 'Homestead National Historical Park'},
  {value: 'hono', label: 'Honouliuli National Historic Site'},
  {value: 'hocu', label: 'Hopewell Culture National Historical Park'},
  {value: 'hofu', label: 'Hopewell Furnace National Historic Site'},
  {value: 'hobe', label: 'Horseshoe Bend National Military Park'},
  {value: 'hosp', label: 'Hot Springs National Park'},
  {value: 'hove', label: 'Hovenweep National Monument'},
  {value: 'hutr', label: 'Hubbell Trading Post National Historic Site'},
  {value: 'iafl', label: 'Ice Age Floods National Geologic Trail'},
  {value: 'iatr', label: 'Ice Age National Scenic Trail'},
  {value: 'inde', label: 'Independence National Historical Park'},
  {value: 'indu', label: 'Indiana Dunes National Park'},
  {value: 'isro', label: 'Isle Royale National Park'},
  {value: 'inup', label: 'Iñupiat Heritage Center'},
  {value: 'jaga', label: 'James A Garfield National Historic Site'},
  {
    value: 'jela',
    label: 'Jean Lafitte National Historical Park and Preserve',
  },
  {value: 'jeca', label: 'Jewel Cave National Monument'},
  {value: 'jica', label: 'Jimmy Carter National Historical Park'},
  {value: 'joda', label: 'John Day Fossil Beds National Monument'},
  {
    value: 'jofi',
    label: 'John Fitzgerald Kennedy National Historic Site',
  },
  {value: 'jomu', label: 'John Muir National Historic Site'},
  {value: 'jofl', label: 'Johnstown Flood National Memorial'},
  {value: 'jotr', label: 'Joshua Tree National Park'},
  {value: 'juba', label: 'Juan Bautista de Anza National Historic Trail'},
  {value: 'kala', label: 'Kalaupapa National Historical Park'},
  {value: 'kaho', label: 'Kaloko-Honokōhau National Historical Park'},
  {value: 'kaww', label: 'Katahdin Woods and Waters National Monument'},
  {value: 'katm', label: 'Katmai National Park & Preserve'},
  {value: 'kefj', label: 'Kenai Fjords National Park'},
  {value: 'keaq', label: 'Kenilworth Park & Aquatic Gardens'},
  {value: 'kemo', label: 'Kennesaw Mountain National Battlefield Park'},
  {value: 'kewe', label: 'Keweenaw National Historical Park'},
  {value: 'kimo', label: 'Kings Mountain National Military Park'},
  {
    value: 'klse',
    label: 'Klondike Gold Rush - Seattle Unit National Historical Park',
  },
  {value: 'klgo', label: 'Klondike Gold Rush National Historical Park'},
  {
    value: 'knri',
    label: 'Knife River Indian Villages National Historic Site',
  },
  {value: 'kova', label: 'Kobuk Valley National Park'},
  {value: 'kowa', label: 'Korean War Veterans Memorial'},
  {value: 'lyba', label: 'LBJ Memorial Grove on the Potomac'},
  {value: 'lacl', label: 'Lake Clark National Park & Preserve'},
  {value: 'lake', label: 'Lake Mead National Recreation Area'},
  {value: 'lamr', label: 'Lake Meredith National Recreation Area'},
  {value: 'laro', label: 'Lake Roosevelt National Recreation Area'},
  {value: 'lavo', label: 'Lassen Volcanic National Park'},
  {value: 'labe', label: 'Lava Beds National Monument'},
  {value: 'lecl', label: 'Lewis & Clark National Historic Trail'},
  {value: 'lewi', label: 'Lewis and Clark National Historical Park'},
  {value: 'libo', label: 'Lincoln Boyhood National Memorial'},
  {value: 'liho', label: 'Lincoln Home National Historic Site'},
  {value: 'linc', label: 'Lincoln Memorial'},
  {value: 'libi', label: 'Little Bighorn Battlefield National Monument'},
  {value: 'liri', label: 'Little River Canyon National Preserve'},
  {
    value: 'chsc',
    label: 'Little Rock Central High School National Historic Site',
  },
  {
    value: 'long',
    label: "Longfellow House Washington's Headquarters National Historic Site",
  },
  {value: 'lowe', label: 'Lowell National Historical Park'},
  {value: 'lode', label: 'Lower Delaware National Wild and Scenic River'},
  {
    value: 'loea',
    label: 'Lower East Side Tenement Museum National Historic Site',
  },
  {value: 'lyjo', label: 'Lyndon B Johnson National Historical Park'},
  {value: 'mawa', label: 'Maggie L Walker National Historic Site'},
  {value: 'maac', label: 'Maine Acadian Culture'},
  {value: 'maca', label: 'Mammoth Cave National Park'},
  {value: 'mana', label: 'Manassas National Battlefield Park'},
  {value: 'mapr', label: 'Manhattan Project National Historical Park'},
  {value: 'manz', label: 'Manzanar National Historic Site'},
  {
    value: 'mabi',
    label: 'Marsh - Billings - Rockefeller National Historical Park',
  },
  {value: 'mlkm', label: 'Martin Luther King, Jr. Memorial'},
  {
    value: 'malu',
    label: 'Martin Luther King, Jr. National Historical Park',
  },
  {value: 'mava', label: 'Martin Van Buren National Historic Site'},
  {
    value: 'mamc',
    label: 'Mary McLeod Bethune Council House National Historic Site',
  },
  {
    value: 'memy',
    label: 'Medgar and Myrlie Evers Home National Monument',
  },
  {value: 'meve', label: 'Mesa Verde National Park'},
  {value: 'misp', label: 'Mill Springs Battlefield National Monument'},
  {value: 'miin', label: 'Minidoka National Historic Site'},
  {value: 'mima', label: 'Minute Man National Historical Park'},
  {value: 'mimi', label: 'Minuteman Missile National Historic Site'},
  {
    value: 'miss',
    label: 'Mississippi National River and Recreation Area',
  },
  {value: 'mnrr', label: 'Missouri National Recreational River'},
  {value: 'moja', label: 'Mojave National Preserve'},
  {value: 'mono', label: 'Monocacy National Battlefield'},
  {value: 'moca', label: 'Montezuma Castle National Monument'},
  {value: 'mocr', label: 'Moores Creek National Battlefield'},
  {value: 'mopi', label: 'Mormon Pioneer National Historic Trail'},
  {value: 'morr', label: 'Morristown National Historical Park'},
  {value: 'mora', label: 'Mount Rainier National Park'},
  {value: 'moru', label: 'Mount Rushmore National Memorial'},
  {value: 'muwo', label: 'Muir Woods National Monument'},
  {value: 'natc', label: 'Natchez National Historical Park'},
  {value: 'natt', label: 'Natchez Trace National Scenic Trail'},
  {value: 'natr', label: 'Natchez Trace Parkway'},
  {value: 'nace', label: 'National Capital Parks-East'},
  {value: 'nama', label: 'National Mall and Memorial Parks'},
  {value: 'npsa', label: 'National Park of American Samoa'},
  {value: 'npnh', label: 'National Parks of New York Harbor'},
  {value: 'nabr', label: 'Natural Bridges National Monument'},
  {value: 'nava', label: 'Navajo National Monument'},
  {value: 'nebe', label: 'New Bedford Whaling National Historical Park'},
  {value: 'neen', label: 'New England National Scenic Trail'},
  {value: 'pine', label: 'New Jersey Pinelands National Reserve'},
  {value: 'jazz', label: 'New Orleans Jazz National Historical Park'},
  {value: 'neri', label: 'New River Gorge National Park and Preserve'},
  {value: 'nepe', label: 'Nez Perce National Historical Park'},
  {value: 'nico', label: 'Nicodemus National Historic Site'},
  {value: 'nisi', label: 'Ninety Six National Historic Site'},
  {value: 'niob', label: 'Niobrara National Scenic River'},
  {value: 'noat', label: 'Noatak National Preserve'},
  {value: 'noca', label: 'North Cascades National Park'},
  {value: 'noco', label: 'North Country National Scenic Trail'},
  {value: 'obed', label: 'Obed Wild & Scenic River'},
  {value: 'ocmu', label: 'Ocmulgee Mounds National Historical Park'},
  {value: 'okci', label: 'Oklahoma City National Memorial'},
  {value: 'olsp', label: 'Old Spanish National Historic Trail'},
  {value: 'olym', label: 'Olympic National Park'},
  {value: 'orca', label: 'Oregon Caves National Monument & Preserve'},
  {value: 'oreg', label: 'Oregon National Historic Trail'},
  {value: 'orpi', label: 'Organ Pipe Cactus National Monument'},
  {value: 'ovvi', label: 'Overmountain Victory National Historic Trail'},
  {value: 'oxhi', label: 'Oxon Cove Park & Oxon Hill Farm'},
  {value: 'ozar', label: 'Ozark National Scenic Riverways'},
  {value: 'pais', label: 'Padre Island National Seashore'},
  {
    value: 'paal',
    label: 'Palo Alto Battlefield National Historical Park',
  },
  {value: 'pagr', label: 'Paterson Great Falls National Historical Park'},
  {value: 'peri', label: 'Pea Ridge National Military Park'},
  {value: 'valr', label: 'Pearl Harbor National Memorial'},
  {value: 'peco', label: 'Pecos National Historical Park'},
  {value: 'paav', label: 'Pennsylvania Avenue'},
  {
    value: 'pevi',
    label: "Perry's Victory & International Peace Memorial",
  },
  {value: 'pete', label: 'Petersburg National Battlefield'},
  {value: 'pefo', label: 'Petrified Forest National Park'},
  {value: 'petr', label: 'Petroglyph National Monument'},
  {value: 'piro', label: 'Pictured Rocks National Lakeshore'},
  {value: 'pinn', label: 'Pinnacles National Park'},
  {value: 'pisp', label: 'Pipe Spring National Monument'},
  {value: 'pipe', label: 'Pipestone National Monument'},
  {value: 'pisc', label: 'Piscataway Park'},
  {value: 'pore', label: 'Point Reyes National Seashore'},
  {value: 'poex', label: 'Pony Express National Historic Trail'},
  {value: 'poch', label: 'Port Chicago Naval Magazine National Memorial'},
  {value: 'pohe', label: 'Potomac Heritage National Scenic Trail'},
  {value: 'popo', label: 'Poverty Point National Monument'},
  {
    value: 'wicl',
    label:
      'President William Jefferson Clinton Birthplace Home National Historic Site',
  },
  {value: 'whho', label: "President's Park (White House)"},
  {value: 'prsf', label: 'Presidio of San Francisco'},
  {value: 'prwi', label: 'Prince William Forest Park'},
  {value: 'pull', label: 'Pullman National Monument'},
  {value: 'puho', label: 'Puʻuhonua o Hōnaunau National Historical Park'},
  {value: 'puhe', label: 'Puʻukoholā Heiau National Historic Site'},
  {value: 'rabr', label: 'Rainbow Bridge National Monument'},
  {value: 'reer', label: 'Reconstruction Era National Historical Park'},
  {value: 'redw', label: 'Redwood National and State Parks'},
  {value: 'rich', label: 'Richmond National Battlefield Park'},
  {value: 'rigr', label: 'Rio Grande Wild & Scenic River'},
  {value: 'rira', label: 'River Raisin National Battlefield Park'},
  {value: 'rocr', label: 'Rock Creek Park'},
  {value: 'romo', label: 'Rocky Mountain National Park'},
  {value: 'rowi', label: 'Roger Williams National Memorial'},
  {value: 'roca', label: 'Roosevelt Campobello International Park'},
  {
    value: 'rori',
    label: 'Rosie the Riveter WWII Home Front National Historical Park',
  },
  {value: 'ruca', label: 'Russell Cave National Monument'},
  {value: 'sahi', label: 'Sagamore Hill National Historic Site'},
  {value: 'sagu', label: 'Saguaro National Park'},
  {
    value: 'sacr',
    label: 'Saint Croix Island International Historic Site',
  },
  {value: 'sacn', label: 'Saint Croix National Scenic Riverway'},
  {value: 'sapa', label: "Saint Paul's Church National Historic Site"},
  {value: 'saga', label: 'Saint-Gaudens National Historical Park'},
  {value: 'sama', label: 'Salem Maritime National Historic Site'},
  {value: 'sapu', label: 'Salinas Pueblo Missions National Monument'},
  {
    value: 'sari',
    label: 'Salt River Bay National Historical Park and Ecological Preserve',
  },
  {value: 'saan', label: 'San Antonio Missions National Historical Park'},
  {
    value: 'safr',
    label: 'San Francisco Maritime National Historical Park',
  },
  {value: 'sajh', label: 'San Juan Island National Historical Park'},
  {value: 'saju', label: 'San Juan National Historic Site'},
  {value: 'sand', label: 'Sand Creek Massacre National Historic Site'},
  {value: 'safe', label: 'Santa Fe National Historic Trail'},
  {
    value: 'samo',
    label: 'Santa Monica Mountains National Recreation Area',
  },
  {value: 'sara', label: 'Saratoga National Historical Park'},
  {value: 'sair', label: 'Saugus Iron Works National Historic Site'},
  {value: 'scbl', label: 'Scotts Bluff National Monument'},
  {value: 'semo', label: 'Selma To Montgomery National Historic Trail'},
  {value: 'seki', label: 'Sequoia & Kings Canyon National Parks'},
  {value: 'shen', label: 'Shenandoah National Park'},
  {value: 'shil', label: 'Shiloh National Military Park'},
  {value: 'sitk', label: 'Sitka National Historical Park'},
  {value: 'slbe', label: 'Sleeping Bear Dunes National Lakeshore'},
  {value: 'spar', label: 'Springfield Armory National Historic Site'},
  {value: 'stsp', label: 'Star-Spangled Banner National Historic Trail'},
  {value: 'stli', label: 'Statue Of Liberty National Monument'},
  {value: 'stge', label: 'Ste. Geneviève National Historical Park'},
  {value: 'stea', label: 'Steamtown National Historic Site'},
  {value: 'stri', label: 'Stones River National Battlefield'},
  {value: 'sucr', label: 'Sunset Crater Volcano National Monument'},
  {value: 'tapr', label: 'Tallgrass Prairie National Preserve'},
  {value: 'thko', label: 'Thaddeus Kosciuszko National Memorial'},
  {
    value: 'thrb',
    label: 'Theodore Roosevelt Birthplace National Historic Site',
  },
  {
    value: 'thri',
    label: 'Theodore Roosevelt Inaugural National Historic Site',
  },
  {value: 'this', label: 'Theodore Roosevelt Island'},
  {value: 'thro', label: 'Theodore Roosevelt National Park'},
  {value: 'thco', label: 'Thomas Cole National Historic Site'},
  {value: 'edis', label: 'Thomas Edison National Historical Park'},
  {value: 'thje', label: 'Thomas Jefferson Memorial'},
  {value: 'thst', label: 'Thomas Stone National Historic Site'},
  {value: 'tica', label: 'Timpanogos Cave National Monument'},
  {value: 'timu', label: 'Timucuan Ecological & Historic Preserve'},
  {value: 'tont', label: 'Tonto National Monument'},
  {value: 'tosy', label: 'Touro Synagogue National Historic Site'},
  {value: 'trte', label: 'Trail Of Tears National Historic Trail'},
  {value: 'tule', label: 'Tule Lake National Monument'},
  {value: 'tusk', label: 'Tule Springs Fossil Beds National Monument'},
  {value: 'tuma', label: 'Tumacácori National Historical Park'},
  {value: 'tupe', label: 'Tupelo National Battlefield'},
  {value: 'tuai', label: 'Tuskegee Airmen National Historic Site'},
  {value: 'tuin', label: 'Tuskegee Institute National Historic Site'},
  {value: 'tuzi', label: 'Tuzigoot National Monument'},
  {value: 'ulsg', label: 'Ulysses S Grant National Historic Site'},
  {value: 'upde', label: 'Upper Delaware Scenic & Recreational River'},
  {value: 'vall', label: 'Valles Caldera National Preserve'},
  {value: 'vafo', label: 'Valley Forge National Historical Park'},
  {value: 'vama', label: 'Vanderbilt Mansion National Historic Site'},
  {value: 'vick', label: 'Vicksburg National Military Park'},
  {value: 'vive', label: 'Vietnam Veterans Memorial'},
  {value: 'vicr', label: 'Virgin Islands Coral Reef National Monument'},
  {value: 'viis', label: 'Virgin Islands National Park'},
  {value: 'voya', label: 'Voyageurs National Park'},
  {value: 'waco', label: 'Waco Mammoth National Monument'},
  {value: 'waca', label: 'Walnut Canyon National Monument'},
  {value: 'wapa', label: 'War In The Pacific National Historical Park'},
  {value: 'wamo', label: 'Washington Monument'},
  {
    value: 'waro',
    label: 'Washington-Rochambeau Revolutionary Route National Historic Trail',
  },
  {value: 'waba', label: 'Washita Battlefield National Historic Site'},
  {value: 'wefa', label: 'Weir Farm National Historical Park'},
  {value: 'whis', label: 'Whiskeytown National Recreation Area'},
  {value: 'whsa', label: 'White Sands National Park'},
  {value: 'whmi', label: 'Whitman Mission National Historic Site'},
  {value: 'wiho', label: 'William Howard Taft National Historic Site'},
  {value: 'wicr', label: "Wilson's Creek National Battlefield"},
  {value: 'wica', label: 'Wind Cave National Park'},
  {value: 'wing', label: 'Wing Luke Museum Affiliated Area'},
  {
    value: 'wotr',
    label: 'Wolf Trap National Park for the Performing Arts',
  },
  {value: 'wori', label: "Women's Rights National Historical Park"},
  {value: 'wwim', label: 'World War I Memorial'},
  {value: 'wwii', label: 'World War II Memorial'},
  {value: 'wrst', label: 'Wrangell - St Elias National Park & Preserve'},
  {value: 'wrbr', label: 'Wright Brothers National Memorial'},
  {value: 'wupa', label: 'Wupatki National Monument'},
  {value: 'yell', label: 'Yellowstone National Park'},
  {
    value: 'york',
    label: 'Yorktown Battlefield Part of Colonial National Historical Park',
  },
  {value: 'yose', label: 'Yosemite National Park'},
  {value: 'yuho', label: 'Yucca House National Monument'},
  {value: 'yuch', label: 'Yukon - Charley Rivers National Preserve'},
  {value: 'zion', label: 'Zion National Park'},
]

export default function SearchBar() {
  const [tab, setTab] = useState('name')
  const [selectedPark, setselectedPark] = useState('')
  const [selectedState, setselectedState] = useState(null)
  const [selectedActivity, setselectedActivity] = useState(null)
  const [selectedTopic, setselectedTopic] = useState(null)

  console.log(selectedPark)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('prevent default')
  }

  const searchStyles = {
    option: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      background: state.isFocused ? '#bbf7d0' : 'white',
      color: 'black',
    }),

    indicatorSeparator: (provided) => ({
      ...provided,
      background: 'darkgray',
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'darkgray',
    }),

    control: (provided) => ({
      ...provided,
      padding: '5px 10px',
      display: 'flex',
      background: '#eaeaea',
      borderRadius: '10px',
    }),
  }
  const dropdownStyles = {
    option: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      background: state.isFocused ? '#bbf7d0' : 'white',
      color: 'black',
    }),

    indicatorSeparator: (provided) => ({
      ...provided,
      background: 'darkgray',
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'darkgray',
    }),

    control: (provided) => ({
      ...provided,
      padding: '5px 10px',
      display: 'flex',
      background: '#eaeaea',
      // borderRadius: '10px',
    }),

    multiValueLabel: (provided) => ({
      ...provided,
      background: '#eaeaea',
    }),
  }

  const tabStyles = {
    active:
      'bg-green-600 text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none',
    inActive:
      'bg-green-200 text-green-500 hover:shadow-md hover:shadow-green-200 hover:-translate-y-1 hover:border-2 hover:border-green-700 hover:text-green-700',
  }

  return (
    <div className="p-8 pt-4 bg-white border-2 border-gray-200 rounded-3xl">
      {/* Nav Buttons */}
      <div className="pb-8 border-b-2 border-gray-200">
        <span className="block mb-4 text-xs tracking-widest text-center text-gray-400 uppercase">
          Search by
        </span>
        <div className="flex justify-center gap-10">
          <button
            onClick={() => setTab('name')}
            className={`transition-all px-6 py-3 text-lg rounded-xl text-md w-40 font-bold border-transparent border-2 ${
              tab == 'name' ? tabStyles.active : tabStyles.inActive
            }`}>
            Park Name
          </button>
          <button
            onClick={() => setTab('filter')}
            className={`transition-all px-6 py-3 text-lg rounded-xl text-md w-40 font-bold border-transparent border-2 ${
              tab == 'filter' ? tabStyles.active : tabStyles.inActive
            }`}>
            Filters
          </button>
        </div>
      </div>
      {/* Input and filters */}
      {tab == 'name' && (
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-between">
            <label className="block mb-4 text-xs tracking-widest text-gray-400 uppercase">
              Park Name
            </label>
            <div className="flex items-center justify-between gap-5">
              <Select
                options={parks}
                defaultValue={selectedPark}
                onChange={setselectedPark}
                id="parks"
                className="w-full cursor-text"
                styles={searchStyles}
              />
              <button
                type="submit"
                className="self-end px-12 py-3 text-white bg-green-700 rounded-full h-min focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
                Search
              </button>
            </div>
          </div>
        </form>
      )}
      {tab == 'filter' && (
        <form className="mt-8">
          <div className="flex w-full gap-5">
            <div className="flex flex-col w-full gap-4">
              <label className="block text-xs tracking-widest text-gray-400 uppercase">
                State
              </label>
              <Select
                options={states}
                defaultValue={selectedState}
                onChange={setselectedState}
                styles={dropdownStyles}
                id="states"
                isMulti
              />
            </div>
            <div className="flex flex-col w-full gap-4">
              <label className="block text-xs tracking-widest text-gray-400 uppercase">
                Activity
              </label>
              <Select
                options={activities}
                defaultValue={selectedActivity}
                onChange={setselectedActivity}
                styles={dropdownStyles}
                id="activity"
                isMulti
              />
            </div>
            <div className="flex flex-col w-full gap-4">
              <label className="block text-xs tracking-widest text-gray-400 uppercase">
                Topic
              </label>
              <Select
                options={topics}
                defaultValue={selectedTopic}
                onChange={setselectedTopic}
                styles={dropdownStyles}
                id="topic"
                isMulti
              />
            </div>
            <button
              type="submit"
              className="self-end px-12 py-3 text-white bg-green-700 rounded-full h-min focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-500 focus:transition-none">
              Search
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
