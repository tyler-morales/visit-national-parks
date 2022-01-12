const Backdrop = ({children, onClick}) => {
  return (
    <div
      className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-screen bg-[#000000e1]"
      onClick={onClick}>
      {children}
    </div>
  )
}

export default Backdrop
