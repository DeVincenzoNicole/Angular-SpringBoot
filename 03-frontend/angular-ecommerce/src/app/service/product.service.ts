import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})

export class ProductService {


  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }


  getProduct(theProductId: number): Observable<Product> {
    
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);

  }
  

  getProductListPaginate(thePage:number, 
                         thePageSize: number, 
                         theCategoryId: number): Observable<GetResponseProducts> {
    
  // enviar los parametros page y size
  const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
            + `&page=${thePage}&size=${thePageSize}`;

  return this.httpClient.get<GetResponseProducts>(searchUrl);
  
  }

  // Obtener JSON de la lista Productos
  getProductList(theCategoryId: number): Observable<Product[]> {
    
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
       
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);

  }

  // Paginación para elementos de búsqueda
  searchProductsPaginate(thePage:number, 
                        thePageSize: number, 
                        theKeyword: string): Observable<GetResponseProducts> {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);

    }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  // Metodo para obtener las categorias de los productos mediante Observable
  getProductCategories(): Observable<ProductCategory[]> {
    
    // llamada a la API REST, mapea el JSON de Spring data Rest
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );

  }

}

 // Uso de una interfaz para mostrar el JSON de la API REST
  interface GetResponseProducts {
    _embedded: {
      products: Product[];
    },
    page: {
      size:number,
      totalElements: number,
      totalPages: number,
      number: number
    }
  }

interface GetResponseProductCategory {
    _embedded: {
      productCategory: ProductCategory[];
    }
  }
