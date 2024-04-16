import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from './../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent implements OnInit{
  detallesForm: FormGroup; 
  id:number;
  
  constructor(private fb:FormBuilder,private _productService:ProductService,private toastr: ToastrService,private router:Router,private aroute:ActivatedRoute){
    this.id=Number(aroute.snapshot.paramMap.get('id'));
      this.detallesForm =fb.group({
        imei: ['',[Validators.required,Validators.maxLength(10)]],
        name: ['',Validators.required],
        description: ['',Validators.required],
        enabled: ['',Validators.required],
        ownerfullname: ['',Validators.required]
      })
  }
  ngOnInit(): void {
    if (this.id!=0) {
      this.EditSimCard(this.id);
    }
  }
  
  /**
   * AddSimCard
   */
 AddSimCard() {
  /**
   * console.log(this.detallesForm.value.imei);
    console.log(this.detallesForm.get('imei')?.value);
   */
    const simcard: Product ={
      imei:this.detallesForm.value.imei,
      name:this.detallesForm.value.name,
      description:this.detallesForm.value.description,
      enabled:this.detallesForm.value.enabled,
      ownerfullname:this.detallesForm.value.ownerfullname,
    }
    if (this.id!==0) {
      simcard.id=this.id;
      this._productService.updateProductService(this.id,simcard).subscribe(()=>{
        this.toastr.success('Se ha actualizado el producto');
      })
    }else{
    this._productService.createProductService(simcard).subscribe(()=>{
      this.toastr.success('Se ha creado el producto');

    })}
    this.router.navigate(['/crud']);
  }
  public EditSimCard(id:Number) {
    /**
     * console.log(this.detallesForm.value.imei);
      console.log(this.detallesForm.get('imei')?.value);
     */
      this._productService.getProductService(id).subscribe((data:Product)=>{
        console.log(data);
        this.detallesForm.setValue({
          imei:data.imei,
          name:data.name,
          description:data.description,
          enabled:data.enabled,
          ownerfullname:data.ownerfullname,
        })
      })
    }
 
}
