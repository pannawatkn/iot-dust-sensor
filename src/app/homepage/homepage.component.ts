import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  valueList: AngularFireList<any>;
  values: any[];

  constructor(db: AngularFireDatabase){
     this.valueList = db.list('/Sensor');
  }

  ngOnInit() {
    this.valueList.snapshotChanges().pipe(map(actions => {
      return actions.map(action => ({key:action.key, value:action.payload.val()}));
    })).subscribe(items => {
      this.values = items;
    });
  }
}
