import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareasListarPage } from './tareas-listar.page';

describe('TareasListarPage', () => {
  let component: TareasListarPage;
  let fixture: ComponentFixture<TareasListarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareasListarPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TareasListarPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
