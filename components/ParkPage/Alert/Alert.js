import {useState} from 'react'
import InfoModal from '../../InfoModal/Modal'
import useModal from '../../../hooks/useModal'
import {GoAlert} from 'react-icons/go'

export default function Alert({alerts}) {
  const {modalOpen, close, open} = useModal()

  const [alertStatus, setAlertStatus] = useState(true)

  return (
    <>
      {alertStatus && (
        <div className="flex items-center justify-between px-4 py-2 mb-4 text-white bg-red-500 rounded-md ">
          <h2 className="flex items-between" onClick={() => open()}>
            <span className="flex items-center gap-2 font-bold cursor-pointer">
              <GoAlert /> Alert: {alerts[0]?.title}
            </span>{' '}
            –{' '}
            <span className="whitespace-nowrap inline-block max-w-[85ch] overflow-hidden text-ellipsis">
              {alerts[0]?.description}
            </span>
          </h2>
          <button onClick={() => setAlertStatus(false)}>X</button>
        </div>
      )}
      {modalOpen && (
        <InfoModal modalOpen={modalOpen} handleClose={close} alerts={alerts} />
      )}
    </>
  )
}
