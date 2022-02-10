import React from 'react'

export default function Layout({children}) {
  return (
    <main className="max-w-[1200px] m-auto pb-36 px-5 xl:px-0 lg:mb-12">
      {children}
    </main>
  )
}
