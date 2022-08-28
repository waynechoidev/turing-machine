interface ActionTableItem {
  inState: string;
  reading: string;
  write?: string;
  move?: ">" | "<" | "-";
  newState?: string;
  comment?: string;
}

export type ActionTable = ActionTableItem[];

export class UniversalTuringMachine {
  private _actionTable?: ActionTable;
  private _state?: string;
  private _tape?: string[];
  private _idx: number = 50;

  private _updateState: Function;
  private _updateIdx: Function;
  private _updateTape: Function;

  private _switch = false;
  private _updateSwitch: Function;

  constructor(
    updateSwitch: Function,
    updateState: Function,
    updateIdx: Function,
    updateTape: Function
  ) {
    this._updateSwitch = updateSwitch;
    this._updateState = updateState;
    this._updateIdx = updateIdx;
    this._updateTape = updateTape;
  }

  init(
    initialTape: string[],
    actionTable: ActionTable,
    initialState: string,
    blank: string
  ) {
    this._tape = [
      ...Array(50).fill(blank),
      ...initialTape,
      ...Array(50).fill(blank),
    ];
    this._actionTable = actionTable;
    this._state = initialState;
    this._idx = 50;
    this.update();
  }

  step() {
    if (this._actionTable && this._state && this._tape) {
      const cell =
        this._tape[this._idx] == undefined ? "" : this._tape[this._idx];

      const targetIdx = this._actionTable.findIndex((e) => {
        return e.inState === this._state && e.reading === cell;
      });
      if (targetIdx != -1 && this._tape[this._idx] != undefined) {
        const target = this._actionTable[targetIdx];

        let newIdx: number = this._idx;

        const newTape = [...this._tape];
        if (typeof target.write === "string") newTape[this._idx] = target.write;
        this._tape = newTape;

        if (target.newState) {
          const newState = target.newState;
          this._state = newState;
        }

        if (target.move === "<" && this._idx > 0) newIdx--;
        else if (target.move === ">" && this._idx < this._tape.length) newIdx++;

        this._idx = newIdx;
      } else {
        this.turnOff();
      }
    } else {
      this.turnOff();
      alert("Please fill the turing machine");
    }
    this.update();
  }

  turnOn() {
    this._switch = true;
    this._updateSwitch(true);
  }
  turnOff() {
    this._switch = false;
    this._updateSwitch(false);
  }
  checkSwitch() {
    return this._switch;
  }
  update() {
    this._updateState(this._state);
    this._updateIdx(this._idx);
    this._updateTape(this._tape);
  }
}
