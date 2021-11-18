const initState = {
  count: 0
}

const CounterReducer = (state= initState, action)=>{
  switch (action.type) {
    case "INCREASE":
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}

export default CounterReducer;