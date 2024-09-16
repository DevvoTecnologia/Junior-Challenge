import { createContext, useContext, useReducer } from "react";

export type DB = {
  id: number;
  imgRing?: string;
  nameRing: string;
  powerRing: string;
  holder: string;
  forger: string;
};

interface RingTips {
  rings: Array<DB>;
}

interface DispatchRings {
  dispatch: React.Dispatch<React.SetStateAction<Array<DB>>>;
}

const RingsContext = createContext<RingTips | undefined>(undefined);
RingsContext.displayName = "rings";

const RingsDispatchContext = createContext<DispatchRings | undefined>(
  undefined
);
RingsDispatchContext.displayName = "ringsDispatch";

export const ringsContext = () => {
  const [rings, dispatch] = useReducer(ringsReducer, initialRings);
};


export function useTasks() {
    return useContext(RingsContext);
  }
  
  export function useTasksDispatch() {
    return useContext(RingsDispatchContext);
  }
  
  function ringsReducer
  (tasks, action) {
    switch (action.type) {
      case 'added': {
        return [...tasks, {
          id: action.id,
          text: action.text,
          done: false
        }];
      }
      case 'changed': {
        return tasks.map(t => {
          if (t.id === action.task.id) {
            return action.task;
          } else {
            return t;
          }
        });
      }
      case 'deleted': {
        return tasks.filter(t => t.id !== action.id);
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
  
  const initialTasks = [
    { id: 0, text: 'Philosopher’s Path', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink matcha', done: false }
  ];