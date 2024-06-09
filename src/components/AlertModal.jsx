import { styled } from "styled-components";
import { CgClose } from 'react-icons/cg'
import { BtnLoader, LoaderSpinner } from "./LoaderSpinner";


const Modalbackground = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
    top: 20px;
    left: 0;
    justify-content: center;
    z-index: 1000;
    overflow: hidden;
`

const Modalcontainer = styled.div`
    width: 450px;
    height: 200px;
    border-radius: 12px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
    padding: 20px;
`

const CloseBtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Closebtn = styled.button`
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
`

const TitleCointaier = styled.div`
    display: inline-block;
    text-align: center;
    margin-top: 10px;
`

const MassageContainer = styled.div`
    height : 25px;
    whidth: 100%
    flex: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    text-align: center;
`

const BtnContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin-top:auto;
`

const Canclebtn = styled.button`
    background-color: white;
    color: black;
    font-weight: bold;
    border-radius: 25px;
    min-width: 170px;
    font-size: 15px;
    border: 1px solid rgb(185, 185, 185);
    cursor: pointer;
    padding: 10px 15px;
    &:hover {
        background-color: #e5e5e5;
    }
`

const ConfirmBtn = styled.button`
    min-width: 170px;
    border: none;
    color: white;
    background-color: var(--primary-color);
    border-radius: 25px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    padding: 10px 15px;
    &:hover {
        background-color: var(--primary-color-hover);
    }
    &:disabled {
        background-color: #c6c6c6;
        border-color: #c6c6c6; 
        cursor: auto;
      }
`
const AlertModal = ({ openModal, setopenModal, onConfirm, loading=false, children }) => {

    const handleCloseModal = () => {
        if (loading) return
        
        setopenModal(false)
    }

    return (
        <>
            {openModal && (
                <Modalbackground onClick={handleCloseModal}>
                    <Modalcontainer onClick={(e)=>{e.stopPropagation()}}>
                        <CloseBtnContainer>
                            <Closebtn onClick={handleCloseModal}>
                                <CgClose size={20} />
                            </Closebtn>
                        </CloseBtnContainer>
                        <TitleCointaier>
                            {/* <h3>Are you sure you want to delete this item</h3> */}
                            {children[0]}
                        </TitleCointaier>
                        <MassageContainer>
                            {/* <span>Once deleted, this item will no longer be accessible.</span> */}
                            {children[1]}
                        </MassageContainer>
                        <BtnContainer>
                            <Canclebtn onClick={handleCloseModal}>
                                Cancel
                            </Canclebtn>
                            <ConfirmBtn disabled={loading} onClick={onConfirm}>
                                {loading ? <BtnLoader /> : 'Confirm'}
                            </ConfirmBtn>
                        </BtnContainer>
                    </Modalcontainer>
                </Modalbackground>
            )}
        </>
    )
}

export default AlertModal