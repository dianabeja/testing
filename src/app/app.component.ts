import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'testing_pruebas';

  public Mostrar_Pantalla: boolean = false;

  Ocultar() {
    this.Mostrar_Pantalla = true;
  }

  ngOnInit(): void {
    this.Mostrar_Pantalla = false;
  }

}
