import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule] // Zorg ervoor dat RouterModule is geïmporteerd
})
export class AppComponent {
  title = 'AvansMarktplaats';
}
