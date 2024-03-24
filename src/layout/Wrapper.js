import React from 'react'
import Header from './Header'
import Footer from './Footer'
import GlobalContext from '../context/GlobalContext'
import { Context } from '../context/GlobalContext'
import ProtectedRoutes from './ProtectedRoutes'
import { AppLoader } from '../components/LoaderSpinner'
import  { Toaster } from 'sonner';



function Wrapper({children}) {
  const store = GlobalContext()

  return (
    <Context.Provider value={store}>
      <div>
          <Toaster position="top-center"  duration='4000' richColors/>
          <Header/>
          {store.loading? 
            <div className='min-h-screen flex justify-center items-center'>
              <AppLoader/>
            </div>
            :
            <>
              <ProtectedRoutes>
                <div className='min-h-screen bg-gray-100'>
                  {children}
                </div>
              </ProtectedRoutes>
            </>}
          <Footer/>
      </div>
    </Context.Provider>
  )
}

export default Wrapper