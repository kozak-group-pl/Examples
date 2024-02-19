import { Component, Input, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { QuillModulesForDescription, QuillModulesForChat } from '../../data/quill-configuration';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { ConfigService } from '../../services/config.service';
import { NotepadGet, NotepadUpdate } from '../../store/actions/notepad.action';
import { take, takeUntil } from 'rxjs/operators';
import { QuillInitializeService } from '../../services/quill-init.service';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss'],
})
export class NotepadComponent implements OnInit, OnDestroy {
  @Input() object: string;
  @Input() objectId: string;
  @Input() platform = 'web';

  config: any = {};
  MAX_IMAGE_FILE_SIZE: number;
  editorModules: any;
  notepadForm: FormGroup;
  startContent = '';
  isChanged = false;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private store: Store,
    private toastr: ToastrService,
    private configService: ConfigService,
    private quillInitializeService: QuillInitializeService,
  ) {
    this.config = this.configService.templateConf;
    this.MAX_IMAGE_FILE_SIZE = this.configService.MAX_IMAGE_FILE_SIZE;

    this.activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data.object && data.objectData) {
        this.object = data.object;
        this.objectId = data.objectData._id;
      }
    });
  }

  ngOnInit(): void {
    this.editorModules = {
      ...(this.platform === 'web' ? QuillModulesForDescription : QuillModulesForChat),
      magicUrl: true,
    };

    this.buildItemForm({ content: '' });

    this.store
      .dispatch(new NotepadGet({ object: this.object, objectId: this.objectId }))
      .pipe(takeUntil(this.destroy$))
      .subscribe((dispatchData) => {
        const data = dispatchData.Notepad;
        const content = data ? data.content : '';
        this.startContent = content;
        this.notepadForm.controls['content'].setValue(content);

        this.ref.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.complete();
  }

  private buildItemForm(item: any) {
    this.notepadForm?.reset();

    this.notepadForm = this.formBuilder.group({
      content: [item.content || '', Validators.required],
    });
  }

  getEscapedContent(text) {
    return text.replace(/<[^>]+>/g, '');
  }

  editorChanged(event) {
    const content = event.editor.root.innerHTML;

    this.isChanged =
      this.startContent !== content && this.getEscapedContent(this.startContent) !== this.getEscapedContent(content);
  }

  checkDescriptionImageMaxSize(description: string): boolean {
    return !(description?.length > this.MAX_IMAGE_FILE_SIZE);
  }

  submitForm() {
    const newData = { ...this.notepadForm.value };

    const body = Object.assign({ ...newData, object: this.object, objectId: this.objectId });

    if (!this.checkDescriptionImageMaxSize(newData?.content)) {
      this.toastr.error('Max content images size 50 MB', 'Error');
      return;
    }

    this.store
      .dispatch(new NotepadUpdate({ body }))
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe(
        () => {
          this.isChanged = false;
          this.toastr.success('Content has been updated.', 'Success');
        },
        (err) => this.toastr.error(err.message, 'Error'),
      );
  }
}
