/**
 * FIX:
 * Unused variables here!
 * Verify that they are not nedded before to delete this comment.
 *
 * On imports:
 * import { useContext } from 'react'
 * import { StateContext } from '../contexts'
 *
 * On DashboardPage
 * const { state, dispatch } = useContext(StateContext)
 */
import React from 'react'

import Header from '../components/Header/Header'
import LineAreaGraphic from '../components/LineGraphic/LineGraphic'

const DashboardPage = () => {
  return (
    <>
      <Header />
      <LineAreaGraphic />
    </>
  )
}

export default DashboardPage
