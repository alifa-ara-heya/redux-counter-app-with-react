// currying

const logger = (state) => (next) => (action) => {
    console.group(action.type);
    console.info('previous state', state.getState());
    const result = next(action)
    console.info('next state', state.getState());
    console.groupEnd()
    return result;
}

export default logger;