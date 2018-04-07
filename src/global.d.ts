declare namespace TGlobalStore {

  interface ILabsList {
    title: string;
    link: string;
    icon: string;
  }

  interface IState {
    labsLists: TGlobalStore.ILabsList[];
  }
}
