import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import {ToastrService } from 'ngx-toastr';
import { DetallesComponent } from '../detalles/detalles.component';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, ProgressBarComponent,DetallesComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  listProductos: Product[] = []
  loading: boolean = false;
  

  constructor(private toastr: ToastrService,private _productService: ProductService) {
  }
  ngOnInit(): void {
    this.getListProduct();
  }
  getListProduct() {
    this.loading = true;
    this._productService.getListProductService().subscribe((data: Product[]) => {
      this.listProductos = data;
      this.loading = false;
    })
  }
  deleteProduct(id: number) {
    this._productService.deleteProductService(id).subscribe(() => {
      this.getListProduct();
      this.toastr.success('Se eliminó el producto','producto');
    })
  }

}
