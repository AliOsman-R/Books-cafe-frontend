import React, { useEffect, useState } from 'react'
import { httpRequest } from '../../../utils/httpsRequest';
import ListComponent from '../../../components/ListComponent';
import ItemCard from '../../../components/cards/ItemCard';

const Menu = ({cafe, id}) => {
const [menu, setMenu] = useState([])
const [filteredMenu, setFilteredMenu] = useState([])
const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true)
    httpRequest.get(`/menu/cafe-menu/${id}`)
    .then(({data}) => {
      console.log(data)
      setMenu(data.menu)
      setFilteredMenu(data.menu)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {setPageLoading(false)})
  }, []) 

  return (
    <ListComponent
      cafe={cafe}
      type={'menu'}
      items={menu}
      filteredItems={filteredMenu}
      setFilteredItems={setFilteredMenu}
      pageLoading={pageLoading}
      CardComponent={ItemCard}
    />
  );
}

export default Menu