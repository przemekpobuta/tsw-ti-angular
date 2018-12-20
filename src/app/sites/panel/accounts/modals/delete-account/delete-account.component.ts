import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AccountsService} from '../../accounts.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  @Input() login: string;
  @Input() id: number;

  constructor(
    public activeModal: NgbActiveModal,
    private accountsService: AccountsService,
    private alertService: ToastrService
  ) { }

  ngOnInit() {
  }

  onClickDelete() {
    this.accountsService.deleteAccount(this.id).subscribe(
      res => {
        this.alertService.success('Pomyślnie usunięto użytkownika!');
        this.activeModal.close('usunięto');
      },
      err => {
        this.alertService.error('Nie udało się usunąć użytkownika');
        this.activeModal.dismiss('nie usunięto');
      },
      () => {
      }
    );
  }

}
