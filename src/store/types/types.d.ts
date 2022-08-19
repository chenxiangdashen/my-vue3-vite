import { RendererElement, RendererNode, VNode } from "vue";
import { CxRouter } from "../../router/types";

export type MenuPermission = {
  id: string;
  parentId: string;
  path: string;
  name: string;
  icon: string;
  type: string;
  meta: MenuPermissionMeta;
  children: Array<MenuPermission>;
  component: () => Promise<typeof import("*.vue")>;
} & CxRouter;

export type MenuPermissionMeta = {
  title: string;
  index: string | number;
  icon: string;
};

export type ResponsePermission = {
  [key: string]: string;
};

export type ISideMenu = {
  label: string;
  icon?: () => VNode<
    RendererNode,
    RendererElement,
    {
      [key: string]: any;
    }
  >;
  index?: any;
  path: string;
  key: string;
  children?: Array<ISideMenu>;
};
