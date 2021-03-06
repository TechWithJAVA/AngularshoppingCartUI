import { Product } from 'src/app/Model/product';
import { ApiService } from 'src/app/service/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  products: Product[] = [];
  fileToUpload: File = null;
  showAdd = false;
  //auth: string;

  constructor(private api: ApiService, private router: Router) { }
  imageUrl: string = "/assets/img/noimage.png";

  ngOnInit(): void {

    this.api.getProducts().subscribe(
           res => {
             this.products = res.oblist;
          }
      );
    // if (this.api.isAuthenticated) {
    //   this.auth = this.api.getToken();
    //   this.api.getProducts(this.auth).subscribe(
    //     res => {
    //       this.products = res.oblist;
    //     }
    //   );
    // }
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  show() {
    this.showAdd = true;
  }
  hide() {
    this.showAdd = false;
  }
  addProd(desc, quan, price, prodname, image) {
    this.api.addProduct(desc.value, quan.value, price.value, prodname.value, this.fileToUpload).subscribe(res => {
      this.products = res.oblist;
    });
  }
  delProd(prodid) {
    debugger
    this.api.delProduct(prodid.value).subscribe(res => {
      this.products = res.oblist;
    });

  }
  // edit(prodid) {
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       "user": prodid.value
  //     }
  //   };
  //   this.router.navigate(["admin/edit"], navigationExtras);
  // }

}
