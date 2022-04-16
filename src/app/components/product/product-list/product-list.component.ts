import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ProductListService } from 'src/app/service/product-list.service';
import { Size } from 'src/app/models/Size';
import { Color } from 'src/app/models/Color';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { product } from 'src/app/models/Product';
import { ProductDetails } from 'src/app/models/ProductDetails';
import { HomeProductService } from 'src/app/service/home-product.service';

@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  products:ProductDetails[] = [];
  listTallas:Size[]=[{id:0, nombreTalla:"TALLA"}];
  listColores:Color[]=[{id:0, descripcion:"COLOR"}];
  userForm:FormGroup;
  constructor(private productListService:ProductListService,
    private fb:FormBuilder,
    private homeProductService:HomeProductService) {
    }

  async ngOnInit(): Promise<void> {
     setTimeout(() => {
       //this.products = productsDB.Product;
        this.getAllProductsData();
        this.isLoaded = true
      }, 1000)

      this.userForm = this.fb.group({
        pruductName: ['', Validators.required],
        talla: new FormControl(this.listTallas[0]),
        color: new FormControl(this.listColores[0]),
      });
    await this.getSizesData();
    await this.getColoursData();
    this.products = await this.getAllProductsDataDetails();    
    await this.getFotoImages();
    

  }

  getAllProductsData(){
    var api = 'http://localhost:8080/products';
    axios.get(api).then(function (result){
      console.log(result);
    })
  }
  getSizesData(){
    this.productListService.getListTallas().toPromise().then((response) => {
      console.log("LA RESPUESTA ES: ");
      console.log(response);
      this.listTallas=response;
    }).catch(e => console.error(e));

    console.log(this.listTallas);
  }
  getColoursData(){
    this.productListService.getListColours().toPromise().then((response) => {
      console.log("LA RESPUESTA ES: ");
      console.log(response);
      this.listColores=response;
    }).catch(e => console.error(e));

    console.log(this.listTallas);
  }
  filtro():void{

    console.log(this.userForm.value);
  }
  async getAllProductsDataDetails(){
    let respuesta;
    console.log("PRIMER METODO");
    await this.homeProductService.getListProducts().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));

    return respuesta;
  }
  async getFotoImages(){
    console.log(this.products);
    console.log("ACCESO")
    for(let i=0;i<this.products.length;i++){
      
      let cad=await this.addImage(this.products[i].idProducto)
      let arrCad:string[]=cad.split("/");
      this.products[i].image=`http://localhost:8080/products/image/${arrCad[0]}/${arrCad[1]}`
      
      console.log("la cadena es: "+this.products[i].image);
    }
    console.log(this.products);
  }
  async addImage(idProducto:number){
    let cadena;
    await this.homeProductService.getFirstImageByProductId(idProducto).toPromise().then((response) => {
      console.log("LA RESPUESTA ES: ");
        console.log(response.foto);
        cadena=response.foto
    }).catch(e => console.error(e));
    
    return cadena;
  }
}
