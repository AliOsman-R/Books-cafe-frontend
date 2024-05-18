import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../../../components/buttons';
import { BtnLoader } from '../../../components/LoaderSpinner';
import { httpRequest } from '../../../utils/httpsRequest';
import { toast } from 'sonner';

const statusList = [
    {name:'Preparing', objName:'preparing'},
    {name:'Out For Delivery', objName:'outForDelivery'}, 
    {name:'delivered', objName:'delivered'}
];

const ProgressForm = ({ progress, id, setProgress, setOrders, setOrder }) => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [btnLoading, setBtnLoading] = useState(false)
  const [activity, setActivity] = useState('');
  const [progressStatus, setProgressStatus] = useState([]);
  const isDisable = !time || !date || !activity 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'activity') {
      setActivity(value);
    } else if (name === 'time') {
      setTime(value);
    } else if (name === 'date') {
      setDate(value);
    }
  };

  const handleStatusSelect = (status) => {
    if (progressStatus.includes('preparing') && status === 'preparing') {
        return true;
    }

    if(!progressStatus.includes('preparing') && status !== 'preparing')
    {
        return true
    }

    if(!progressStatus.includes('preparing') && status === 'preparing')
    {
        return false
    }

    if(status === 'outForDelivery' && progressStatus.includes('preparing'))
    {
        if(progressStatus.includes('outForDelivery'))
            return true
        else
            return false
    }

    if(status === 'delivered' && !progressStatus.includes('outForDelivery'))
    {
        return true
    }
    
    if(status === 'delivered' && progressStatus.includes('outForDelivery'))
    {
        if(progressStatus.includes('delivered'))
            return true
        else
            return false
    }
    
};


  useEffect(() => {
    setProgressStatus(progress.map(item => item.activity));
  }, [progress]);

  const handleSave = () => {
    const progressData = {
        activity,
        time,
        date
    }
    setBtnLoading(true)
    httpRequest.put(`/orders/update-progress/${id}`, progressData)
    .then(({data}) => {
      console.log(data)
      setProgressStatus([...progressStatus,progressData.activity])
      if(progressData.activity === 'delivered')
      {
        setOrders(prev=> prev.map(prevOrd => prevOrd._id === id? data.order: prevOrd))
        setOrder(prev => ({...prev,status:'completed'}))
      }
      setProgress([...progress,{...progressData}])
      setActivity('')
      setDate('')
      setTime('')
      toast.success(`The order status has been updated successfully`)
    })
    .catch((err) => {
      console.log(err)
    }).finally(() => {
      setBtnLoading(false)
    })
  }

  // const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div className="mb-7 flex flex-col gap-3 xl:flex-row">
        <select
          name="activity"
          value={activity}
          onChange={handleInputChange}
          className="mr-2 p-2 rounded focus:outline-none focus:ring focus:border-primaryColor"
        >
          <option value="">Select Status</option>
          {statusList.map((status, index) => (
            <option
              key={status.objName}
              value={status.objName}
              disabled={handleStatusSelect(status.objName)}
            >
              {status.name}
            </option>
          ))}
        </select>

        <input
          type="time"
          name="time"
          value={time}
          onChange={handleInputChange}
          className="p-2 rounded focus:outline-none focus:ring focus:border-primaryColor"
        />
        <input
          type="date"
          name="date"
          value={date}
          // min={today} 
          onChange={handleInputChange}
          className="p-2 rounded focus:outline-none focus:ring focus:border-primaryColor"
        />
      </div>
      <PrimaryButton onClick={handleSave} disabled={isDisable || btnLoading} className='h-[38px] min-w-full'>
        {btnLoading ? <BtnLoader/> : 'Save'}
      </PrimaryButton>
    </div>
  );
};

export default ProgressForm;
