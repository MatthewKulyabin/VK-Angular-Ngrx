import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStateInterface } from '../../state/app-state-interface';
import { PostInterface } from '../../types/post-interface';
import { PostEmitInterface } from '../../types/post-emit-interface';
import { LocalStorageService } from '../../services/local.storage.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() post!: PostInterface;
  @Output() getIdEvent = new EventEmitter<PostEmitInterface>();

  constructor(
    private store: Store<AppStateInterface>,
    private localStorageService: LocalStorageService
  ) {}

  getId(id: number, method: string) {
    this.getIdEvent.emit({ id, method });
  }

  isPostOfCurrentUser(userId: number): boolean {
    return this.localStorageService.getCurrentUserId() === userId;
  }
}
