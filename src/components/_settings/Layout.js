import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div className=' flex flex-col'>
     <Header/>

        <div className=' flex '>
                {/* left */}
                <Sidebar/>

                {/* right */}
                <div>
                    {children}
                </div>


        </div>






    </div>
  )
}

export default Layout