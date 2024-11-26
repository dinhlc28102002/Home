import { URL_ADMIN } from "./constants";
import { Settings, ShoppingCart, UsersRound, LogOut } from "lucide-react";

export const DataMenu = [
  {
    href: URL_ADMIN.SHOP,
    name: "販売店一覧",
    icon: <ShoppingCart />,
  },
  {
    href: URL_ADMIN.CUSTOMER,
    name: "購入済みお客様一覧",
    icon: <UsersRound />,
  },
  {
    href: URL_ADMIN.SETTING,
    name: "アカウント設定",
    icon: <Settings />,
  },
];
