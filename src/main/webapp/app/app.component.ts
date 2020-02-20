import Vue from 'vue';
import Component from 'vue-class-component';
import Ribbon from '@/core/ribbon/ribbon.vue';
import JhiFooter from '@/core/jhi-footer/jhi-footer.vue';
import JhiNavbar from '@/core/jhi-navbar/jhi-navbar.vue';
import BottomNav from './core/bottomnav/bottomnav.vue';

@Component({
  components: {
    ribbon: Ribbon,
    BottomNav,
    'jhi-navbar': JhiNavbar,

    'jhi-footer': JhiFooter
  }
})
export default class App extends Vue {}
