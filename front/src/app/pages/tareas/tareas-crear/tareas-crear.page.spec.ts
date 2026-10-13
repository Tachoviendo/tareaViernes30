import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareasCrearPage } from './tareas-crear.page';

describe('TareasCrearPage', () => {
  let component: TareasCrearPage;
  let fixture: ComponentFixture<TareasCrearPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareasCrearPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TareasCrearPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
