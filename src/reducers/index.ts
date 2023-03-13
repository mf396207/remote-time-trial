export enum ActionTypes {
  Visit = 'visit'
}

interface Action {
  type: ActionTypes
  payload: {
    id: number
  }
}

interface State {
  visitedCheckpoints: number[]
}

/**
 * SUMMARY: Reducer used to store state that requires complex mutations. Invoked whenever an action is dispatched.
 *
 * @param state The previous state
 * @param action An action that has been invoked.
 * @returns The updated state.
 */
export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'visit': {
      /**
       * If a user has not already visited a checkpoint, update the list of visited checkpoints in state, else do nothing.
       */
      if (!state.visitedCheckpoints.includes(action.payload.id)) {
        return {
          visitedCheckpoints: [...state.visitedCheckpoints, action.payload.id]
        }
      }

      return state
    }
    default:
      return state
  }
}
