import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHeader } from '@sharedModule/models/IHeader';
import { HeaderService } from '@sharedModule/service/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public listItemNavBar: Array<IHeader> = [];

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.listItemNavBar = this.headerService.getItemsForNavbar();
    const navSession = sessionStorage.getItem('router');
    const objSession: IHeader = navSession && JSON.parse(navSession);
    this.listItemNavBar.map((item: IHeader, idx: number) => {
      if (!item.selected) {
        if (objSession && objSession.label == item.label) {
          item.selected = true;
          this.router.navigate([item.route]);
        } else if (!objSession) {
          idx == 0 && (item.selected = true);
          this.router.navigate(['']);
        }
      }
    });
    this.ref.detectChanges();
    console.log("...", this.listItemNavBar);
  }

  public redireccionar(itemParam: IHeader): void {
    this.listItemNavBar.map((item: IHeader) => {
      if (itemParam.label == item.label) {
        item.selected = true;
        sessionStorage.setItem('router', JSON.stringify(item));
      } else item.selected = false;
    });
    this.ref.detectChanges();
    this.router.navigate([itemParam.route]);
  }

}
