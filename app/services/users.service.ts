import { Injectable } from '@angular/core';
import { UserAction } from '../models/userAction';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private actions: UserAction[] = [];

 
  logAction(name: string, product: string) {
    const newAction: UserAction = {
      timestamp: new Date(),
      actionName: name,
      productName: product
    };
    this.actions.push(newAction);
    console.log('פעולה נרשמה:', newAction);
  }

  
  getActions(): UserAction[] {
    return [...this.actions]; 
  }
}
