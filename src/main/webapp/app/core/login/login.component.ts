import { Component, Inject, Vue } from 'vue-property-decorator';
import { VERSION } from '@/constants';
import LoginService from '@/account/login.service';
import AccountService from '@/account/account.service';
import TranslationService from '@/locale/translation.service';

import StudentSelection from '../Guardian/studentselection/studentselection.vue';
import TeacherDashboard from '../teacher/dashboard/teacherdashboard.vue';
import StudentDashboard from '../student/dashboard/studentdashboard.vue';
import AdminLogout from '../adminLogout/adminlogout.vue';
import AdministrationGuardian from '../Administration/dashboardGuardian/administrationGuardian.vue';

@Component({
  components: {
    StudentSelection,
    TeacherDashboard,
    StudentDashboard,
    AdminLogout,
    AdministrationGuardian
  }
})
export default class Login extends Vue {
  @Inject('loginService')
  private loginService: () => LoginService;
  @Inject('translationService') private translationService: () => TranslationService;

  @Inject('accountService') private accountService: () => AccountService;
  public version = VERSION ? 'v' + VERSION : '';
  private currentLanguage = this.$store.getters.currentLanguage;
  private languages: any = this.$store.getters.languages;

  created() {
    this.translationService().refreshTranslation(this.currentLanguage);
  }

  public subIsActive(input) {
    const paths = Array.isArray(input) ? input : [input];
    return paths.some(path => {
      return this.$route.path.indexOf(path) === 0; // current path starts with this path string
    });
  }

  public changeLanguage(newLanguage: string): void {
    this.translationService().refreshTranslation(newLanguage);
  }

  public isActiveLanguage(key: string): boolean {
    return key === this.$store.getters.currentLanguage;
  }

  public logout(): void {
    this.loginService()
      .logout()
      .then(response => {
        this.$store.commit('logout');
        this.$router.push('/');
        const data = response.data;
        let logoutUrl = data.logoutUrl;
        // if Keycloak, uri has protocol/openid-connect/token
        if (logoutUrl.indexOf('/protocol') > -1) {
          logoutUrl = logoutUrl + '?redirect_uri=' + window.location.origin;
        } else {
          // Okta
          logoutUrl = logoutUrl + '?id_token_hint=' + data.idToken + '&post_logout_redirect_uri=' + window.location.origin;
        }
        window.location.href = logoutUrl;
      });
  }

  public openLogin(): void {
    this.loginService().login();
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public hasAnyAuthority(authorities: any): boolean {
    return this.accountService().hasAnyAuthority(authorities);
  }

  public get swaggerEnabled(): boolean {
    return this.$store.getters.activeProfiles.indexOf('swagger') > -1;
  }

  public get inProduction(): boolean {
    return this.$store.getters.activeProfiles.indexOf('prod') > -1;
  }
}
