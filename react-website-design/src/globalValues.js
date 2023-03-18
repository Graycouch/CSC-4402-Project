import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
    isLoggedIn: false,
    isRegistering: false,
    user: null
})

export { useGlobalState, setGlobalState };