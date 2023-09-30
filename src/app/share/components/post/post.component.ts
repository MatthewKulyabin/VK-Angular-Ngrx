import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStateInterface } from '../../state/app-state-interface';
import * as PostsActions from '../../state/posts/actions';
import { PostInterface } from '../../types/post-interface';
import { PostEmitInterface } from '../../types/post-emit-interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  @Input() post!: PostInterface;
  @Output() getIdEvent = new EventEmitter<PostEmitInterface>();

  constructor(private store: Store<AppStateInterface>) {}

  getId(id: number, method: string) {
    this.getIdEvent.emit({ id, method });
  }
}
