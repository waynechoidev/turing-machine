import { TuringMachine } from "./example";
import { UniversalTuringMachine } from "./universal_machine";

export async function play(utm: UniversalTuringMachine) {
  utm.step();
  utm.turnOn();
  const timer = setInterval(() => {
    if (utm.checkSwitch()) utm.step();
    else clearInterval(timer);
  }, 1000);
}
export function pause(utm: UniversalTuringMachine) {
  utm.turnOff();
}
export function reset(
  utm: UniversalTuringMachine,
  machine: TuringMachine,
  input: string
) {
  utm.turnOff();
  utm.init(input.split(""), machine.actionTable, machine.initialState);
}
export function step(utm: UniversalTuringMachine) {
  utm.turnOff();
  utm.step();
}
