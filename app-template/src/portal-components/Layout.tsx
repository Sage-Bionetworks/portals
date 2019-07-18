import * as React from 'react'

const Layout = ({ children }: { children: any }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-offset-1 col-md-10">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
