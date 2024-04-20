import React, { useContext, useEffect, useState } from 'react'
import { AppLoader } from '../../../../components/LoaderSpinner'
import AddBook from './AddBook'
import { httpRequest } from '../../../../utils/httpsRequest'
import { Context } from '../../../../context/GlobalContext'
import Search from '../../../../components/Search'
import BookCard from '../../../../components/BookCard'
import EditBook from './EditBook'
import { bookInitialState } from '../../../../data/initialStates'
import Pagination from '../../../../components/Pagination'
import { setPagination } from '../../../../utils/AppUtils'
import { toast } from 'sonner'
import Sorting from '../../../../components/Sorting'

const BooksList = () => {
  const [books, setBooks] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(6);
  const [openModal, setOpenModal] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [bookData, setBookData] = useState(bookInitialState);
  const [originalBookData, setOriginalBookData] = useState(bookInitialState);
  const [filteredBooks, setFilteredBooks] = useState([])
  const {user} = useContext(Context)

  useEffect(() => {
    setPageLoading(true)
    httpRequest.get(`/book/user-books/${user._id}`)
    .then(({data}) => {
      console.log(data)
      setBooks(data.books)
      setFilteredBooks(data.books)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {setPageLoading(false)})
  }, [])

  useEffect(() => {
    setFilteredBooks(books)
  }, [books])

 
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

  const handleDelete = (book) => {
    setDeleteLoading(true)
    httpRequest.delete(`/book/${book._id}`)
    .then(({data}) => {
      console.log(data)
      toast.success(data.message)
      setBooks(prev=> prev.filter(bk => bk._id !== book._id))
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
          <AddBook setBooks={setBooks}/>
        </div>
        <div className='w-[25%]'>
          <Sorting context="books" books={books} setData={setFilteredBooks}/>
        </div>
        <div className="flex flex-wrap justify-center mt-10 min-h-[1114px]">
          {filteredBooks.length === 0 && (
            <div className="flex justify-center items-center h-[50vh]">
              No Books available please add books
            </div>
          )}
          {setPagination(recordsPerPage, currentPage, filteredBooks)?.map(book =>(
            <BookCard 
            key={book._id} 
            book={book} 
            isManage={true} 
            setOpenModal={setOpenModal} 
            handleDelete={handleDelete}
            setBookData={setBookData}
            setOriginalBookData={setOriginalBookData}
            deleteLoading={deleteLoading}
            />
          ))}
        </div>
        <EditBook 
         setBooks={setBooks}
         openModal={openModal} 
         setOpenModal={setOpenModal} 
         bookData={bookData} 
         setBookData={setBookData}
         originalBookData={originalBookData}
         />
        <div className="flex justify-center items-center space-x-2 my-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          recordsPerPage={recordsPerPage}
          setRecordsPerPage={setRecordsPerPage}
          data={filteredBooks}
        />
      </div>
    </div>
  )
}

export default BooksList