import { Component, Inject, Vue } from 'vue-property-decorator';
import { VERSION } from '@/constants';
import LoginService from '@/account/login.service';
import AccountService from '@/account/account.service';
import TranslationService from '@/locale/translation.service';

import HeaderBell from '../header/teacherheader.vue';
import BottomNav from '../navbar/navbar.vue';
import { mapGetters } from 'vuex';

@Component({
  components: {
    HeaderBell,
    BottomNav
  },
  computed: {
    ...mapGetters(['teacherName', 'teacherPhoto', 'teacherEmail', 'teacherPhone'])
  }
})
export default class SettingsTeacher extends Vue {
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

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }
}
