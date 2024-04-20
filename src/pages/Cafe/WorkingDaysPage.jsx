import React, { useEffect, useState } from 'react'
import { FaClock, FaRegCalendarTimes, FaRegCalendarCheck } from 'react-icons/fa';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const WorkingDaysPage = ({cafe}) => {
  const [workingDays, setWorkingDays] = useState([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay());

  useEffect(() => {
   setWorkingDays(cafe.workingDays)
  }, []);

  const getWorkingDay = (dayName) => {
    return workingDays.find(day => day.day === dayName);
  };

  const todayIndex = new Date().getDay() - 1 ; 

  // Create an array of days starting from today until the next 7 days
  const displayedDays = [];
  for (let i = 0; i < 7; i++) {
    const index = (todayIndex + i) % 7;
    displayedDays.push(daysOfWeek[index]);
  }

  return (
    <div className="container mx-auto mt-5">
      {/* <h1 className="text-3xl font-bold mb-8 text-center">Working Days</h1> */}
      <div className="grid grid-cols-1 gap-4">
        {displayedDays.map((dayName, index) => {
          const workingDay = getWorkingDay(dayName);
          return (
            <div key={dayName} className="p-4 border rounded-lg bg-white shadow-lg flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-2">{dayName}</h2>
                {workingDay ? (
                  workingDay.isOpen ? (
                    <>
                      <p className="text-green-600 flex items-center">
                        <FaRegCalendarCheck className="mr-1" /> Open
                      </p>
                      <p className="text-gray-800 flex items-center">
                        <FaClock className="mr-1" /> {`${workingDay.startTime} - ${workingDay.endTime}`}
                      </p>
                    </>
                  ) : (
                    <p className="text-red-600 flex items-center">
                      <FaRegCalendarTimes className="mr-1" /> Closed
                    </p>
                  )
                ) : (
                  <p className="text-red-600 flex items-center">
                    <FaRegCalendarTimes className="mr-1" /> Closed
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WorkingDaysPage