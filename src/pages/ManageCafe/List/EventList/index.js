import React from 'react'
import { sortEvents } from '../../../../utils/AppUtils'
import { eventInitialState } from '../../../../data/initialStates'
import GenericList from '../Components/GenericList'
import EventForm from './EventForm'
import { areRequiredEventFieldsMissing, isEventDataChanged } from '../../../../utils/formUtils'
import AddItem from '../Components/AddItem'
import EditItem from '../Components/EditItem'

const EventsList = () => {  

  return (
    <GenericList
      type="events"
      initialState={eventInitialState}
      AddComponent={AddItem}
      EditComponent={EditItem}
      sortFunction={(data) => sortEvents(data)}
      requiredFieldsMissing={areRequiredEventFieldsMissing}
      isItemDataChanged={isEventDataChanged}
      FormComponent={EventForm}
    />
  )
}

export default EventsList