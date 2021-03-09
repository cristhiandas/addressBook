import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementText } from 'src/app/utils/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    component.dataQa = 'my section';
    component.primaryText = 'Primary heading';
    component.subText = 'Sub-text for heeader'
    fixture.detectChanges();
  });

  it('should create dynamically', () => {
    expect(component).toBeTruthy();
    expect(getElementText(nativeElement, 'my section heading text')).toBe('Primary heading');
    expect(getElementText(nativeElement, 'my section heading sub text')).toBe('Sub-text for heeader');
  });
});



