import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AvatarService } from '../../services/avatar.service';

import { CommentsService } from '../../services/comments.service';
import { NotificationsService } from '../toast/notification/notifications.service';
import { NotificationTypeEnum } from '../toast/enum/notification-type.enum';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  @ViewChild('toastContainer', { read: ViewContainerRef }) toastContainer;

  @Input() parentRef;
  @Input() replyId: number;
  @Input() commentId: number;

  public replyForm: FormGroup;

  public avatarPath: string;

  constructor(
    private formBuilder: FormBuilder,
    private avatarService: AvatarService,
    private commentsService: CommentsService,
    private notificationService: NotificationsService
  ) { }

  public ngOnInit(): void {
    this.initReplyForm();
  }

  public confirmReply(): void {
    this.generateAvatarPath();

    this.updateForm();

    const singleReply = this.replyForm.value;

    this.commentsService.updateReplyList(this.commentId, this.replyId, singleReply);

    // TODO show success toast and after that clear form
    const config = {
      title: 'Some Title',
      text: 'Bitte überprüfen sie Benutzername und Passwort',
      notificationType: NotificationTypeEnum.Error,
      icon: {
        src: 'https://cdn4.iconfinder.com/data/icons/rounded-white-basic-ui/139/Warning01-RoundedWhite-512.png',
        alt: 'error-icon'
      }
    };

    this.notificationService.showToast(this.toastContainer, config);

    this.cancel();
  }

  public cancel(): void {
    this.replyForm.reset();
  }

  private initReplyForm(): void {
    this.replyForm = this.formBuilder.group({
      comment: ['', Validators.required],
      username: ['', Validators.required],
      commentId: [Date.now()],
      subjectId: [this.replyId],
      avatar: this.avatarPath
    });
  }

  private generateAvatarPath(): void {
    this.avatarPath = this.avatarService.generateGravatar();
  }

  private updateForm(): void {
    this.replyForm.patchValue({
      commentId: Date.now(),
      avatar: this.avatarPath
    });
  }

}
