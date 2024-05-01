import React from 'react'
import { bookInitialState } from '../../../../data/initialStates'
import GenericList from '../Components/GenericList'
import AddItem from '../Components/AddItem'
import { areRequiredBookFieldsMissing, isBookDataChanged } from '../../../../utils/formUtils'
import BookForm from './BookForm'
import EditItem from '../Components/EditItem'

const BooksList = () => {
 
  return (
    <GenericList
      type="books"
      initialState={bookInitialState}
      AddComponent={AddItem}
      EditComponent={EditItem}
      requiredFieldsMissing={areRequiredBookFieldsMissing}
      FormComponent={BookForm}
      isItemDataChanged={isBookDataChanged}
      extraImagesKey="bookPlaceImages"
    />
  )
}

export default BooksList