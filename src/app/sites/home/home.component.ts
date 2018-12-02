import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  home1Icons = [
    'devicon-html5-plain',
    'devicon-css3-plain',
    'devicon-javascript-plain',
    'devicon-php-plain',
    'devicon-java-plain',
    'devicon-c-plain',
    'devicon-cplusplus-plain',
    'devicon-csharp-plain',
    'devicon-mysql-plain',
    'devicon-mongodb-plain',
    'devicon-postgresql-plain',
    'devicon-sourcetree-plain',
    'devicon-photoshop-plain',
    'devicon-illustrator-plain'
  ];
  activeIcon = this.home1Icons[0];
  activeIconCounter = -1;
  startedHome1Animation = false;

  constructor() { }

  ngOnInit() {

    setInterval(() => {
      this.startedHome1Animation = true;
      this.activeIconCounter++;
      if (this.activeIconCounter === this.home1Icons.length) {
        this.activeIconCounter = 0;
      }
      this.activeIcon = this.home1Icons[this.activeIconCounter];
    }, 3000);

  }

}
