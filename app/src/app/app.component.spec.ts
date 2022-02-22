import { MatToolbarModule } from '@angular/material/toolbar';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('On Init', () => {
    it('should get latest seed id from localStorage', () => {
      localStorage.setItem('latestSeedId', '123')
      expect(localStorage.getItem('latestSeedId')).toBe('123');
    });
  });
  
});
