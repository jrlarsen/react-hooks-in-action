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
      const count = state.bookables.filter(
        b => b.group === state.group
      ).length;

      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % count
      };

    default:
      return state;
  }
}