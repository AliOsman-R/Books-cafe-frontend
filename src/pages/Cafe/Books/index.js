import React, { useEffect } from 'react'
import { useState } from 'react';
import { httpRequest } from '../../../utils/httpsRequest';
import ListComponent from '../../../components/ListComponent';
import ItemCard from '../../../components/cards/ItemCard';

const Books = ({cafe, id}) => {
const [books, setBooks] = useState([])
const [filteredBooks, setFilteredBooks] = useState([])
const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true)
    httpRequest.get(`/books/cafe-books/${id}`)
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

  return (
    <ListComponent
      cafe={cafe}
      type={'books'}
      items={books}
      filteredItems={filteredBooks}
      setFilteredItems={setFilteredBooks}
      pageLoading={pageLoading}
      CardComponent={ItemCard}
    />
  );
}

export default Books