import { Component } from '@angular/core';
import { ReturnAddressDto } from 'src/app/models/ReturnAddress.dto';
import { PublicService } from 'src/app/services/public.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css'],
})
export class CreateAddressComponent {
  newAddress: ReturnAddressDto = {
    complement: 'Complement test',
    numberAddress: 100,
    cep: '59101101',
    city: 4430,
  };

  constructor(private publicService: PublicService) {}

  createAddress() {
    this.publicService.createAddress(this.newAddress).subscribe({
      next: (response) => {
        console.log('Address created successfully', response);
        // Realize qualquer ação adicional após a criação do endereço
      },
      error: (error) => {
        console.error('Error creating address:', error);
        // Trate qualquer erro ocorrido durante a criação do endereço
      },
    });
  }
}
