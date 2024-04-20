import React, { useContext, useEffect, useState } from 'react'
import { AppLoader } from '../../../../components/LoaderSpinner'
import { httpRequest } from '../../../../utils/httpsRequest'
import { Context } from '../../../../context/GlobalContext'
import Search from '../../../../components/Search'
import Pagination from '../../../../components/Pagination'
import { setPagination } from '../../../../utils/AppUtils'
import { toast } from 'sonner'
import MenuCard from '../../../../components/MenuCard'
import { menuInitialState } from '../../../../data/initialStates'
import AddMenuItem from './AddMenuItem'
import Sorting from '../../../../components/Sorting'
import EditMenuItem from './EditMenuItem'

const MenuList = () => {
  const [menu, setMenu] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(6);
  const [openModal, setOpenModal] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [menuItemData, setMenuItemData] = useState(menuInitialState);
  const [originalMenuData, setOriginalMenuData] = useState(menuInitialState);
  const [filteredMenu, setFilteredMenu] = useState([])
  const {user} = useContext(Context)

  useEffect(() => {
    setPageLoading(true)
    httpRequest.get(`/menu/user-menu/${user._id}`)
    .then(({data}) => {
      console.log(data)
      setMenu(data.menu)
      setFilteredMenu(data.menu)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {setPageLoading(false)})
  }, [])

  useEffect(() => {
    setFilteredMenu(menu)
  }, [menu])

 
  const handleSearch = (e, setSearchQuery) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredData = menu.filter(menuItem =>
        menuItem.name.toLowerCase().includes(query.toLowerCase()) ||
        menuItem.type.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMenu(filteredData);
  };

  const handleDelete = (menuItem) => {
    setDeleteLoading(true)
    httpRequest.delete(`/menu/${menuItem._id}`)
    .then(({data}) => {
      console.log(data)
      toast.success(data.message)
      setMenu(prev=> prev.filter(mItem => mItem._id !== menuItem._id))
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {setDeleteLoading(false)})

  }
  
  if(pageLoading)  {
    return (
        <div className="flex justify-center items-center h-[50vh]">
            <AppLoader/>
        </div>
    )
  }   

  return (
    <div>
        <div className="flex justify-between">
          <Search handleSearch={handleSearch} />
          <AddMenuItem setMenu={setMenu}/>
        </div>
        <div className='w-[25%]'>
          <Sorting context="menu" menu={menu} setData={setFilteredMenu}/>
        </div>
        <div className="flex flex-wrap justify-center mt-10 min-h-[1114px]">
          {filteredMenu.length === 0 && (
            <div className="flex justify-center items-center h-[50vh]">
              No menu available please add menu item
            </div>
          )}
          {setPagination(recordsPerPage, currentPage, filteredMenu)?.map(menuItem =>(
            <MenuCard 
            key={menuItem._id} 
            menuItem={menuItem}
            isManage={true} 
            setOpenModal={setOpenModal} 
            handleDelete={handleDelete}
            setMenuItemData={setMenuItemData}
            setOriginalMenuData={setOriginalMenuData}
            deleteLoading={deleteLoading}
            />
          ))}
        </div>
        <EditMenuItem
         setMenu={setMenu}
         openModal={openModal} 
         setOpenModal={setOpenModal} 
         menuItemData={menuItemData} 
         setMenuItemData={setMenuItemData}
         originalMenuData={originalMenuData}
         />
        <div className="flex justify-center items-center space-x-2 my-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          recordsPerPage={recordsPerPage}
          setRecordsPerPage={setRecordsPerPage}
          data={filteredMenu}
        />
      </div>
    </div>
  )
}

export default MenuList