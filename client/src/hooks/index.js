import { useReducer } from "react";

export * from "./useAuth";
export * from "./useRandomPosition";
export * from "./useMusic";
export * from "./usePhoneAwake";

export const useToggle = init => useReducer(s => !s, init);
