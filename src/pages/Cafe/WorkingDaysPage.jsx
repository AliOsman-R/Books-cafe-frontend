import React, { useEffect, useState } from 'react'
import { FaClock, FaRegCalendarTimes, FaRegCalendarCheck } from 'react-icons/fa';
import Map from '../../components/Map';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const WorkingDaysPage = ({cafe}) => {
  const [workingDays, setWorkingDays] = useState([]);

  useEffect(() => {
   setWorkingDays(cafe.workingDays)
  }, []);

  useEffect(() => {
    if(cafe?._id)
      document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    }
  }, []);

  const getWorkingDay = (dayName) => {
    return workingDays.find(day => day.day === dayName);
  };

  const todayIndex = new Date().getDay() - 1 ; 

  const displayedDays = [];
  for (let i = 0; i < 7; i++) {
    const index = (todayIndex + i) % 7;
    displayedDays.push(daysOfWeek[index]);
  }

  return (
    <div className="container mx-auto mt-5 flex flex-col gap-5">
      <div className="flex justify-between">
        {displayedDays.map((dayName, index) => {
          const workingDay = getWorkingDay(dayName);
          return (
            <div key={dayName} className="p-4 px-10 border rounded-lg bg-white shadow-lg flex items-center justify-between">
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
      <div className="w-full h-[600px]">
        <Map cafes={[cafe]}/>
      </div>
    </div>
  );
}

export default WorkingDaysPage