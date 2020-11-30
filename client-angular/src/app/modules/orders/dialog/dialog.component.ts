import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit {

  loggedIn = this.name != null;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public name: string
  ) { }

  ngAfterViewInit(): void {
    document.getElementById('focus').focus();
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(
      event => {
        if (event.key == 'Escape') {
          this.cancel();
        }
      }
    )
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

  loginPlease() {
    this.loggedIn = false;
  }

}
