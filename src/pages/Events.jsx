import React, { useEffect, useState } from 'react'
import { httpRequest } from '../utils/httpsRequest';
import { calculateTimeLeft, sortEvents } from '../utils/AppUtils';
import ListComponent from "../components/ListComponent";
import ItemCard from '../components/cards/ItemCard';

const Events = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true)
    httpRequest.get(`/events/all-events`)
    .then(({data}) => {
      console.log(data)
      const currentEvents = data.events.filter(event => {
        const timeLeft = calculateTimeLeft(event.date, event.startTime, event.endTime);
        return !timeLeft.over;
      });
      const sortedEvents = sortEvents(currentEvents)
      setEvents(sortedEvents);
      setFilteredEvents(sortedEvents);
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {setPageLoading(false)})
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const currentEvents = events.filter(event => {
        const timeLeft = calculateTimeLeft(event.date, event.startTime, event.endTime);
        return !timeLeft.over;
      });
      const sortedEvents = sortEvents(currentEvents)
      setFilteredEvents(sortedEvents);
    }, 60000);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className='py-5 pb-10 mx-10'>
      <ListComponent
        items={events}
        type={'events'}
        filteredItems={filteredEvents}
        setFilteredItems={setFilteredEvents}
        pageLoading={pageLoading}
        CardComponent={ItemCard}
      />
    </div>
  );
}

export default Events