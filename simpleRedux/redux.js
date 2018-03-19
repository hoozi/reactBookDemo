

const createStore = function(reducer) {
    let state = null;
    const listeners = [];
    const getState = () => state;
    const subscribe = (listener) => listeners.push(listener);

    /**
     * 触发一个action
     * @param {Object} action  
     */
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => {
            listener();
        })
    }

    // 当action为空时，初始化一个state
    dispatch({}); 

    return {
        getState,
        dispatch,
        subscribe
    }
}