import React from 'react'
import Hero from '../components/Hero'
import FromEmployer from '../components/FromEmployer'
import Joblistings from '../components/Joblistings'
import ViewAllJob from '../components/ViewAllJob'


const Homepage = () => {
  return (
    <>
        <Hero/>
        <FromEmployer/>
        <Joblistings/>
        <ViewAllJob/>

    </>
  )
}

export default Homepage