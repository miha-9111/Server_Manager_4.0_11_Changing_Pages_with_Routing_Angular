import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { ServersService } from '../servers.service';
import { Observable } from 'rxjs';

//152 интерфейс для Server
interface Server {
  id: number;
  name: string;
  status: string;
}

//152 делаем внедрение в конструктор ServersService
@Injectable()
//152 класс ServerResolver реализует Resolve в дженерик-типом Server из интерфейса
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  //152 сам метод resolve
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    //152 возвращаем из serversService метод getServer с параметрами +route.params['id']
    return this.serversService.getServer(+route.params['id'])!;
  }
}
