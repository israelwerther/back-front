import { Component, OnInit } from '@angular/core';
import { CredcoopLoanService } from './credcoop-loan.service';

@Component({
  selector: 'app-credcoop-loan',
  templateUrl: './credcoop-loan.component.html',
  styleUrls: ['./credcoop-loan.component.css']
})
export class CredcoopLoanComponent implements OnInit{
  totalCredcoopLoans: number = 0;

  ngOnInit() {
    this.returnCredcoopLoansCount();
  }

  constructor(private credcoopLoanService: CredcoopLoanService) {}

  returnCredcoopLoansCount() {
    this.credcoopLoanService.getQueryCredcoopLoan().subscribe((result) => {
      this.totalCredcoopLoans = result.data.getTotalCredcoopLoans;
    });
  }
}
