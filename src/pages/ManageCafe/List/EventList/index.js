import React, { useContext, useEffect, useState } from 'react'
import { AppLoader } from '../../../../components/LoaderSpinner'
import { httpRequest } from '../../../../utils/httpsRequest'
import { Context } from '../../../../context/GlobalContext'
import Search from '../../../../components/Search'
import Pagination from '../../../../components/Pagination'
import { setPagination } from '../../../../utils/AppUtils'
import { toast } from 'sonner'
import { eventInitialState } from '../../../../data/initialStates'
import AddEvent from './AddEvent'
import EventCard from '../../../../components/EventCard'
import EditEvent from './EditEvent'

const EventsList = () => {
  const [events, setEvents] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(6);
  const [openModal, setOpenModal] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [eventData, setEventData] = useState(eventInitialState);
  const [originalEventData, setOriginalEventData] = useState(eventInitialState);
  const [filteredEvents, setFilteredEvents] = useState([])
  const {user} = useContext(Context)

  useEffect(() => {
    setPageLoading(true)
    httpRequest.get(`/event/user-events/${user._id}`)
    .then(({data}) => {
      console.log(data)
      setEvents(data.events)
      setFilteredEvents(data.events)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {setPageLoading(false)})
  }, [])

  useEffect(() => {
    setFilteredEvents(events)
  }, [events])

 
  const handleSearch = (e, setSearchQuery) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredData = events.filter(event =>
        event.title.toLowerCase().includes(query.toLowerCase()) 
    );
    setFilteredEvents(filteredData);
  };

  const handleDelete = (event) => {
    setDeleteLoading(true)
    httpRequest.delete(`/event/${event._id}`)
    .then(({data}) => {
      console.log(data)
      toast.success(data.message)
      setEvents(prev=> prev.filter(ev => ev._id !== event._id))
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
          <AddEvent setEvents={setEvents}/>
        </div>
        {filteredEvents.length === 0 && (
          <div className="flex justify-center items-center h-[50vh]">
            No event available please add an event
          </div>
        )}
        <div className="flex-1 flex flex-col gap-3 mt-10 min-h-[1114px]">
          {setPagination(recordsPerPage, currentPage, filteredEvents)?.map(event =>(
            <EventCard 
            key={event._id} 
            event={event}
            isManage={true} 
            setOpenModal={setOpenModal} 
            handleDelete={handleDelete}
            setEventData={setEventData}
            setOriginalEventData={setOriginalEventData}
            deleteLoading={deleteLoading}
            />
          ))}
        </div>
        <EditEvent
         setEvents={setEvents}
         openModal={openModal} 
         setOpenModal={setOpenModal} 
         eventData={eventData} 
         setEventData={setEventData}
         originalEventData={originalEventData}
         />
        <div className="flex justify-center items-center space-x-2 my-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          recordsPerPage={recordsPerPage}
          setRecordsPerPage={setRecordsPerPage}
          data={filteredEvents}
        />
      </div>
    </div>
  )
}

export default EventsList