import API from '../../API';
import {
  SET_DECISION_OPTIONS,
  SET_OPTION,
  ADD_DECISION_OPTION,
  REMOVE_OPTION,
} from '../actionTypes';


import { shouldLoad } from '../_utils';

export const fetchDecisionOptions = decisionId => async (dispatch, getState) => {
  // get the time stamp of when this decision was las loaded (default to 0)
  const { options: { decisionLoadedAt: { [decisionId]: loadedAt = 0 } } } = getState();
  // don't do anything else if we can use the cached version
  if (!shouldLoad(loadedAt)) return;
  // get the user decisions from the api
  const options = await API.get(`/options?decisionId=${decisionId}`);
  // update the state
  dispatch({ type: SET_DECISION_OPTIONS, options, decisionId });
};

export const fetchOption = id => async (dispatch, getState) => {
  // pull the option out of the state
  const { options: { byId: { [id]: existingOption } } } = getState();
  // if the option already exists, don't do anything
  if (existingOption) return;
  // get the details of the option
  const option = await API.get(`/option/${id}`);
  // update the state with the option
  dispatch({ type: SET_OPTION, option });
};

export const saveOption = option => async (dispatch) => {
  if(option.id) {
    // make the update api call to save the changes
    const updatedOption = await API.put(`/options/${option.id}`, option);
    // update the state
    dispatch({ type: SET_OPTION, option: {...option, ...updatedOption } });
  } else {
    // make the create api call to make a new option
    const newOption = await API.post('/options', option);
    // add the new option
    dispatch({ type: SET_OPTION, option: { ...option, ...newOption } });
    dispatch({ type: ADD_DECISION_OPTION, id: newOption.id, decisionId: option.decisionId });
  }
};

export const deleteOption = id => async (dispatch) => {
  // send the delete to the api
  await API.delete(`/options/${id}`);
  // dispatch the action to remove the option with the id to remove
  dispatch({ type: REMOVE_OPTION, id });
};
