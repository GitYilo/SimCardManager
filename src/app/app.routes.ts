import { Routes } from '@angular/router';
import { ListComponent } from './component/list/list.component';
import { DetallesComponent } from './component/detalles/detalles.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'crud',component:ListComponent},
    {path:'add',component:DetallesComponent},
    {path:'edit/:id',component:DetallesComponent},
    {path:'**',redirectTo:'',pathMatch:'full'}
];
