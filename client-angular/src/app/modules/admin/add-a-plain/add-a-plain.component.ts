import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Plain } from 'src/app/models/plain';
import { AdminService } from '../admin.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-a-plain',
  templateUrl: './add-a-plain.component.html',
  styleUrls: ['./add-a-plain.component.scss']
})
export class AddaplainComponent implements OnInit {

  plain = new Plain();

  constructor(
    private service: AdminService,
    private appService: AppService
  ) { }

  ngOnInit(): void { }

  save() {
    this.service.createPlain(this.plain).subscribe(
      (data: Plain) => {
        this.appService.openMessageDialog("מטוס חדש מסוג " + data.type + " נשמר בהצלחה");
        this.service.navigateToHome();
      },
      error => {//TODO nice popup and hebrew names
        const headerError = "השגיאות הבאות התרחשו במהלך השמירה";
        const messageError = error.error.message.toString().replaceAll(',', '\n');
        this.appService.openMessageDialog(messageError, headerError);
      }
    )
  }
}
