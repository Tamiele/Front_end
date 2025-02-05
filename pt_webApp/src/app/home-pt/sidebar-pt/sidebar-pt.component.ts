import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar-pt',
  templateUrl: './sidebar-pt.component.html',
  styleUrls: ['./sidebar-pt.component.scss'], // Corretto "styleUrl" in "styleUrls"
})
export class SidebarPtComponent implements OnInit, OnDestroy {
  userRoles: string[] = [];
  private userSubscription!: Subscription;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.authSubject$.subscribe((user) => {
      this.userRoles = user?.user?.roles || [];
    });
  }

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
