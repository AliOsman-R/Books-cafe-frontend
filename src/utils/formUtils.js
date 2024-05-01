export const isAllChanged = (data) => {
    return Object.values(data).every(val => val?.trim() !== '')
  }
  
  
export const isPartChanged = (data) => {
  return Object.values(data).some(val => val?.trim() !== '')
}

export const isAnyFieldEmpty = (state) => {
    // Obtain all values from the state object
    const values = Object.values(state);
  
    // Check if any value is an empty string
    for (let value of values) {
      if (typeof value === 'string' && value?.trim() === '') {
        return true; // Return true if any field is empty
      }
    }
  
    // If none are empty, return false
    return false;
  };


export const isCafeInfoChanged = (cafeInfo, originalCafeInfo, workingDays) => {
  return (
      cafeInfo.name.trim() !== originalCafeInfo.name ||
      cafeInfo.bio.trim() !== originalCafeInfo.bio ||
      cafeInfo.phoneNumber.trim() !== originalCafeInfo.phoneNumber ||
      cafeInfo.state.trim() !== originalCafeInfo.state ||
      cafeInfo.city.trim() !== originalCafeInfo.city ||
      cafeInfo.address.trim() !== originalCafeInfo.address ||
      cafeInfo.image !== originalCafeInfo.image ||
      cafeInfo.latitude !== originalCafeInfo.latitude ||
      cafeInfo.longitude !== originalCafeInfo.longitude ||
      !areWorkingDaysEqual(workingDays, originalCafeInfo.workingDays)
  );
  };

  const areWorkingDaysEqual = (workingDays1, workingDays2) => {
      if (workingDays1.length !== workingDays2.length) {
          return false;
      }
      for (let i = 0; i < workingDays1.length; i++) {
          if (workingDays1[i].day !== workingDays2[i].day ||
              workingDays1[i].startTime !== workingDays2[i].startTime ||
              workingDays1[i].endTime !== workingDays2[i].endTime ||
              workingDays1[i].isOpen !== workingDays2[i].isOpen) {
              return false;
          }
      }
      return true;
  };


export const isUserInfoChanged = (userInfo, originalUserInfo) => {
    return (
      userInfo.name.trim() !== originalUserInfo.name ||
      userInfo.email.trim() !== originalUserInfo.email ||
      userInfo.phoneNumber !== originalUserInfo.phoneNumber ||
      userInfo.firstAddress.trim() !== originalUserInfo.firstAddress ||
      userInfo.secondAddress.trim() !== originalUserInfo.secondAddress ||
      userInfo.profileImage !== originalUserInfo.profileImage
    );
  };


  export const isBookDataChanged = (bookData, originalBookData) => {
    return (
      bookData.title.trim() !== originalBookData.title ||
      bookData.author.trim() !== originalBookData.author ||
      bookData.genre.trim() !== originalBookData.genre ||
      bookData.description.trim() !== originalBookData.description ||
      bookData.publishYear !== originalBookData.publishYear ||
      bookData.status !== originalBookData.status ||
      bookData.availability !== originalBookData.availability ||
      (bookData.availability === 'Selling' && (
          bookData.price !== originalBookData.price ||
          bookData.stock !== originalBookData.stock
      )) ||
      hasImagesChanged(originalBookData.images, bookData.images) ||
      hasImagesChanged(originalBookData.bookPlaceImages, bookData.bookPlaceImages)
  );
  };

  export const areRequiredBookFieldsMissing = (bookData) => {
    return (
        !bookData.title.trim() ||
        !bookData.author.trim() ||
        !bookData.genre.trim() ||
        !bookData.description.trim() ||
        !bookData.publishYear ||
        !bookData.availability.trim() ||
        (bookData.availability === 'Selling' && (!bookData.price || !bookData.stock))
    );
}

export const isMenuItemDataChanged = (menuItemData, originalMenuItemData) => {
  return (
    menuItemData.name.trim() !== originalMenuItemData.name ||
    menuItemData.type.trim() !== originalMenuItemData.type ||
    menuItemData.description.trim() !== originalMenuItemData.description ||
    menuItemData.status !== originalMenuItemData.status ||
    menuItemData.price !== originalMenuItemData.price ||
    menuItemData.ingredients.join(',') !== originalMenuItemData.ingredients.join(',') ||
    menuItemData.isCountable !== originalMenuItemData.isCountable ||
    (menuItemData.isCountable && (
        menuItemData.stock !== originalMenuItemData.stock
    )) ||
    hasImagesChanged(originalMenuItemData.images, menuItemData.images) 
);
};

export const areRequiredMenuFieldsMissing = (menuItemData) => {
  return (
      !menuItemData.name.trim() ||
      !menuItemData?.type?.trim() ||
      !menuItemData.description.trim() ||
      !menuItemData.price ||
      (menuItemData.isCountable && !menuItemData.stock) ||
      menuItemData.ingredients.length === 0
  );
}


export const isEventDataChanged = (eventData, originalEventData) => {
  if(!eventData) return false
  return (
    eventData?.title.trim() !== originalEventData?.title ||
    eventData.location.trim() !== originalEventData.location ||
    eventData.description.trim() !== originalEventData.description ||
    eventData.startTime.trim() !== originalEventData.startTime ||
    eventData.endTime.trim() !== originalEventData.endTime ||
    eventData.date !== originalEventData.date ||
    hasImagesChanged(originalEventData.images, eventData.images) 
);
};

export const areRequiredEventFieldsMissing = (eventData) => {
  return (
      !eventData?.title.trim() ||
      !eventData?.location?.trim() ||
      !eventData.description.trim() ||
      !eventData.startTime.trim() ||
      !eventData.endTime.trim() ||
      !eventData.date?.trim() 
  );
}


export const trimFormData = (formData) => {
  const trimmedData = {};
  for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
          const value = formData[key];
          // Check if the value is a string
          if (typeof value === 'string') {
              // Trim the string value
              trimmedData[key] = value.trim();
          } else {
              // If the value is not a string, keep it as it is
              trimmedData[key] = value;
          }
      }
  }
  return trimmedData;
};


  export const hasImagesChanged = (originalImages, newImages) => {
    // Extracting IDs of original images
    const originalIds = new Set(originalImages.map(img => img.imageId._id));
  
    // Filter out new images from the list to compare only existing images
    const existingNewImages = newImages.filter(img => !img.isNew);
  
    // Extracting IDs from potentially changed images
    const newIds = new Set(existingNewImages.map(img => img.imageId && img.imageId._id));
    
    // Check for removed images: original image not present in new images
    const hasRemovedImages = Array.from(originalIds).some(id => !newIds.has(id));
    
    // Check for added images: new image not present in original images
    const hasAddedImages = newImages.some(img => img.isNew);
  
    return hasRemovedImages || hasAddedImages;
  }
  

