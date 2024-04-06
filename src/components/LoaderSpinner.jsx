import { BeatLoader } from 'react-spinners'
import FadeLoader from 'react-spinners/FadeLoader' 
import PuffLoader from 'react-spinners/PuffLoader' 

export const AppLoader = () => {
    return  <FadeLoader color="#cd8c42" />
}


export const BtnLoader = ({colorBtn}) => {
    return  <BeatLoader  size={10} color={colorBtn? colorBtn : 'white'} />
}