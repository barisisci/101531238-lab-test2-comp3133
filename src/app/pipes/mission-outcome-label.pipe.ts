import { Pipe, PipeTransform } from '@angular/core';
import type { LaunchOutcomeKind } from '../models/spacex-launch-v3.model';

@Pipe({ name: 'missionOutcomeLabel', standalone: true })
export class MissionOutcomeLabelPipe implements PipeTransform {
  transform(kind: LaunchOutcomeKind): string {
    switch (kind) {
      case 'upcoming':
        return 'Upcoming';
      case 'success':
        return 'Success';
      case 'failure':
        return 'Failure';
      default:
        return 'Unknown';
    }
  }
}
