import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosEditarPage } from './usuarios-editar.page';

describe('UsuariosEditarPage', () => {
  let component: UsuariosEditarPage;
  let fixture: ComponentFixture<UsuariosEditarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosEditarPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosEditarPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
