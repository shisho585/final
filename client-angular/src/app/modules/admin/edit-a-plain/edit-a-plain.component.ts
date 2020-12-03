import { Component, OnInit } from '@angular/core';
import { Plain } from 'src/app/models/plain';
import { AdminService } from '../admin.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-a-plain',
  templateUrl: './edit-a-plain.component.html',
  styleUrls: ['./edit-a-plain.component.scss']
})
export class EditaplainComponent implements OnInit {

  plain = new Plain();

  constructor(
    private route: ActivatedRoute,
    private service: AdminService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    let id;
    if (id = this.route.snapshot.paramMap.get('ID')) {
      this.service.getPlain(id).subscribe(
        plain => {
          this.plain = plain;
        }
      )
    }
  }

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
