// action types that should change this state
import {
  SET_USER_DECISIONS,
  SET_PUBLIC_DECISIONS,
  SET_DECISION,
  REMOVE_DECISION,
  ADD_USER_DECISION,
  ADD_PUBLIC_DECISION,
  REMOVE_PUBLIC_DECISION,
} from '../actionTypes';

import {
  arrayToObject,
  removeIdFromArray,
  removeIdFromObject,
} from '../_utils';

const startState = {
  // object with all the decisions with their ids as the keys
  byId: {},
  // array of the user's decisions
  userDecisions: [],
  // array of the public decisions
  publicDecisions: [],
  // time the user's decisions were last loaded (default to 0 since they haven't been loaded)
  userDecisionsLoadedAt: 0,
  // time the public decisions were last loaded (default to 0 since they haven't been loaded)
  publicDecisionsLoadedAt: 0,
};

export default function decisionReducer(state = startState, action) {
  // pull out the type and save every thing else to "payload"
  const { type, ...payload } = action;
  // see if the action type matches any that should make changes to this state
  switch (type) {
    // if type is SET_USER_DECISIONS
    case SET_USER_DECISIONS: {
      const { userDecisions } = payload;
      return {
        // return a new object that has all the properties of the current state
        ...state,
        // decision object with the ids as the key
        byId: {
          // keep all the current decisions
          ...state.byId,
          // turn the array of decisions into an object that has the ids as keys
          ...arrayToObject(userDecisions),
        },
        // turn the array of decisions into an array of ids
        userDecisions: userDecisions.map(decision => decision.id),
        // set the time loaded to now
        userDecisionsLoadedAt: Date.now(),
      };
    }

    // if type is SET_PUBLIC_DECISIONS
    case SET_PUBLIC_DECISIONS: {
      const { publicDecisions } = payload;
      return {
        // return a new object that has all the properties of the current state
        ...state,
        // decision object with the ids as the key
        byId: {
          // keep all the current decisions
          ...state.byId,
          // turn the array of decisions into an object that has the ids as keys
          ...arrayToObject(publicDecisions),
        },
        // turn the array of decisions into an array of ids
        publicDecisions: publicDecisions.map(decision => decision.id),
        // set the time loaded to now
        publicDecisionsLoadedAt: Date.now(),
      };
    }
    case SET_DECISION: {
      const { decision } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [decision.id]: decision,
        },
      };
    }
    case REMOVE_DECISION: {
      const { id } = payload;
      return {
        ...state,
        byId: removeIdFromObject(id, state.byId),
        userDecisions: removeIdFromArray(id, state.userDecisions),
        publicDecisions: removeIdFromArray(id, state.publicDecisions),
      };
    }
    case ADD_PUBLIC_DECISION: {
      const { id } = payload;
      // add the id to the array of public decisions
      const allIds = [...state.publicDecisions, id];
      return {
        ...state,
        // we use a set here because it makes sure that ll values are unique
        // we don't want the same id more than once in the array
        publicDecisions: [...new Set(allIds)],
      };
    }
    case REMOVE_PUBLIC_DECISION: {
      const { id } = payload;
      return {
        ...state,
        // remove the id using our utility function
        publicDecisions: removeIdFromArray(id, state.publicDecisions),
      };
    }
    // no matches found, return the current unchanged state
    default: return state;
  }
}
