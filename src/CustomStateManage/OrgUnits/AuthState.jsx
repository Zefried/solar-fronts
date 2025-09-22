const customState = {
  AuthState: { 
    isAuthenticated: false, 
    token:null,
    name:null,
  },


  listeners: [],
};

const AuthAction = {

    initiateAuthState: () => {
        localStorage.setItem('solar', JSON.stringify(customState.AuthState));
        
        customState.listeners.forEach((fn) => fn(customState.AuthState));
        return customState.AuthState;
    },

    updateState: (newState) => {
        customState.AuthState = { ...customState.AuthState, ...newState };
        localStorage.setItem('solar', JSON.stringify(customState.AuthState));

        customState.listeners.forEach((fn) => fn(customState.AuthState));
        return customState.AuthState;
    },

    getState: (key) => {
        const saved = localStorage.getItem(key);
        if (saved) {
        customState.AuthState = JSON.parse(saved);
        }

        customState.listeners.forEach((fn) => fn(customState.AuthState));
        return customState.AuthState;
    },

    resetState: () => {
        customState.AuthState = {
            isAuthenticated: false,
            token: null,
            userId: null,
            name: null,
            guestCart: []
        };
        localStorage.setItem('solar', JSON.stringify(customState.AuthState));
        customState.listeners.forEach(fn => fn(customState.AuthState));
        return customState.AuthState;
    },

    subscribe: (listenerFunction) => {
        customState.listeners.push(listenerFunction);
        listenerFunction(customState.AuthState);
    },
};




export { AuthAction, customState };
