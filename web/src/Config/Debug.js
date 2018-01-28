export const __DEV__ = process.env.NODE_ENV === 'development'

export default {
    reduxLogging: __DEV__,
    useReactotron: __DEV__,
    // clearLocalStorage: __DEV__,
    clearLocalStorage: false,
}
