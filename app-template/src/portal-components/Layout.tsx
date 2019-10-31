import * as React from 'react'

const Layout = ({
  children,
  containerClassName = '',
}: {
  children: any
  containerClassName?: string
}) => {
  return (
    <div
      className={`container-fluid ${containerClassName && containerClassName}`}
    >
      <div className="row">
        <div className="col-md-offset-1 col-md-10">{children}</div>
      </div>
    </div>
  )
}

export default Layout
