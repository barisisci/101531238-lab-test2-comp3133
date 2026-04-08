import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { launchOutcomeV3 } from '../../models/spacex-launch-v3.model';
import type { SpaceXLaunchV3 } from '../../models/spacex-launch-v3.model';
import { LaunchDatePipe } from '../../pipes/launch-date.pipe';
import { SpacexService } from '../../services/spacex.service';

@Component({
  selector: 'app-missiondetails',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, LaunchDatePipe],
  templateUrl: './missiondetails.html',
  styleUrl: './missiondetails.scss',
})
export class MissiondetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly spx = inject(SpacexService);

  readonly launch = signal<SpaceXLaunchV3 | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly outcome = computed(() => {
    const l = this.launch();
    return l ? launchOutcomeV3(l) : null;
  });

  constructor() {
    this.route.paramMap
      .pipe(
        map((p) => p.get('flightNumber')),
        filter((v): v is string => v != null && v.length > 0),
        map((v) => Number.parseInt(v, 10)),
        filter((n) => !Number.isNaN(n)),
        switchMap((flightNumber) => {
          this.loading.set(true);
          this.error.set(null);
          this.launch.set(null);
          return this.spx.getLaunchByFlightNumber(flightNumber);
        }),
        takeUntilDestroyed(),
      )
      .subscribe({
        next: (l) => {
          this.launch.set(l);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.error.set('Could not load this mission.');
        },
      });
  }
}
