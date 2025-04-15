import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDetail2Component } from './song-detail2.component';

describe('SongDetail2Component', () => {
  let component: SongDetail2Component;
  let fixture: ComponentFixture<SongDetail2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongDetail2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongDetail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
