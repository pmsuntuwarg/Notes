import { Component, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/service/data.service';
import { Note } from 'src/interface/note';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DataResult } from 'src/interface/data-result';
import { ResultStatus } from 'src/common/enum/result-status';

@Component({
  selector : 'note-form',
  templateUrl: './note-form.component.html'
})

export class NoteFormComponent {
  @Output() note: EventEmitter<Note> = new EventEmitter<Note>();
  notes: any;

  form = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private _dateService: DataService<Note>) {
    _dateService.controllerName = 'note';
  }

  addNote() {
    if (this.form.valid) {
      const formdata: Note = Object.assign({}, this.form.value);
      this._dateService.create(formdata).subscribe((res) => {
        if (res.status == ResultStatus.Success) {
          this.note.emit(res.data);
          return;
        }
        console.log(res.message);
        //TODO: Toaster here - error toaster
      });
    }
  }
}
