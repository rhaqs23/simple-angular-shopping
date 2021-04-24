import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productName;
  price;
  description;
  productImg;
  imageData;
  productsForm: FormGroup;
  submitted = false;
  products;

  getProducts() {
    this.products = JSON.parse(localStorage.getItem('products'));
  }

  constructor(private formBuilder: FormBuilder) { }

  buildForm() {
    this.productsForm =this.formBuilder.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get productFormControls() { return this.productsForm.controls; }
  get localStorageLength() { return localStorage.length; }

  getFormData() {
    this.productName = this.productFormControls.productName.value;
    this.price = this.productFormControls.price.value;
    this.description = this.productFormControls.description.value;
    if(this.productImg != undefined) {
      let productObj = {
        "name": this.productName,
        "price": this.price,
        "description": this.description,
        "image": this.imageData}

      let products = { "products": [productObj] }

      if (this.localStorageLength === 0) {
        window.localStorage.setItem("products", JSON.stringify(products));
          console.log('if')
      } else {
        let newProducts = JSON.parse(localStorage.getItem('products'));
        console.log(newProducts);
        newProducts.products.push(productObj);
        products = {"products": newProducts.products}
        window.localStorage.setItem("products", JSON.stringify(products));
      }

    }
  }

  clearForm() {
    this.productFormControls.productName.setValue('');
    this.productFormControls.price.setValue('');
    this.productFormControls.description.setValue('');
    this.submitted = false;
  }


  ngOnInit(): void {
    this.getProducts();
    this.buildForm();
  }

  onSubmit() {
    this.submitted = true;
    if (this.productsForm.valid) {
      this.getFormData();
      this.clearForm();
      alert('New Product Added Succefully!!');
      window.location.reload();
    }
  }

  uploadImage(file){
    this.productImg = file[0] as File;
    const reader = new FileReader();

    reader.onload = () => {
      this.imageData = reader.result;
    }
    reader.readAsDataURL(this.productImg);
  }

  removeProduct(i){
    let productArray = JSON.parse(localStorage.getItem('products'));
    productArray.products.splice(i, 1);
    window.localStorage.setItem("products", JSON.stringify({"products": productArray.products}));
    window.location.reload();
  }

}
