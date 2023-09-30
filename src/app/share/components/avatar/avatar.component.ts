import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent implements OnInit {
  @Input() src?: string;
  @Input() alt?: string;
  @Input() width?: number;
  @Input() height?: number;
  @Input() class?: string;

  ngOnInit(): void {
    this.class = ' rounded-circle border border-dark ' + this.class;
  }
}
