import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { product } from '../../../models/Product';
import axios from 'axios';
import { AddproductService } from 'src/app/service/addproduct.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from'sweetalert2';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';
  newProductoId:number=0;
  constructor(private addProductService:AddproductService,
    private router: Router) { }

  public newProductForm = new FormGroup({
    codigoProducto: new FormControl('', Validators.required),
    nombreProducto : new FormControl('', Validators.required),
    descripcion : new FormControl('', Validators.required),
    stock : new FormControl('', Validators.required),
    precio : new FormControl('', Validators.required),
    administradorId : new FormControl(0, Validators.required)
  });

  ngOnInit(): void {
    function setTwoNumberDecimal(event) {
      this.value = parseFloat(this.value).toFixed(2);
  }
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }


  async addNewProduct(data: product){
    var id = localStorage.getItem('userId');
    console.log(this.newProductForm.value);
    this.newProductForm.value.administradorId = id;

    if(this.newProductForm.valid){
      let self = this
      console.log("EJECUTANDO METODO PARA AGREGAR PRODUCTO");
      var api = 'http://localhost:8080/products';
      
      data.administradorId=parseInt(id);
      data.status=1;
      console.log('New Product : ', data);
      axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
      await axios.post(api,data).then(function (result){
      console.log(result.data);
      console.log(result.data.id);
      let value:number=result.data.id || 0;
      self.newProductoId=value;

      });
      this.upload();
      this.successNotificationLogin();
    }else{

      this.wrongNotificationLogin('Complete los espacios vacíos')
    }

    
  }

  upload(): void {
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        console.log("ARCHIVO");
        console.log(this.currentFile);
        this.addProductService.uploadImageProduct(this.currentFile,this.newProductoId).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              console.log(Math.round(100 * event.loaded / event.total));

            } else if (event instanceof HttpResponse) {
              this.message = event.body.responseMessage;
            }
          },
          (err: any) => {
            console.log(err);

            if (err.error && err.error.responseMessage) {
              this.errorMsg = err.error.responseMessage;
            } else {
              this.errorMsg = 'Error occurred while uploading a file!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
    this.router.navigateByUrl('/providerdashboard');
  }
  wrongNotificationLogin(mensaje:string){
    Swal.fire({
      icon: 'error',
      title: 'No se pudo registrar producto',
      text: mensaje,
    })
  }
  successNotificationLogin(){
    Swal.fire({
      title: 'REGISTRO EXITOSO',
      text: 'La operacion se ha realizado completamente',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    }).then(async (result) => {
      if (result.value) {
        await this.router.navigateByUrl('/providerdashboard/saved-items');
        //window.location.href="http://localhost:4200"
      }
    })
  } 
  
}
