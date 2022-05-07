const initialState = [
    {
        id:0,
        name:"ifeoluwa oladeni",
        number: "08109822728",
        email: "oladeniifeoluwa123@gmail.com"
    },
    {
        id:1,
        name:"oreofe oladeni",
        number: "0819328375",
        email: "oreofe@gmail.com",
    },
];

const contactReducer =  (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CONTACT":
            state= [...state, action.payload];
            return state;
            case "UPDATE_CONTACT":
                const updateState = state.map(contact=>contact.id === 
                    action.payload.id ? action.payload:contact);
                    state = updateState;
                    return state;
            case "DELETE_CONTACT":
                const filterContact = state.filter((contact) => contact.id !== action.payload && contact);
                state = filterContact;
                return state;
        default:
            return state;
    }
}

export default contactReducer;