import {Component, OnInit} from
    '@angular/core';
import { slideInOut } from 'src/app/_core/animations/sidenav-animation';
import { Subscription } from 'rxjs';
import {User} from "../../../_core/models/user.model";
import {SIDENAV_DROPDOWN} from "../../../_core/constants/constants";
import {Sidenav} from "../../../_core/interfaces/sidenav.interface";;

@Component({
  selector: 'app-sidedropdown',
  templateUrl: './sidedropdown.component.html',
  styleUrls: ['./sidedropdown.component.scss'],
  animations: [slideInOut]
})
export class SidedropdownComponent implements OnInit {
  showMenu: boolean = false;
  user: User;

  subscription: Subscription = new Subscription();
  SideDropDownItems: Sidenav[] = SIDENAV_DROPDOWN;

  constructor() {
  }

  ngOnInit(): void {}

  toggle1(): void {
   this.showMenu = !this.showMenu
  }

}
