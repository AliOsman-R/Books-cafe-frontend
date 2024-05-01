import moment from "moment";

export const setPagination = (recordsPerPage, currentPage, data) => {
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = data.slice(firstIndex, lastIndex)
    return records;
}

export const compareTimes = (startTime, endTime) => {
  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);
  return start < end;
};

export const getDayInfo = (openingHours) => {
  if(openingHours.length === 0)
  {
    return { status: "Closed", workingHours: "N/A"}
  }
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
    // const currentTime = {
    //   hours: currentDate.getHours(),
    //   minutes: currentDate.getMinutes()
    // };

    // // Check if the current time is within the working hours
    // const isOpen = isTimeBetween(currentTime, startTime, endTime);

    // // Convert start and end times to AM/PM format
    const formattedStartTime = formatTime(todayOpeningHours.startTime);
    const formattedEndTime = formatTime(todayOpeningHours.endTime);

    // Return the status and working hours
    return {
      status: todayOpeningHours.isOpen ? "Open" : "Closed",
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


export const sortWorkingDays = (workingDays) => {
  const daysMap = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7
  };

  // Sort the array based on the order of days from Monday to Sunday
  workingDays.sort((a, b) => {
    return daysMap[a.day] - daysMap[b.day];
  });

  return workingDays;
};


const getEventDateTime = (eventDate, eventTime) => {
  const [hours, minutes] = eventTime.split(':').map(part => parseInt(part));

    // Set default modifier to AM if hours < 12, otherwise set to PM
    const modifier = hours < 12 ? 'AM' : 'PM';

    // Calculate the actual hours in 24-hour format
    const actualHours = (hours % 12) + (modifier === 'PM' ? 12 : 0);

    // Create a new Date object with the provided date and time
    const date = new Date(eventDate);
    date.setHours(actualHours, minutes, 0); // Set seconds to zero

    return date;
};

export const calculateTimeLeft = (eventDate, startTime, endTime) => {
  const eventStart = getEventDateTime(eventDate, startTime);
  const eventEnd = getEventDateTime(eventDate, endTime);
  const now = new Date();

  if (now > eventEnd) {
    return { over: true };
  } else if (now > eventStart) {
    return { happening: true };
  } else {
    const difference = eventStart - now;
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
};


export const getUniqueAttributes = (items, attributeName) => {
  // Use a Set to store unique attributes
  const uniqueAttributes = new Set();

  // Loop through each menu item
  items.forEach(item => {
      const attributeValue = item[attributeName];
      if (attributeValue && typeof attributeValue === 'string') {
          // Format the attribute: capitalize the first letter, lowercase the rest
          const formattedAttribute = attributeValue.charAt(0).toUpperCase() + attributeValue.slice(1).toLowerCase();
          uniqueAttributes.add(formattedAttribute);
      }
  });

  return Array.from(uniqueAttributes);
}


export const sortEvents = (currentEvents) => {
  currentEvents.sort((a, b) => {
    const momentA = moment(a.date);
    const momentB = moment(b.date);

    // Compare the moments
    if (momentA.isBefore(momentB)) {
      return -1;
    } else if (momentA.isAfter(momentB)) {
      return 1;
    } else {
      return 0;
    }
  });
  return currentEvents;
}


export const calculateDuration = (event) => {
  const dateFormat = "YYYY-MM-DD";
  const timeFormat = "hh:mm A";
  
  const startDateTime = moment(`${event.date} ${event.startTime}`, `${dateFormat} ${timeFormat}`);
  const endDateTime = moment(`${event.date} ${event.endTime}`, `${dateFormat} ${timeFormat}`);
  
  const duration = moment.duration(endDateTime.diff(startDateTime));
  const hours = duration.hours();
  const minutes = duration.minutes();

  return `${hours} hour(s) and ${minutes} minute(s)`;
};