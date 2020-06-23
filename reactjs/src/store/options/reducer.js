import {
  SET_DECISION_OPTIONS,
  SET_OPTION,
  ADD_DECISION_OPTION,
  REMOVE_OPTION,
} from '../actionTypes';

import {
  arrayToObject,
  removeIdFromObject,
  removeIdFromArray,
} from '../_utils';

const startState = {
  decisionLoadedAt: {},
  byDecisionId: {},
  byId: {},
};

export default function optionsReducer(state = startState, action) {
  // pull out the type and save every thing else to "payload"
  const { type, ...payload } = action;
  // see if the action type matches any that should make changes to this state
  switch (type) {
    case SET_DECISION_OPTIONS: {
      const {options, decisionId } = payload;
      return {
        ...state,
        decisionLoadedAt: {
          ...state.decisionLoadedAt,
          // set the decision id to now's timestamp so we can track loading
          [decisionId]: Date.now(),
        },
        byDecisionId: {
          ...state.byDecisionId,
          // create and array of all the ids for this decision
          [decisionId]: options.map(option => option.id),
        },
        byId: {
          ...state.byId,
          // convert options array to object using the id as keys
          ...arrayToObject(options),
        },
      };
    }

    case SET_OPTION: {
      const { option } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [option.id]: option,
        },
      };
    }

    case ADD_DECISION_OPTION: {
      const { id, decisionId } = payload;
      // add the id to the array of all the options for a specific decision
      const allIds = [...state.byDecisionId[decisionId], id];
      return {
        ...state,
        byDecisionId: {
          ...state.byDecisionId,
          // we use a set here because it makes sure that all values are unique
          // we don't want the same id more than once in the array
          [decisionId]: [...new Set(allIds)],
        },
      };
    }

    case REMOVE_OPTION: {
      const { id } = payload;
      // pull the decision id out of the existing object so we can remove it from the array
      const { decisionId } = state.byId[id];
      return {
        ...state,
        // remove the id from the object of all the options
        byId: removeIdFromObject(id, state.byId),
        byDecisionId: {
          ...state.byDecisionId,
          // remove the option id from the array for the decision it belongs to
          [decisionId]: removeIdFromArray(id, state.byDecisionId[decisionId]),
        },
      };
    }

    // no matches found, return the current unchanged state
    default: return state;
  }

}
