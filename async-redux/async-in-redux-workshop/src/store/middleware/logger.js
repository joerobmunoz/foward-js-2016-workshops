export default ({getState, dispatch}) => next => action => {
    // we don't actually use dispatch
  let result = next(action);
  console.log('dispatching', action);
  console.log('next state', getState());
  return result;
}