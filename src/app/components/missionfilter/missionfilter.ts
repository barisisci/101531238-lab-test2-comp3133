import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { SpacexService } from '../../services/spacex.service';

@Component({
  selector: 'app-missionfilter',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatOption],
  templateUrl: './missionfilter.html',
  styleUrl: './missionfilter.scss',
})
export class MissionfilterComponent {
  protected readonly spx = inject(SpacexService);

  readonly yearChoices = Array.from({ length: 2026 - 2006 + 1 }, (_, i) => String(2006 + i));

  readonly selectValue = computed(() => this.spx.launchYearFilter() ?? '');

  onYearChange(event: MatSelectChange): void {
    const v = event.value as string;
    this.spx.setLaunchYearFilter(v === '' ? null : v);
  }
}
