import { useContext} from "react";
import { AuthContextApi } from "../context/AuthContext";
import { ChatContextApi } from "../context/ChatContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// eslint-disable-next-line react/prop-types
export const Message = ({message}) => {
  // console.log(message);
  const {currentUser} = useContext(AuthContextApi);
  const {state} = useContext(ChatContextApi);
  const owner = currentUser.uid === message.senderId ;
  const imgUrl = currentUser.uid === message.senderId ? currentUser.photoURL : state.user.photoURL 
  
  return (
    <div className={`p-1 mb-2 flex gap-4 items-end ${owner ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="">
        {imgUrl ? <img className='max-w-[20px] max-h-[20px] min-w-[20px] min-h-[20px] rounded-xl bg-red-500' src={imgUrl} alt="" /> : <AccountCircleIcon style={{fontSize:30}}/>}
      </div>
      <div className={`max-w-[320px]  flex flex-col ${owner ? 'items-end' : 'items-start'} gap-2`}>
        {message.text && <p className={`${owner ? 'bg-[#4b51f9]' : 'bg-[#2e343d]'} p-2 max-w-[300px] break-all	${owner ? 'rounded-br-[0px]' : 'rounded-bl-[0px]'} w-fit text-white rounded-xl`}>{message.text}</p>}
        {message.img && <img className="rounded-lg max-w-full" src={message.img} alt="" />}
      </div>
    </div>
  )
}
