import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    //run automatically when component instantiated
    this.authService.logout().subscribe(response => {
      this.router.navigate(['/'])
    })

  }

}
