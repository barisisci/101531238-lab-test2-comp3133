export interface SpaceXV3Rocket {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
}

export interface SpaceXV3Links {
  mission_patch_small: string | null;
  article_link: string | null;
  wikipedia: string | null;
  video_link: string | null;
}

export interface SpaceXLaunchV3 {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  details: string | null;
  launch_date_utc: string;
  launch_success: boolean | null;
  upcoming?: boolean;
  rocket: SpaceXV3Rocket;
  links: SpaceXV3Links;
}

export type LaunchOutcomeKind = 'upcoming' | 'success' | 'failure' | 'unknown';

export function launchOutcomeV3(l: SpaceXLaunchV3): LaunchOutcomeKind {
  if (l.upcoming) {
    return 'upcoming';
  }
  if (l.launch_success === true) {
    return 'success';
  }
  if (l.launch_success === false) {
    return 'failure';
  }
  return 'unknown';
}
