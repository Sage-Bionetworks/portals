import React, { useState, useEffect } from 'react'
import moment from 'moment'
import './Versions.scss'

const Versions: React.FunctionComponent = () => {
  const [buildDate, setBuildDate] = useState<string>()

  useEffect(() => {
    let isCancelled: boolean = false
    const getBuildDate = async () => {
      try {
        fetch('/build-date.txt').then(v => {
          v.text().then(txt => {
            if (!isCancelled) {
              // making this date look like a version number so people don't think it reflects all content on the page,
              // since much of it is live!
              setBuildDate(moment(txt).format('MM_DD_YYYY_h:mma'))
            }
          })
        })

      } catch (err) {
        if (!isCancelled) {
          setBuildDate('Error retrieving build info')
        }
      }
    }
    getBuildDate()
    return () => {
      isCancelled = true
    }
  })
  return (
    <>
      {buildDate &&
        <a className='Versions footer-item' target='_blank' rel='noopener noreferrer' href='https://github.com/Sage-Bionetworks/portals'>VERSION: {buildDate}</a>
      }
    </>
  )
}

export default Versions