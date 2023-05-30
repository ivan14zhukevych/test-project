import { animate, state, style, transition, trigger } from "@angular/animations";

export const slideInOut = trigger('slideInOut', [
    state('in', style({
        overflow: 'hidden',
        opacity: '1',
        height: '*',
        width: '150px'
    })),
    state('out', style({
        overflow: 'hidden',
        opacity: '0',
        height: '0px',
        width: '0px'
    })),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
])
