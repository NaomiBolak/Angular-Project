import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../../services/users.service';
import { UserAction } from '../../models/userAction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users implements OnInit {
  actions: UserAction[] = [];
  isAscending: boolean = false;

  constructor(private trackingService: TrackingService) {}

  ngOnInit() {
    this.actions = this.trackingService.getActions();
  }

  toggleSort() {
    this.isAscending = !this.isAscending;
    this.actions.sort((a, b) => {
      const dateA = a.timestamp.getTime();
      const dateB = b.timestamp.getTime();
      return this.isAscending ? dateA - dateB : dateB - dateA;
    });
  }
}
