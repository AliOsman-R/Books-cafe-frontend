export const setPagination = (recordsPerPage, currentPage, data) => {
    // const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = data.slice(firstIndex, lastIndex)
    return records;
}

export const isAllChanged = (data) => {
    return Object.values(data).every(val => val?.trim() !== '')
  }
  
  
export const isPartChanged = (data) => {
  return Object.values(data).some(val => val?.trim() !== '')
}


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


export const isAnyFieldEmpty = (state) => {
    // Obtain all values from the state object
    const values = Object.values(state);
  
    // Check if any value is an empty string
    for (let value of values) {
      if (value?.trim() === '') {
        return true; // Return true if any field is empty
      }
    }
  
    // If none are empty, return false
    return false;
  };


export const getDayInfo = (openingHours) => {
  // Get the current day
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

  // Find the opening hours for the current day
  const todayOpeningHours = openingHours.find(day => day.day === currentDay);

  // Check if opening hours are defined for today
  if (todayOpeningHours) {
    // Get the start and end times for today
    const startTime = parseTime(todayOpeningHours.startTime);
    const endTime = parseTime(todayOpeningHours.endTime);

    // Get the current time
    const currentTime = {
      hours: currentDate.getHours(),
      minutes: currentDate.getMinutes()
    };

    // Check if the current time is within the working hours
    const isOpen = isTimeBetween(currentTime, startTime, endTime);

    // Convert start and end times to AM/PM format
    const formattedStartTime = formatTime(todayOpeningHours.startTime);
    const formattedEndTime = formatTime(todayOpeningHours.endTime);

    // Return the status and working hours
    return {
      status: isOpen ? "Open" : "Closed",
      workingHours: `${formattedStartTime} - ${formattedEndTime}`
    };
  } else {
    // If no opening hours are defined for today, return Closed
    return {
      status: "Closed",
      workingHours: "N/A"
    };
  }
};

const parseTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(part => parseInt(part, 10));
  return { hours, minutes };
};

// Function to check if a given time is between two other times
const isTimeBetween = (time, startTime, endTime) => {
  return (
    time.hours > startTime.hours ||
    (time.hours === startTime.hours && time.minutes >= startTime.minutes)
  ) && (
    time.hours < endTime.hours ||
    (time.hours === endTime.hours && time.minutes < endTime.minutes)
  );
};

// Function to format time in AM/PM format
const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};