import * as React from 'react'
import { ReactComponent as ConsortiaGoalsSvg } from './assets/goals-icon.svg'
import HomePageLinks from './HomePageLinks'
import Layout from 'portal-components/Layout'

const ConsortiaGoals = () => {
  return (
    <div className="ConsortiaGoals">
      <Layout>
        <h2>Consortia Activity</h2>
        <div>
          <ConsortiaGoalsSvg id="goals-icon" />
          <HomePageLinks />
        </div>
      </Layout>
    </div>
  )
}

export default ConsortiaGoals
