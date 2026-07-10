import { EmbedIframeConfigExtension } from '@blocksuite/affine-shared/services';

import {
  type EmbedIframeUrlValidationOptions,
  validateEmbedIframeUrl,
} from '../../utils';

// [ALGOGRIND]
// Google Maps links refuse to load in a plain iframe (X-Frame-Options),
// so we convert regular maps URLs to the keyless embeddable
// `maps.google.com/maps?...&output=embed` form.

const GOOGLE_MAPS_DEFAULT_WIDTH_IN_SURFACE = 800;
const GOOGLE_MAPS_DEFAULT_HEIGHT_IN_SURFACE = 600;
const GOOGLE_MAPS_DEFAULT_WIDTH_PERCENT = 100;
const GOOGLE_MAPS_DEFAULT_HEIGHT_IN_NOTE = 480;

const googleMapsUrlValidationOptions: EmbedIframeUrlValidationOptions = {
  protocols: ['https:'],
  hostnames: ['www.google.com', 'google.com', 'maps.google.com'],
};

function isGoogleMapsUrl(url: string): boolean {
  try {
    if (!validateEmbedIframeUrl(url, googleMapsUrlValidationOptions)) {
      return false;
    }
    const parsedUrl = new URL(url);
    return parsedUrl.pathname.startsWith('/maps');
  } catch {
    return false;
  }
}

/**
 * Converts a regular Google Maps URL into the keyless embeddable form.
 * Supported inputs:
 * - https://www.google.com/maps/embed?... (returned as-is)
 * - https://www.google.com/maps/place/<name>/@lat,lng,zoom...
 * - https://www.google.com/maps/@lat,lng,zoom...
 * - https://www.google.com/maps?q=<query>
 */
function buildGoogleMapsEmbedUrl(url: string): string | undefined {
  if (!isGoogleMapsUrl(url)) {
    return undefined;
  }

  const parsedUrl = new URL(url);

  // Already an embed URL
  if (parsedUrl.pathname.startsWith('/maps/embed')) {
    return url;
  }

  // Explicit query parameter
  const q = parsedUrl.searchParams.get('q');
  if (q) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
  }

  // Place name from the path: /maps/place/<name>/...
  const placeMatch = parsedUrl.pathname.match(/\/maps\/place\/([^/]+)/);
  if (placeMatch) {
    return `https://maps.google.com/maps?q=${placeMatch[1]}&output=embed`;
  }

  // Coordinates from the path: /maps/@lat,lng,zoom
  const coordMatch = parsedUrl.pathname.match(
    /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/
  );
  if (coordMatch) {
    return `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&output=embed`;
  }

  return undefined;
}

function isValidGoogleMapsIframeUrl(iframeUrl: string): boolean {
  try {
    const parsedUrl = new URL(iframeUrl);
    const hostnameOk = ['maps.google.com', 'www.google.com'].includes(
      parsedUrl.hostname
    );
    const embedOk =
      parsedUrl.pathname.startsWith('/maps/embed') ||
      parsedUrl.searchParams.get('output') === 'embed';
    return hostnameOk && embedOk;
  } catch {
    return false;
  }
}

export const googleMapsConfig = {
  name: 'google-maps',
  match: (url: string) => isGoogleMapsUrl(url),
  buildOEmbedUrl: (url: string) => buildGoogleMapsEmbedUrl(url),
  useOEmbedUrlDirectly: true,
  validateIframeUrl: (iframeUrl: string) =>
    isValidGoogleMapsIframeUrl(iframeUrl),
  options: {
    widthInSurface: GOOGLE_MAPS_DEFAULT_WIDTH_IN_SURFACE,
    heightInSurface: GOOGLE_MAPS_DEFAULT_HEIGHT_IN_SURFACE,
    widthPercent: GOOGLE_MAPS_DEFAULT_WIDTH_PERCENT,
    heightInNote: GOOGLE_MAPS_DEFAULT_HEIGHT_IN_NOTE,
    allowFullscreen: true,
    style: 'border: none; border-radius: 8px;',
  },
};

export const GoogleMapsEmbedConfig =
  EmbedIframeConfigExtension(googleMapsConfig);
