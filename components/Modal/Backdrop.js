const Backdrop = ({children, onClick}) => {
  return (
    <div
      className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-[#000000e1]"
      onClick={onClick}>
      {children}
    </div>
  )
}

export default Backdrop
