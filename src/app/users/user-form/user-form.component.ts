import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import User from '../../types/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({  
  selector: 'app-user-form',
  imports: [MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  formBuilder=inject(FormBuilder);
  userForm : FormGroup = this.formBuilder.group({
    name:["",[Validators.required]],
    age:[""],
    address:[""],
    password:["",[Validators.required,Validators.minLength(8)]]
  });
  userService=inject(UserService);
  router=inject(Router)
  route=inject(ActivatedRoute);
  editUserId!:string;
  ngOnInit(){
    this.editUserId= this.route.snapshot.params["id"];
    if(this.editUserId){
      this.userService.getUser(this.editUserId).subscribe(result=>{
        this.userForm.patchValue(result);
      })
    }
  }
  addUser(){
    if(this.userForm.invalid){
      alert("Please Provid all field with valid data");
    }
  const model: User = this.userForm.value;  
  this.userService.addUser(model).subscribe(result=>{
    alert("User added sucefully.")
    this.router.navigateByUrl("/");
  })
  }
  updateUser() {
    if(this.userForm.invalid){
      alert("Please Provid all field with valid data");
    return;
    }
    const model:User = this.userForm.value;
    this.userService.updateUser(this.editUserId,model).subscribe(result=>{
      alert("User update sucefully.")
    this.router.navigateByUrl("/");
    })
  }
}
