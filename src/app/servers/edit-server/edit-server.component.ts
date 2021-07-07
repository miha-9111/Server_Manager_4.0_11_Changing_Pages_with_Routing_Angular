import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from "rxjs";

import { ServersService } from '../servers.service';
//150 делаем импорт CanComponentDeactivate
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
//150 подключаем к компоненту EditServerComponent - CanComponentDeactivate
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server!: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  //150.1 создаем свойство changesSaved (для сохранения изменения) по умолчанию - false
  changesSaved = false;

  //150.1 внедряем Router
  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      );
    this.route.fragment.subscribe();
    //150 Subscribe route params to update the id if params change
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id)!;

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    //150.2 в методе onUpdateServer переводим в true
    this.changesSaved = true;
    //150.3 перебрасываем назад на уровень
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  //150 метод canDeactivate
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
