import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  display: boolean;

  constructor() {
    this.display = false;
  }

  ngOnInit(): void {
   if(localStorage.getItem('token')!=null) {
     this.display = true;
   }
  }

}
