import * as Actions from "../actions/types";

/* State Shape
{
    vscode: {
      isVsCodeApiAcquired: boolean,
      vscode: any
    }
}
*/

export interface IVSCode {
  vscode: IVSCodeAPI;
}

interface IVSCodeAPI {
  isVsCodeApiAcquired: boolean;
  vscodeObject: any;
}

/**
 * Models the functionality of acquireVsCodeApi() from vscode for use
 * in development environment.
 * 
 * Returns type "any" because the VSCode API type is not known in the client. 
 */
const mockVsCodeApi = (): any => ({
  postMessage: ({ command, alert }: { command: string; alert: string }) => {
      console.log(`Command is ${command}, alert is ${alert}`);
  },
});

function vscodeApi(
  state = {
    isVsCodeApiAcquired: false,
    vscodeObject: undefined
  },
  action: {
    type: string
  }
) {
  switch (action.type) {
    case Actions.GET_VSCODE_API:
      if (!state.isVsCodeApiAcquired) {
        const newState = { ...state };
        newState.isVsCodeApiAcquired = true;
        newState.vscodeObject =
          process.env.NODE_ENV === "production"
            ? 
            // @ts-ignore because function does not exist in dev environment
            acquireVsCodeApi()
            : mockVsCodeApi();
        return newState;
      }
      return state;
    default:
      return state;
  }
}

export default vscodeApi;
