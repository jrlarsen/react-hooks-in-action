export default function reducer (state, action) {
  switch (action.type) {
    case "SET_GROUP":
      return {
        ...state,
        group: action.payload,
        bookableIndex: 0
      };

    case "SET_BOOKABLE":
      return {
        ...state,
        bookableIndex: action.payload
      };

    case "TOGGLE_HAS_DETAILS":
      return {
        ...state,
        hasDetails: !state.hasDetails
      };

    case "NEXT_BOOKABLE":
      const count = state.bookables.filter(b => b.group === state.group).length;
      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % count
      };

    case "FETCH_BOOKABLES_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: false,
        bookables: []
      };

    case "FETCH_BOOKABLES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        bookables: action.payload
      };

    case "FETCH_BOOKABLES_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}