import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from 'src/app/shared/services/news.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { News } from 'src/app/shared/models/news.model';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Component({
  selector: 'app-edit-home-bar-modal',
  templateUrl: './edit-home-bar-modal.component.html',
  styleUrls: ['./edit-home-bar-modal.component.scss']
})
export class EditHomeBarModalComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  homeBar: News = {
    content: ''
  };

  getHomeBarSub: Subscription;
  updateHomeBarSub: Subscription;
  deleteHomeBarSub: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private alertService: ToastrService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.initFromGroup();
    this.reqGetHomeBar();
  }

  ngOnDestroy() {
    if (this.getHomeBarSub) { this.getHomeBarSub.unsubscribe(); }
    if (this.updateHomeBarSub) { this.updateHomeBarSub.unsubscribe(); }
    if (this.deleteHomeBarSub) { this.deleteHomeBarSub.unsubscribe(); }
  }

  initFromGroup() {
    this.formGroup = this.formBuilder.group({
      homeBar: [this.homeBar.content, [Validators.required, Validators.maxLength(122)]]
    });
  }

  reqGetHomeBar() {
    // this.loaderService.showLoader();
    this.getHomeBarSub = this.newsService.getHomeBar().subscribe(
      (data: News) => {
        this.homeBar = data;
        console.log('getHomeBar', data);
        this.initFromGroup();
      },
      err => {
        this.alertService.error(err, 'Błąd pobierania treści paska informacyjnego');
      }
      // () => this.loaderService.hideLoader()
    );
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

    const newHomeBar: News = {
      id: this.homeBar.id,
      title: this.homeBar.title,
      // created_at: this.dateInput.value,
      content: this.homeBarInput.value
    };

    this.updateHomeBarSub = this.newsService.updateHomeBar(newHomeBar).subscribe(
      res => {
        this.alertService.success('Zaktualizowano pasek informacyjny!');
        this.reqGetHomeBar();
      },
      err => {
        this.alertService.error(err, 'Nie udało się zaktualizować paska informacyjnego!');
      }
    );

    this.newsService.updateHomeBar(newhomeBar);
  }
  onDelete() {

    const deleteHomeBar: News = {
      id: this.homeBar.id,
      title: this.homeBar.title,
      // created_at: this.dateInput.value,
      content: ''
    };

    this.updateHomeBarSub = this.newsService.updateHomeBar(deleteHomeBar).subscribe(
      res => {
        this.alertService.success('Usunięto pasek informacyjny!');
        this.reqGetHomeBar();
      },
      err => {
        this.alertService.error(err, 'Nie udało się usunąć paska informacyjnego!');
      },
      () => {
        this.activeModal.close('Wyczyszczono pasek');
      }
    );

  }

}
