import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Plain } from 'src/app/models/plain';

@Component({
  selector: 'app-add-a-plain',
  templateUrl: './add-a-plain.component.html',
  styleUrls: ['./add-a-plain.component.scss']
})
export class AddaplainComponent implements OnInit {

  plain = new Plain();

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void { }

  save() {
    this.http.post(
      'http://localhost:3000/api/plain',
      this.plain
    ).subscribe(
      (data: Plain) => {
        alert("מטוס חדש מסוג " + data.type + " נשמר בהצלחה")//TODO nice popup
        this.router.navigate(['admin', 'dashboard'])
      },
      error => {//TODO nice popup and hebrew names
        alert("השגיאות הבאות התרחשו במהלך השמירה:\n" + error.error.message.toString().replaceAll(',', '\n'))
      }
    )
  }
}
