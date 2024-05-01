import React, { useEffect, useState } from 'react'
import { httpRequest } from '../../../utils/httpsRequest';
import { sortEvents } from '../../../utils/AppUtils';
import ListComponent from '../../../components/ListComponent';
import ItemCard from '../../../components/cards/ItemCard';

const Events = ({cafe, id}) => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true)
    httpRequest.get(`/events/cafe-events/${id}`)
    .then(({data}) => {
      console.log(data)
      const sortedEvents = sortEvents(data.events)
      setEvents(sortedEvents)
      setFilteredEvents(sortedEvents)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {setPageLoading(false)})
  }, [])  

  return (
    <ListComponent
      cafe={cafe}
      items={events}
      filteredItems={filteredEvents}
      setFilteredItems={setFilteredEvents}
      pageLoading={pageLoading}
      CardComponent={ItemCard}
      type={'event'}
    />
  );
}

export default Events