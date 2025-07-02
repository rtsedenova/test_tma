type StepState = { step: 'awaiting_title' | 'awaiting_description' | 'awaiting_photo'; title?: string; description?: string };
const state: Record<number, StepState> = {};

export function setState(chatId: number, newState: StepState) {
  state[chatId] = newState;
}

export function getState(chatId: number): StepState | undefined {
  return state[chatId];
}

export function clearState(chatId: number) {
  delete state[chatId];
}
