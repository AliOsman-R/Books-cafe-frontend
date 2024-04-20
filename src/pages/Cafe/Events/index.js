import React, { useEffect, useState } from 'react'
import Search from '../../../components/Search';
import Filter from '../../../components/Filter';
import { httpRequest } from '../../../utils/httpsRequest';
import EventCard from '../../../components/EventCard';
import { AppLoader } from '../../../components/LoaderSpinner';

const Events = ({cafe}) => {
 const [events, setEvents] = useState([])
const [filteredEvents, setFilteredEvents] = useState([])
const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true)
    httpRequest.get(`/event/cafe-events/${cafe._id}`)
    .then(({data}) => {
      console.log(data)
      setEvents(data.events)
      setFilteredEvents(data.events)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {setPageLoading(false)})
  }, [])

  const handleSearch = (e, setSearchQuery) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredData = events.filter(event =>
        event.title.toLowerCase().includes(query.toLowerCase()) 
    );
    setFilteredEvents(filteredData);
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
      <div className="flex justify-end">
        <Search handleSearch={handleSearch} />
      </div>
    <div className="flex flex-grow gap-2 mt-2">
      <div className="ssm:hidden md:flex">
        <Filter/>
      </div>
      <div className="flex-1 flex flex-col gap-3 justify-center">
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} cafe={cafe} />
        ))}
      </div>
    </div>
    </div>
  );
}

export default Events