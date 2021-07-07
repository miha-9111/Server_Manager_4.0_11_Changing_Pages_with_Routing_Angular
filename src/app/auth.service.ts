export class AuthService {
  loggedIn = false;

  //147 метод перекидывает через 800мс на начальный экран если пользователь не вошел, либо вошел
  isAuthenticated() {
    return new Promise<boolean>(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      }
    );
  }

  //147 метод для переключения loggedIn в true - открыт доступ к servers
  login() {
    this.loggedIn = true;
  }

  //147 метод для переключения loggedIn в false - закрыт доступ к servers
  logout() {
    this.loggedIn = false;
  }
}
