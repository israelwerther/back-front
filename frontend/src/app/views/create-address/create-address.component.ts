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
    complement: '',
    numberAddress: 0,
    cep: '',
    city: undefined,
  };

  constructor(private publicService: PublicService) {}

  createAddress() {
    this.publicService.createAddress(this.newAddress).subscribe(
      (response) => {
        console.log('Address created successfully');
        // Realize qualquer ação adicional após a criação do endereço
      },
      (error) => {
        console.error('Error creating address:', error);
        // Trate qualquer erro ocorrido durante a criação do endereço
      }
    );
  }
}
