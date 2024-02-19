/** Get notepad content event **/
export class NotepadGet {
    static readonly type = '[notepad] NotepadGet';
    constructor(public payload) {}
  }
  
  /** Update notepad content event **/
  export class NotepadUpdate {
    static readonly type = '[notepad] NotepadUpdate';
    constructor(public payload) {}
  }
  