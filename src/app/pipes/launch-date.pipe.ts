import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'launchDate', standalone: true })
export class LaunchDatePipe implements PipeTransform {
  transform(isoUtc: string | null | undefined, locale = 'en-CA'): string {
    if (!isoUtc) {
      return '—';
    }
    const d = new Date(isoUtc);
    if (Number.isNaN(d.getTime())) {
      return '—';
    }
    return d.toLocaleString(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }
}
