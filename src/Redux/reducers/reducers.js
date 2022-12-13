const initialState = {
  isConnect: false,
  provider: null,
  isCorrect: false,
};

export function walletReducer(state = initialState, action) {
  switch (action.type) {
    case "CONNECT_WALLET":
      localStorage.setItem(
        "walletConnect",
        JSON.stringify({ isConnect: action.status })
      );
      return { ...state, isConnect: action.status };
    case "DISCONNECT_WALLET":
      localStorage.clear();
      return { ...state, isConnect: action.status };
    case "WALLET_PROVIDER":
      return { ...state, provider: action.provider };
    case "IS_NETWOKR_CORRECT":
      return { ...state, isCorrect: action.status };
    default:
      return state;
  }
}
