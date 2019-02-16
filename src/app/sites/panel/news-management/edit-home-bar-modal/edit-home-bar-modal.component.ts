import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from 'src/app/shared/services/news.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-home-bar-modal',
  templateUrl: './edit-home-bar-modal.component.html',
  styleUrls: ['./edit-home-bar-modal.component.scss']
})
export class EditHomeBarModalComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  homeBar: string;

  getHomeBarSub: Subscription;
  updateHomeBarSub: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private alertService: ToastrService
  ) { }

  ngOnInit() {

    this.getHomeBar();

    this.formGroup = this.formBuilder.group({
      homeBar: [this.homeBar, [Validators.required, Validators.maxLength(122)]]
    });


  }

  ngOnDestroy() {
    // if (this.getHomeBarSub) {
    //   this.getHomeBarSub.unsubscribe();
    // }
  }

  getHomeBar() {
    this.homeBar = this.newsService.getHomeBar();
    console.log('getHomeBar', this.homeBar);
  }

  get homeBarInput() {
    return this.formGroup.controls['homeBar'];
  }

  onClickSave() {
    const newhomeBar = this.homeBarInput.value;
    console.log('Updated homeBar:', newhomeBar);
    // this.updateHomeBarSub = this.newsService.updateHomeBar(newhomeBar).subscribe(
    //   res => {
    //     this.alertService.success('Zaktualizowano użytkownika!');
    //     this.getHomeBar();
    //   },
    //   err => {
    //     this.alertService.error('Nie udało się zaktualizować użytkownika!');
    //   }
    // );
    this.newsService.updateHomeBar(newhomeBar);
  }
  onDelete() {
    this.newsService.updateHomeBar('');
    this.activeModal.close('Wyczyszczono pasek');
  }

}
