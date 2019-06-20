import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  public testArray = [
    {value: '1', name: '项目一'},
    {value: '2', name: '项目二'},
    {value: '3', name: '项目三'},
  ];

  tempSelectValue: any; // 临时绑定值

  constructor() { }

  ngOnInit() {
  }

}
