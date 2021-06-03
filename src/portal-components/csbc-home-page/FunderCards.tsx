import * as React from 'react'
import { ReactComponent as CSBCIconSvg } from './assets/csbc.svg'
import { ReactComponent as PSONIconSvg } from './assets/pson.svg'
import Layout from 'portal-components/Layout'

const cards = [
  {
    icon: CSBCIconSvg,
    text:
      'The CSBC initiative supports research that investigates the challenges of complexity in basic and translational cancer research through the explicit combination of experimental biology and computational modeling, multi-dimensional data analysis, and systems engineering.',
    link: 'https://csbconsortium.org/',
  },
  {
    icon: PSONIconSvg,
    text:
      'This initiative seeks to establish research projects that bring together cancer biologists and oncologists with scientists from the fields of physics, mathematics, chemistry, and engineering to address some of the major questions and barriers in cancer research',
    link: 'https://physics.cancer.gov/',
  },
]

const FunderCards = () => {
  return (
    <Layout>
      <div className="FunderCards">
        {cards.map((el, index) => {
          const Icon = el.icon
          return (
            <div key={index} className="FunderCards__funder">
              <div className="FunderCards__icon">
                <Icon />
              </div>
              <div className="FunderCards__text-container">
                <p className="FunderCards__text">{el.text}</p>
                <a className="FunderCards__link" href={el.link} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default FunderCards
