import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from 'src/app/shared/services/news.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { News } from 'src/app/shared/models/news.model';
import { QuillEditorComponent } from 'ngx-quill';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-edit-news-modal',
  templateUrl: './edit-news-modal.component.html',
  styleUrls: ['./edit-news-modal.component.scss']
})
export class EditNewsModalComponent implements OnInit, OnDestroy {

  @Input() news_id: number;
  @Input() mode: string;

  @ViewChild('content') content: QuillEditorComponent;

  formGroup: FormGroup;
  news: News = {
    title: '',
    created_at: '',
    content: ''
  };
  isLoadingData = false; // TODO

  getNewsSub: Subscription;
  updateNewsSub: Subscription;
  addNewsSub: Subscription;
  deleteNewsSub: Subscription;

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'align': [] }],
      ['clean'],                                         // remove formatting button
      ['link']                                            // link and image, video
    ]
  };

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private alertService: ToastrService
  ) { }

  initFormGroup() {
    this.formGroup = this.formBuilder.group({
      title: [this.news.title, [Validators.required, Validators.minLength(5)]],
      created_at: [{value: this.news.created_at, disabled: true}, Validators.required],
      content: [this.news.content]
    });

    this.formGroup
      .controls
      .content
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((data) => {
        // tslint:disable-next-line:no-console
        console.log('native fromControl value changes with debounce', data);
        this.news.content = data;
        console.log('this.news.content', this.news.content);
      });

    this.content
      .onContentChanged
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((data) => {
        // tslint:disable-next-line:no-console
        console.log('view child + directly subscription', data);
      });

  }

  ngOnInit() {

    if (this.mode === 'edit') {
      this.reqGetNews();
    } else {
    }
    this.initFormGroup();


  }

  ngOnDestroy() {
    if (this.getNewsSub) { this.getNewsSub.unsubscribe(); }
    if (this.updateNewsSub) { this.updateNewsSub.unsubscribe(); }
    if (this.deleteNewsSub) { this.deleteNewsSub.unsubscribe(); }
    if (this.addNewsSub) { this.addNewsSub.unsubscribe(); }
  }

  reqGetNews() {
    this.getNewsSub = this.newsService.getNews(this.news_id).subscribe(
      (date: News) => {
        this.news = date;
        console.log(date);
        this.initFormGroup();
      },
      err => {
        this.alertService.error(err, 'Bład pobierania aktualności');
      }
    );
  }

  get titleInput() { return this.formGroup.controls['title']; }
  get createdAtInput() { return this.formGroup.controls['created_at']; }
  get contentInput() { return this.formGroup.controls['content']; }

  onClickSave() {

    let newNews: News;

    if (this.mode === 'edit') {
      newNews = {
        id: this.news.id,
        title: this.titleInput.value,
        content: this.contentInput.value
      };
      this.updateNewsSub = this.newsService.updateNews(newNews).subscribe(
        res => {
          this.alertService.success('Zapisano aktualność!');
          this.reqGetNews();
        },
        err => {
          this.alertService.error(err, 'Nie udało się zaktualizować aktualności!');
        }
      );
    } else {
      newNews = {
        title: this.titleInput.value,
        content: this.contentInput.value
      };
      this.addNewsSub = this.newsService.addNews(newNews).subscribe(
        res => {
          this.alertService.success('Dodano aktualność!');
          this.activeModal.dismiss('Dodano aktualność!');
        },
        err => {
          this.alertService.error(err, 'Nie udało się zaktualizować aktualności!');
        }
      );
    }

    // console.log('Updated news:', newNews);
    // this.newsService.updateNews(newNews);

  }
  onDelete() {
    // this.newsService.deleteNews(this.news_id);

    this.deleteNewsSub = this.newsService.deleteNews(this.news_id).subscribe(
      res => {
        this.alertService.success('Usunięto aktualność');
      },
      err => {
        this.alertService.error(err, 'Błąd usuwania aktualności');
      },
      () => {
        this.reqGetNews();
      }
    );

    this.activeModal.close('Wyczyszczono pasek');
  }

}
