import { createContext, useContext, useReducer, useState } from "react";
import { useAuth } from "./authContext";

const chatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [users, setUsers] = useState(false);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const { currentUser } = useAuth();

    const INITIAL_STATE = {
        chatId: "",
        user: null,
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId:
                        currentUser.uid > action.payload.uid
                            ? currentUser.uid + action.payload.uid
                            : action.payload.uid + currentUser.uid,
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <chatContext.Provider
            value={{
                users,
                setUsers,
                data: state,
                dispatch,
                chats, setChats,
                selectedChat, setSelectedChat,
            }}
        >
            {children}
        </chatContext.Provider>
    );
};

export const useChatContext = () => useContext(chatContext);
