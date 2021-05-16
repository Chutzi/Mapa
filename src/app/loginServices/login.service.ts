import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap, timestamp } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from './usuarios.model';
const { Storage } = Plugins;

export interface LoginResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private usuarioLoggeado = false;

  constructor(private http: HttpClient) {}

  async isLogged() {
    const ret = await Storage.get({ key: 'user' });
    try {
      const user = JSON.parse(ret.value);
      if(user.expiresIn>Date.now())
      {
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  }

  async setUsuarioLoggeado(esta: boolean, response: LoginResponseData) {
    Storage.clear();
    if (!esta) return;
    response.expiresIn = (Date.now()+60000).toString();
    await Storage.set({ key: 'user', value: JSON.stringify(response) });
    return;
  }

  signup(email: string, password: string) {
    return this.http.post<LoginResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseKey}`,
      { email: email, password: password, returnSecureToken: true }
    );
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseKey}`,
      { email: email, password: password, returnSecureToken: true }
    );
  }
}
