import { TuringMachine } from "./example";
import { UniversalTuringMachine } from "./universal_machine";

export async function play(utm: UniversalTuringMachine) {
  utm.step();
  utm.turnOn();
  const timer = setInterval(() => {
    if (utm.checkSwitch()) utm.step();
    else clearInterval(timer);
  }, 700);
}
export function pause(utm: UniversalTuringMachine) {
  utm.turnOff();
}
export function reset(
  utm: UniversalTuringMachine,
  machine: TuringMachine,
  input: string,
  label: string
) {
  const blank =
    label === "3-State Busy Beaver" ||
    label === "4-State Busy Beaver" ||
    label === "Copy 1s"
      ? "0"
      : "";
  utm.turnOff();
  utm.init(input.split(""), machine.actionTable, machine.initialState, blank);
}
export function step(utm: UniversalTuringMachine) {
  utm.turnOff();
  utm.step();
}
