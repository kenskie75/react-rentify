import { Routes } from "./Routes.enum";

export type SidebarItem = {
    title:string;
    route:Routes
    subitem:SubType[]
}

export type SubType = {
    title:string;
    route:Routes
}