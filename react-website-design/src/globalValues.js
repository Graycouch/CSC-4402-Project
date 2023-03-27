import { createGlobalState } from 'react-hooks-global-state';

export const { setGlobalState, useGlobalState } = createGlobalState({
    isLoggedIn: false,
    isRegistering: false,
    user: null
});
