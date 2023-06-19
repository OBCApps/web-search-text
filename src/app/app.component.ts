import { Component } from '@angular/core';
import { ServiceService } from './services/service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-search-text';
   // Diseño inputs formulario
  inputNormalLabel : any = "block pl-1 pb-[.1em] text-xs font-medium text-blue-900 dark:text-white";
  inputNormalIn : any = "bg-white border border-gray-300 py-1.5 md:py-2 w-[60vw] lg:w-[20vw] outline-none text-blue-900 text-sm  rounded focus:ring-blue-800 focus:border-blue-700 block w-full p-[2%] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-blue-100 border-blue-100 ";

  // Variables booleanas
  isLoading : boolean = false
  cargarDatos: boolean = false
  sms_loading : any;
  search_in : any = 'local';
  // BUscador
  palabra : any ;
  cantidad : any;
  jsonData : any
  processedData :any = []
  jsonDataList: any[] = [];
  constructor(
    private service : ServiceService,
  ) {}

  search(){
    this.processedData = []
    this.isLoading = true;
    this.sms_loading = "Buscando Palabra"
    const data = {
      "query": this.palabra,
      "cantidad": this.cantidad
    }
    console.log("yo envio", data);
    this.service.get_local(data).subscribe(
      data => {
        this.isLoading = false;
        this.isLoading = false;
        this.processedData = data;
        console.log(data);
        
      }, err => {
        this.isLoading = false;
        this.error_function("Error ")
      }
    )
    console.log("buscar en local");
  }
  search_web(){
    this.processedData = []
    this.isLoading = true;
    this.sms_loading = "Buscando Palabra"
    const data = {
      "query": this.palabra,
      "cantidad": this.cantidad
    }
    console.log("yo envio", data);
    
    this.service.get_web(data).subscribe(
      data => {
        this.isLoading = false;
        this.isLoading = false;
        this.processedData = data;
        console.log(data);
        this.succes_function("Palabra encontrada")
      }, err => {
        this.error_function("Prueba error")
      }
    )
    console.log("buscar en web");
    
  }
  buscar_en(data : any) {
    this.search_in = data;
  }
  cargarDatosf(){
    this.cargarDatos = this.cargarDatos ? false:true
  }
  onFileSelected(event: any) {
    this.isLoading = true;
    this.sms_loading = "Cargando Archivo"
    const fileList: FileList = event.target.files;
    const file: File = fileList[0];
  
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      const jsonContent: string = reader.result as string;
      this.jsonDataList.push(JSON.parse(jsonContent));
      this.isLoading = false;
      console.log(this.jsonDataList);
      
    };
  
    reader.readAsText(file);
    
  }
  cargar_web(){
    this.isLoading = true;
    this.sms_loading = "Procesando Archivos"
    this.service.adjuntar_web(this.jsonDataList).subscribe(
      
      data => {
        this.isLoading = false;
        //this.processedData = data;
        console.log(data);
        this.succes_function("Datos Cargados Correctamente")
      }, err => {
        this.error_function("Hubo un error en cargar los datos")
      }
    )
  }

  cargar_LOCAL(){
    this.isLoading = true;
    this.sms_loading = "Procesando Archivos"
    this.service.adjuntar_web(this.jsonDataList).subscribe(
      
      data => {
        this.isLoading = false;
        //this.processedData = data;
        console.log(data);
        this.succes_function("Datos Cargados Correctamente")
      }, err => {
        this.error_function ("Hubo un error en cargar los datos")
      }
    )
  }

  error_function(sms: any) {
    Swal.fire({
      //position: 'center-end',
      icon: 'error',
      width: 400,
      title: sms,
      showConfirmButton: true,
      customClass: {
        confirmButton: 'error-confirm-buttom',
        icon: 'error-icon'
      }
      //timer: 1500
    })

  }
  succes_function(sms: any) {
    Swal.fire({
      //position: 'center-end',
      icon: 'success',
      width: 400,
      title: sms,
      showConfirmButton: true,
      timer:2000,
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'succes-confirm-buttom',
        icon: 'succes-icon'
        
      }
    })

  }
}
