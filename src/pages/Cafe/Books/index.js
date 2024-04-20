import React, { useEffect } from 'react'
import BookCard from '../../../components/BookCard';
import { useState } from 'react';
import { httpRequest } from '../../../utils/httpsRequest';
import Filter from '../../../components/Filter';
import Search from '../../../components/Search';
import { AppLoader } from '../../../components/LoaderSpinner';
import Sorting from '../../../components/Sorting';

// const books =  [
//   {
//     id: 1,
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald jnasdkjasdjnasjdknasjkdnskjd",
//     genre: "Classic",
//     // price: 10.99,
//     description: "A portrait of the Jazz Age in all of its decadence and excess...",
//     // stock: 5,
//     publishYear: 1925,
//     availability:'Reading',
//     isAvailable:'Available',
//     averageRating:4,
//     images: [{ url: "https://i.etsystatic.com/51060618/r/il/53fc43/5947933559/il_680x540.5947933559_nohe.jpg" }]
//   },
//   {
//     id: 2,
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     genre: "Fiction",
//     price: 8.99,
//     description: "A novel about the roots of human behavior - innocence and experience...",
//     stock: 0,
//     averageRating:2.5,
//     availability:'Selling',
//     publishYear: 1960,
//     images: [{ url: "https://i.etsystatic.com/42261898/r/il/6324f4/5878688462/il_680x540.5878688462_q7zv.jpg" }]
//   },
//   {
//     id: 3,
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     genre: "Fiction",
//     price: 8.99,
//     description: "A novel about the roots of human behavior - innocence and experience...",
//     stock: 0,
//     averageRating:2.5,
//     availability:'Selling',
//     publishYear: 1960,
//     images: [{ url: "https://i.etsystatic.com/42261898/r/il/6324f4/5878688462/il_680x540.5878688462_q7zv.jpg" }]
//   },
// ];

const Books = ({cafe}) => {
const [books, setBooks] = useState([])
const [filteredBooks, setFilteredBooks] = useState([])
const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true)
    httpRequest.get(`/book/cafe-books/${cafe._id}`)
    .then(({data}) => {
      console.log(data)
      setBooks(data.books)
      setFilteredBooks(data.books)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {setPageLoading(false)})
  }, [])

  const handleSearch = (e, setSearchQuery) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredData = books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())||
        book.genre.toLowerCase().includes(query.toLowerCase()) 
    );
    setFilteredBooks(filteredData);
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
          <Sorting context="books" books={books} setData={setFilteredBooks}/>
        </div>
        <Search handleSearch={handleSearch} />
      </div>
      <div className="flex flex-grow">
        <div className="ssm:hidden md:flex">
          <Filter/>
        </div>
        <div className="flex-1 flex flex-wrap justify-center">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} cafe={cafe} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Books