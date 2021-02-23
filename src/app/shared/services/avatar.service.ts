import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  public avatarPath: string;

  constructor() { }

  public generateGravatar(): string {
    const random = Math.floor(1000 + Math.random() * 9000);
    return this.avatarPath = `https://www.gravatar.com/avatar/94d093eda664addd6e450d7e${random}bcad?s=80&d=identicon&r=PG`;
  }
}
