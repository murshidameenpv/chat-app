import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ConversationItem({ conversation }) {
  const navigate = useNavigate();
  const currentTheme = useSelector((state) => state.themeKey);
  const { currentUser } = useSelector((state) => state.userKey)
  let chatName = "";
  if (conversation.isGroupChat) {
    chatName = conversation.chatName;
  } else {
    const otherUser = conversation.users.find(user => user._id !== currentUser._id);
    chatName = otherUser.name;
  }
  const lastMessage = conversation.lastMessage ? conversation.lastMessage.content : "No previous messages";

  return (
    <div className={`flex items-center space-x-4 p-3 bg-slate-50 my-2 rounded-xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 select-none ${currentTheme ? 'dark' : ''}`}
      onClick={() => { navigate("chat/"+ conversation._id + "&"+ chatName) }}>
      <div className='bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center'>
        <p>{chatName[0].toUpperCase()}</p>
      </div>
      <div className='flex-1'>
        <p className='font-bold text-black'>{chatName}</p>
        <p className='text-gray-500'>{lastMessage}</p>
      </div>
      <div className='text-right text-sm mt-2 pt-3 text-gray-500 dark:text-dark-text'>
        <p>{conversation.createdAt}</p>
      </div>
    </div>
  )
}

export default ConversationItem;
