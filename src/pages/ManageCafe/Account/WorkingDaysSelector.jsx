import React, { useState } from 'react';
import { ToggleSwitch } from '../../../components/ToggleSwitch ';
import { v4 as uuidv4 } from 'uuid';
import { PrimaryButton } from '../../../components/buttons';
import { toast } from 'sonner';

const WorkingDaysSelector = ({workingDays, setWorkingDays}) => {
  const [newDay, setNewDay] = useState({
    id: null,
    day: '',
    startTime: '',
    endTime: '',
    isOpen: false
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDay({ ...newDay, [name]: value });
  };

  const handleToggleChange = () => {
    setNewDay({ ...newDay, isOpen: !newDay.isOpen });
  };

  const handleAddDay = () => {
    if (newDay.id === null) {
      if (compareTimes(newDay.startTime, newDay.endTime)) {
        setWorkingDays([...workingDays, { ...newDay, id: uuidv4().toString() }]);
      } else {
        toast.error('End time must be greater than start time');
      }
    } else {
      const updatedDays = workingDays.map(day =>
        day.id === newDay.id ? { ...newDay } : day
      );
      setWorkingDays(updatedDays);
    }
    setNewDay({ id: null, day: '', startTime: '', endTime: '', isOpen: false });
  };
  
  const compareTimes = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    return start < end;
  };

  const handleEditDay = (id) => {
    const dayToEdit = workingDays.find(day => day.id === id);
    setNewDay({ ...dayToEdit });
  };

  const handleRemoveDay = (id) => {
    const updatedDays = workingDays.filter(day => day.id !== id);
    console.log(updatedDays)
    setWorkingDays(updatedDays);
  };
  console.log(workingDays)

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Working Hours</h2>
      <div className="mb-4 flex flex-col gap-3 xl:flex-row">
        <select
          name="day"
          value={newDay.day}
          onChange={handleInputChange}
          className="mr-2 p-2 rounded focus:outline-none focus:ring focus:border-primaryColor"
        >
          <option value="">Select Day</option>
          {daysOfWeek.map(day => (
            <option key={day} value={day} disabled={workingDays.some(item => item.day === day)}>
              {day}
            </option>
          ))}
        </select>
        <input
          type="time"
          name="startTime"
          value={newDay.startTime}
          onChange={handleInputChange}
          className="mr-2 p-2 rounded focus:outline-none focus:ring focus:border-primaryColor"
        />
        <input
          type="time"
          name="endTime"
          value={newDay.endTime}
          onChange={handleInputChange}
          className="mr-2 p-2 rounded focus:outline-none focus:ring focus:border-primaryColor"
        />
        <label className="flex items-center max-w-[122px] w-full gap-3 cursor-pointer">
        <ToggleSwitch
            checked={newDay.isOpen}
            onChange={handleToggleChange}
          />
          {newDay.isOpen? 'Open' : 'Closed'}
        </label>
        <PrimaryButton
          onClick={handleAddDay}
          disabled={!newDay.day || !newDay.startTime || !newDay.endTime}
          className=" h-[20px]"
        >
          {newDay.id ? 'Update Day' : 'Add Day'}
        </PrimaryButton>
      </div>
      <div className="grid gap-2">
        {workingDays.map((day, index) => (
          <div
            key={day.id}
            className="flex items-center bg-gray-100 rounded p-4 border-l-4 border-primaryColor"
          >
            <div className="mr-4">{day.day}:</div>
            <div className="mr-4">{day.startTime}</div>
            <div className="mr-4">-</div>
            <div className="mr-4">{day.endTime}</div>
            <div>{day.isOpen ? 'Open' : 'Closed'}</div>
            <button
              className="ml-auto px-4 py-2 bg-white text-black rounded transition duration-300 ease-in-out transform hover:scale-110"
              onClick={() => handleEditDay(day.id)}
            >
              Edit
            </button>
            <button
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded transition duration-300 ease-in-out transform hover:scale-110"
              onClick={() => handleRemoveDay(day.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkingDaysSelector;
