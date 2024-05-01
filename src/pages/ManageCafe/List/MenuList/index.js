import React from 'react'
import { menuInitialState } from '../../../../data/initialStates'
import GenericList from '../Components/GenericList'
import AddItem from '../Components/AddItem'
import { areRequiredMenuFieldsMissing, isMenuItemDataChanged } from '../../../../utils/formUtils'
import MenuItemForm from './MenuItemForm'
import EditItem from '../Components/EditItem'

const MenuList = () => { 

  return (
    <GenericList
      type="menu"
      initialState={menuInitialState}
      AddComponent={AddItem}
      EditComponent={EditItem}
      requiredFieldsMissing={areRequiredMenuFieldsMissing}
      isItemDataChanged={isMenuItemDataChanged}
      FormComponent={MenuItemForm}
    />
  )
}

export default MenuList