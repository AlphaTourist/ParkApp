import { Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector     : 'navbar',
    templateUrl  : './navbar.component.html',
    styleUrls    : ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent
{
    // Private
    _variant: string;

    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {Renderer2} _renderer
     */
    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private authService: AuthService
    )
    {

        this._renderer.addClass(this._elementRef.nativeElement, 'vertical-style-1');

    }

}
