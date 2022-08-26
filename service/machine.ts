interface ActionTableItem {
  inState: string;
  reading: string;
  write?: string;
  move?: ">" | "<" | "-";
  newState?: string;
  comment?: string;
}

export type ActionTable = ActionTableItem[];

export class TuringMachine {
  private _actionTable?: ActionTable;
  private _state?: string;
  private _tape?: string[];
  private _idx: number = 20;

  private _updateState: Function;
  private _updateIdx: Function;
  private _updateTape: Function;

  private _switch = false;

  constructor(
    updateState: Function,
    updateIdx: Function,
    updateTape: Function
  ) {
    this._updateState = updateState;
    this._updateIdx = updateIdx;
    this._updateTape = updateTape;
  }

  init(initialTape: string[], actionTable: ActionTable, initialState: string) {
    this._tape = [...Array(20).fill(""), ...initialTape, ...Array(20).fill("")];
    this._actionTable = actionTable;
    this._state = initialState;
    this.update();
  }

  step() {
    if (this._actionTable && this._state && this._tape) {
      const cell =
        this._tape[this._idx] == undefined ? "" : this._tape[this._idx];

      const targetIdx = this._actionTable.findIndex((e) => {
        return e.inState === this._state && e.reading === cell;
      });
      if (targetIdx != -1) {
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
        else if (target.move === ">") newIdx++;
        this._idx = newIdx;
      } else {
        this._switch = false;
      }
    } else {
      this._switch = false;
      alert("Please fill the turing machine");
    }
    this.update();
  }

  turnOn() {
    this._switch = true;
  }
  checkSwitch() {
    return this._switch == true;
  }
  update() {
    this._updateState(this._state);
    this._updateIdx(this._idx);
    this._updateTape(this._tape);
  }
}
