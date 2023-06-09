import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string | null = null;
  private userId: number | null = null;
  constructor() { }


  isLoggedIn(): boolean {
    console.log('!!this.accessToken', !!this.accessToken)
    return !!this.accessToken;
  }

  logout(): void {
    this.accessToken = null;
  }


  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setUserId(userId: number): void {
    console.log('userId----------------', userId)
    this.userId = userId;
  }

  getUserId(): number | null {
    return this.userId;
  }
}
