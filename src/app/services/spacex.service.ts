import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import type { SpaceXLaunchV3 } from '../models/spacex-launch-v3.model';

const BASE = 'https://api.spacexdata.com/v3';

@Injectable({ providedIn: 'root' })
export class SpacexService {
  private readonly http = inject(HttpClient);

  readonly launches = signal<SpaceXLaunchV3[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly launchYearFilter = signal<string | null>(null);

  fetchLaunches(): void {
    this.loading.set(true);
    this.error.set(null);
    const year = this.launchYearFilter();
    const url =
      year && year.length > 0 ? `${BASE}/launches?launch_year=${encodeURIComponent(year)}` : `${BASE}/launches`;

    this.http.get<SpaceXLaunchV3[]>(url).subscribe({
      next: (data) => {
        this.launches.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.launches.set([]);
        this.loading.set(false);
        this.error.set('Failed to load launches.');
      },
    });
  }

  setLaunchYearFilter(year: string | null): void {
    this.launchYearFilter.set(year);
    this.fetchLaunches();
  }

  getLaunchByFlightNumber(flightNumber: number) {
    return this.http.get<SpaceXLaunchV3>(`${BASE}/launches/${flightNumber}`);
  }
}
