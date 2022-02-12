import React from 'react'

export default function Layout({children, fullWidth}) {
  console.log(fullWidth)
  return (
    <main
      className={`m-auto pb-36 px-5 xl:px-0 lg:mb-12 ${
        fullWidth ? 'md:max-w-[95vw]' : 'max-w-[1200px] '
      }`}>
      {children}
    </main>
  )
}
