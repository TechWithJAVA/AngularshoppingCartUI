import { ApiService } from 'src/app/service/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  loggedType: string;
  constructor(private auth: ApiService, private route: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.route.navigate(['/welcome']);
  }

}
