import React, { useContext, useState } from "react";
import Modal from "../../../components/Modal";
import { PrimaryButton } from "../../../components/buttons";
import { BtnLoader } from "../../../components/LoaderSpinner";
import { validateMalaysianPhoneNumber } from "../../../utils/validation";
import { isAllChanged, isAnyFieldEmpty, isPartChanged, trimFormData } from "../../../utils/formUtils";
import { toast } from "sonner";
import { httpRequest } from "../../../utils/httpsRequest";
import { Context } from "../../../context/GlobalContext";
import CafeForm from "./CafeForm";
import { cafeInitialState } from "../../../data/initialStates";

const CafeSwitch = ({ setOpenModal, openModal }) => {
  const [workingDays, setWorkingDays] = useState([]);
  const [cafeInfo, setCafeInfo] = useState(cafeInitialState);
  const [btnLoading, setBtnLoading] = useState(false);
  const {user, actions} = useContext(Context)

  const isCafeInfoEmpty = () => {
    return isAnyFieldEmpty(cafeInfo)
  }

  const isInfoChanged = () => {
    const {state,...rest} = cafeInfo
    return (isPartChanged(rest) || workingDays.length > 0) ||  cafeInfo.state.trim() !== 'Kuala Lumpur' 
  };

  const handleReset = () => {
    setCafeInfo(cafeInitialState)
    setWorkingDays([])
  }
  
  const handleSwitch = () => {
    if(!validateMalaysianPhoneNumber(cafeInfo.phoneNumber))
      return toast.error("Phone number is invalid (E.g., 60123456789, 0123456789)")

      const cafeInfoTrimmed = trimFormData(cafeInfo)

      setBtnLoading(true)
      httpRequest.post(`/cafe/${user._id}`,{...cafeInfoTrimmed,workingDays})
      .then(({data}) => {
        console.log(data)
        setOpenModal(false)
        actions({ type: 'SET_USER', payload: {...user,...data.user} });
        toast.success(data.message)
        handleReset()
      })
      .catch(err=>{
        console.log(err)
        toast.error(err?.response?.data.message)
      })
      .finally(()=> setBtnLoading(false))
  }

  return (
    <div>
      <Modal setOpenModal={setOpenModal} $isOpen={openModal}>
        <Modal.Header setOpenModal={setOpenModal}>Switch To Cafe</Modal.Header>
        <Modal.Body>
          <div className="w-full">
            <CafeForm
              cafeInfo={cafeInfo}
              setCafeInfo={setCafeInfo}
              workingDays={workingDays}
              setWorkingDays={setWorkingDays}
            />
          </div>
        </Modal.Body>
        <Modal.Footer onClick={() => setOpenModal(false)}>
          <div className="flex items-center gap-2 justify-end">
            <PrimaryButton disabled={btnLoading || !isInfoChanged()} onClick={handleReset} className="h-[30px]">
              Reset
            </PrimaryButton>
            <PrimaryButton disabled={btnLoading || isCafeInfoEmpty()} onClick={handleSwitch} className="h-[30px] min-w-[117px]">
              {btnLoading ? <BtnLoader /> : "Switch"}
            </PrimaryButton>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CafeSwitch;
