import { Component } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  newUser = {
    name: '',
    phone: '',
    email: '',
    cpf: '',
    password: '',
  };

  constructor(private publicService: PublicService) {}

  createUser() {
    this.publicService.createUser(this.newUser).subscribe({
      next: (response) => {
        console.log('User created successfully');
        // Perform any additional actions after user creation
      },
      error: (error) => {
        console.error('Error creating user:', error);
        // Handle any errors that occur during user creation
      },
    });
  }
}
