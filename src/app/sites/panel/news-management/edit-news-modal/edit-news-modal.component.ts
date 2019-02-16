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
  news: News;
  isLoadingData = false; // TODO

  getNewsSub: Subscription;
  updateNewsSub: Subscription;

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

  ngOnInit() {

    if (this.mode === 'edit') {
      this.getNews(this.news_id);
    }

    this.formGroup = this.formBuilder.group({
      title: [this.news.title, [Validators.required, Validators.minLength(5)]],
      date: [{value: this.news.date, disabled: true}, Validators.required],
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

  ngOnDestroy() {
    // if (this.getHomeBarSub) {
    //   this.getHomeBarSub.unsubscribe();
    // }
  }

  getNews(id: number) {
    this.news = this.newsService.getNews(id);
    console.log('getNews', this.news);
  }

  get titleInput() { return this.formGroup.controls['title']; }
  get dateInput() { return this.formGroup.controls['date']; }
  get contentInput() { return this.formGroup.controls['content']; }

  onClickSave() {
    const newNews: News = {
      id: this.news.id,
      title: this.titleInput.value,
      date: this.dateInput.value,
      content: this.contentInput.value
    };

    console.log('Updated news:', newNews);
    this.newsService.updateNews(newNews);

    // this.updateHomeBarSub = this.newsService.updateHomeBar(newhomeBar).subscribe(
    //   res => {
    //     this.alertService.success('Zaktualizowano użytkownika!');
    //     this.getHomeBar();
    //   },
    //   err => {
    //     this.alertService.error('Nie udało się zaktualizować użytkownika!');
    //   }
    // );

  }
  onDelete() {
    this.newsService.deleteNews(this.news_id);
    this.activeModal.close('Wyczyszczono pasek');
  }

}
