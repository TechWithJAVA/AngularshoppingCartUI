import { Product } from './../../../../Angular-Springboot-master/src/app/Model/product';
import { User } from './../Model/user';
import { Injectable,Inject} from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private LOGU_API = "http://localhost:8080/user/verify";
  private LOGA_API = "http://localhost:8080/admin/verify";
  private REG_API = "http://localhost:8080/user/signup";
  private PRDLST_API = "http://localhost:8080/user/getProducts";
  private ADD_PRD_API = "http://localhost:8080/admin/addProduct";
  private DEL_PRD_API = "http://localhost:8080/admin/delProduct";
  private ADD_CART_API = "http://localhost:8080/user/addToCart?productId=";

  constructor(private http: HttpClient) { }

  // validating user credentials
  userLogin(user: User): Observable<any> {
    return this.http.post(this.LOGU_API,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }

   // validating admin credentials
   adminLogin(user: User): Observable<any> {
    return this.http.post(this.LOGA_API,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }

  // Registering the users to the database
  register(user: User): Observable<any> {
    return this.http.post(this.REG_API,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }

  // Fetching all the products from the database
  getProducts(): Observable<any> {

   // const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.post<any>(this.PRDLST_API, null);

  }

  // Add product for Logged AdminUser

  addProduct(desc: string,
    quan: string, price: string, prodname: string, image: File): Observable<any> {

    const formData: FormData = new FormData();
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("productname", prodname);
    formData.append("quantity", quan);
    formData.append("file", image);

    return this.http.post<any>(this.ADD_PRD_API, formData);

  }

  // delete Product for Logged Admin User
  delProduct(prodid: number) {
    return this.http.get<any>(this.DEL_PRD_API + "?productId=" + prodid)
  }

   // Add Products to the user Cart
   addCartItems(product: Product): Observable<any> {
    
    return this.http.get<any>(this.ADD_CART_API + product.productid);
  }


}
