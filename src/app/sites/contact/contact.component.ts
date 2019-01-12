import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  title = 'Wydział Elektrotechniki i Informatyki Politechniki Rzeszowskiej, Wincentego Pola 2, 35-021 Rzeszów';
  lat = 50.026855;
  lng = 21.985526;
  zoom = 13;

  constructor() { }

  ngOnInit() {
  }

}
