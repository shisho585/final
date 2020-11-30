import { Component, OnInit, Inject } from '@angular/core';
import { DialogComponent } from '../../orders/dialog/dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-errors',
  templateUrl: './dialog-errors.component.html',
  styleUrls: ['./dialog-errors.component.scss']
})
export class DialogErrorsComponent implements OnInit {

  messages: string[];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {
    this.messages = message.split('\n')
  }

  ngOnInit(): void {
  }

}
