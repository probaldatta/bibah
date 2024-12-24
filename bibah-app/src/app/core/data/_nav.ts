import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Language',
    url: 'manage-languages',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Religions',
    url: 'manage-religions',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Castes',
    url: 'manage-castes',
    iconComponent: { name: 'cil-puzzle' }
  },
  // {
  //   name: 'Base',
  //   url: '/base',
  //   iconComponent: { name: 'cil-puzzle' },
  //   children: [
  //     {
  //       name: 'Accordion',
  //       url: '/base/accordion',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Breadcrumbs',
  //       url: '/base/breadcrumbs',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Cards',
  //       url: '/base/cards',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Carousel',
  //       url: '/base/carousel',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Collapse',
  //       url: '/base/collapse',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'List Group',
  //       url: '/base/list-group',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Navs & Tabs',
  //       url: '/base/navs',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/base/pagination',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Placeholder',
  //       url: '/base/placeholder',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/base/popovers',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/base/progress',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Spinners',
  //       url: '/base/spinners',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/base/tables',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/base/tabs',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
];
