import React, { useEffect, useState } from 'react'
import Filter from '../../../components/Filter';
import Search from '../../../components/Search';
import MenuCard from '../../../components/MenuCard';
import { httpRequest } from '../../../utils/httpsRequest';
import { AppLoader } from '../../../components/LoaderSpinner';
import Sorting from '../../../components/Sorting';

// {
//   _id: 1,
//   name: "Grilled Chicken Sandwich",
//   isCountable: true,
//   type: "Sandwich",
//   price: 8.99,
//   averageRating:4.5,
//   description: "Juicy grilled chicken breast topped with lettuce, tomato, and mayo on a toasted bun. sabdjkasdjasdnkjsndkjskjdnjsdnkjasndksajdnksjdnsadksdksadljaskdslnkd",
//   ingredients: ["Grilled chicken breast", "Lettuce", "Tomato", "Mayo", "Toasted bun"],
//   stock: 0,
//   images: [{ url: "https://picsum.photos/400/300?random=1" }]
// },
// {
//   _id: 2,
//   name: "Margherita Pizza",
//   isCountable: true,
//   type: "Pizza",
//   price: 12.99,
//   averageRating:5,
//   description: "Classic pizza topped with tomato sauce, fresh mozzarella cheese, and basil leaves.",
//   ingredients: ["Tomato sauce", "Fresh mozzarella cheese", "Basil leaves"],
//   stock: 5,
//   images: [{ url: "https://picsum.photos/400/300?random=2" }]
// },
// {
//   _id: 3,
//   name: "Iced Caramel Macchiato",
//   isCountable: false,
//   status:"Not Available",
//   type: "Beverage",
//   price: 4.49,
//   averageRating:3,
//   description: "Rich espresso combined with creamy milk and sweet caramel syrup, served over ice.",
//   ingredients: ["Espresso", "Milk", "Caramel syrup", "Ice"],
//   images: [{ url: "https://picsum.photos/400/300?random=3" }]
// },
// ];

const Menu = ({cafe}) => {
  const [menu, setMenu] = useState([])
const [filteredMenu, setFilteredMenu] = useState([])
const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true)
    httpRequest.get(`/menu/cafe-menu/${cafe._id}`)
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


  const handleSearch = (e, setSearchQuery) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredData = menu.filter(menuItem =>
        menuItem.name.toLowerCase().includes(query.toLowerCase()) ||
        menuItem.type.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMenu(filteredData);
  };

  if(pageLoading)  {
    return (
        <div className="flex justify-center items-center h-[50vh]">
            <AppLoader/>
        </div>
    )
  }   

  return (
    <div className="flex flex-col gap-2">
      <div className='flex justify-between items-center'>
        <div className='w-[25%]'>
          <Sorting context="menu" menu={menu} setData={setFilteredMenu}/>
        </div>
        <Search handleSearch={handleSearch} />
      </div>
    <div className="flex flex-grow ">
      <div className="ssm:hidden md:flex">
        <Filter/>
      </div>
      <div className="flex-1 flex flex-wrap justify-center">
        {filteredMenu.map(menuItem => (
          <MenuCard key={menuItem.id} menuItem={menuItem} cafe={cafe} />
        ))}
      </div>
    </div>
    </div>
  );
}

export default Menu