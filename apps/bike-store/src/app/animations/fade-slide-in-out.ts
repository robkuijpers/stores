import { trigger, animate, transition, style } from '@angular/animations';

export const fadeSlideInOut = trigger('fadeSlideInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(50px)' }),
    animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
  transition(':leave', [animate('1000ms', style({ opacity: 0, transform: 'translateY(10px)' }))]),
]);
