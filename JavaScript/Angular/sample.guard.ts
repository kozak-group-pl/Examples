import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { LocalStorageService } from 'ngx-localstorage';
import * as moment from 'moment-timezone';

import { AuthState } from '../store/states/auth.state';
import { RouterTenantPipe } from '../pipes/router-tenant.pipe';
import { AuthByToken, Logout } from '../store/actions/auth.action';
import { take } from 'rxjs/operators';

/** Guard to check if user is signed in **/
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private routerTenantPipe: RouterTenantPipe,
    private readonly localStorageService: LocalStorageService,
  ) {}

  /**
   * guard for router; checks for current auth status & redirects user to login page
   */
  canActivate(): Promise<boolean> {
    const accessToken = this.localStorageService.get('accessToken');
    const refreshToken = this.localStorageService.get('refreshToken');
    const userId = this.localStorageService.get('userId');

    return new Promise((resolve) => {
      if (accessToken && refreshToken && userId) {
        const timezone = moment.tz.guess();

        this.store.dispatch(new AuthByToken({ accessToken, refreshToken, userId, timezone })).subscribe(
          () => {
            const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
            const location = window.location.pathname.split('/');

            if (!isAuthenticated) {
              this.router.navigate([this.routerTenantPipe.transform('auth/login')]);
              resolve(false);
            } else if (location[3] && location[3] === 'reset-password') {
              this.store
                .dispatch(new Logout({}))
                .pipe(take(1))
                .subscribe(() => window.location.reload());
            }

            resolve(true);
          },
          () => {
            this.router.navigate([this.routerTenantPipe.transform('auth/login')]);
            resolve(false);
          },
        );
      } else {
        this.router.navigate([this.routerTenantPipe.transform('auth/login')]);
        resolve(false);
      }
    });
  }
}
