import API from '../../API';
import {
  SET_USER_DECISIONS,
  SET_PUBLIC_DECISIONS,
  SET_DECISION,
  REMOVE_DECISION,
  ADD_USER_DECISION,
  ADD_PUBLIC_DECISION,
  REMOVE_PUBLIC_DECISION,
} from '../actionTypes';
import { fetchDecisionOptions } from '..';
import { shouldLoad } from '../_utils';

// get this user's decisions
export const fetchUserDecisions = () => async (dispatch, getState) => {
  // get the current state loaded at time
  const { decisions: { userDecisionsLoadedAt } } = getState();
  // if the last time these decisions was loaded was longer than the refresh time
  if (!shouldLoad(userDecisionsLoadedAt)) return;
  // get the user decisions from the api
  const userDecisions = await API.get('/decisions');
  // update the state
  dispatch({ type: SET_USER_DECISIONS, userDecisions });
};

// get this public decisions
export const fetchPublicDecisions = () => async (dispatch, getState) => {
  // get the current state loaded at time
  const { decisions: { publicDecisionsLoadedAt } } = getState();
  // if the last time these decisions was loaded was longer than the refresh time
  if (!shouldLoad(publicDecisionsLoadedAt)) return;
  // get the public decisions from the api
  const publicDecisions = await API.get('/decisions/public');
  // update the state
  dispatch({ type: SET_PUBLIC_DECISIONS, publicDecisions });
};

export const fetchDecision = id => async (dispatch, getState) => {
  // pull the decision out of the state
  const { decisions: { byId: { [id]: existingDecision } } } = getState();
  // run the action to get the options for this decision
  dispatch(fetchDecisionOptions(id));
  // if the decision already exist, don't do anything
  if (existingDecision) return;
  //get the details of the decision
  const decision = await API.get(`/decisions/${id}`);
  // update the state with the decision
  dispatch({ type: SET_DECISION, decision});
};

export const deleteDecision = id => async (dispatch, getState) => {
  // sent the delete to the api
  await API.delete(`/decisions/${id}`); // make sure it isnt suppose to be /decisions.${}
  // dispatch the action to remove the decision with the id to remove
  dispatch({ type: REMOVE_DECISION, id });
};

export const saveDecision = decision => async (dispatch) => {
  if (decision.id) {
    // make the update api call to save the changes
    const updatedDecision = await API.put(`/decisions/${decision.id}`, decision);
    // update the state
    dispatch({ type: SET_DECISION, decision: { ...decision, ...updatedDecision } });
    // the type could've changed so we need to keep our publicDecision updated
    if (decision.type === 'private') dispatch({ type: REMOVE_PUBLIC_DECISION, id: updatedDecision.id });
    else if (decision.type === 'public') dispatch({ type: ADD_PUBLIC_DECISION, id: updatedDecision.id });
  } else {

    // make the create api call to make a new decision
    const createdDecision = await API.post('/decisions', decision);
    // add the new decision
    dispatch({ type: SET_DECISION, decision: { ...decision, ...createdDecision } });
    // append the id to the user's list
    dispatch({ type: ADD_USER_DECISION, id: createdDecision.id });
    // if it's public add it to the public decisions
    if (decision.type === 'public') dispatch({ type: ADD_PUBLIC_DECISION, id: createdDecision.id });
  }

  return decision;
};
