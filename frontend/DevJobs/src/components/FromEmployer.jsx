import React from 'react'
import { Link } from 'react-router-dom'
import FromEmployerCard from './FromEmployerCard'

const FromEmployer = () => {
  return (
    <section className="py-4">
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">

            <FromEmployerCard/>
            <FromEmployerCard bg={'bg-indigo-100'} heading={"For Employers"} info={'List your job to find the perfect candidate for the role'} btnBg={'bg-indigo-500'} btnTxt={'Add Job'} btnLink={"/add-job"}/>

          </div>
        </div>
      </section>
  )
}

export default FromEmployer