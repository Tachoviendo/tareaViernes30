import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarUsuariosPage } from './listar-usuarios.page';

describe('ListarUsuariosPage', () => {
  let component: ListarUsuariosPage;
  let fixture: ComponentFixture<ListarUsuariosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarUsuariosPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarUsuariosPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
