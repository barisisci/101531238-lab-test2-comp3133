import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { launchOutcomeV3 } from '../../models/spacex-launch-v3.model';
import type { SpaceXLaunchV3 } from '../../models/spacex-launch-v3.model';
import { LaunchDatePipe } from '../../pipes/launch-date.pipe';
import { MissionOutcomeLabelPipe } from '../../pipes/mission-outcome-label.pipe';
import { SpacexService } from '../../services/spacex.service';
import { MissionfilterComponent } from '../missionfilter/missionfilter';

@Component({
  selector: 'app-missionlist',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MissionfilterComponent,
    LaunchDatePipe,
    MissionOutcomeLabelPipe,
  ],
  templateUrl: './missionlist.html',
  styleUrl: './missionlist.scss',
})
export class MissionlistComponent {
  protected readonly spx = inject(SpacexService);

  readonly searchControl = new FormControl('', { nonNullable: true });
  private readonly searchQuery = toSignal(
    this.searchControl.valueChanges.pipe(startWith(this.searchControl.value)),
    { initialValue: '' },
  );

  readonly visibleLaunches = computed(() => {
    const rows = this.spx.launches();
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) {
      return rows;
    }
    return rows.filter((l) => l.mission_name.toLowerCase().includes(q));
  });

  highlightFailures = false;

  constructor() {
    this.spx.fetchLaunches();
  }

  outcome(launch: SpaceXLaunchV3) {
    return launchOutcomeV3(launch);
  }
}
