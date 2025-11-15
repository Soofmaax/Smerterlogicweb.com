/**
 * Environment validation (non-blocking).
 * Runs before build via npm prebuild script.
 */
import { z } from 'zod';

function warn(msg) {
  // eslint-disable-next-line no-console
  console.warn(`[env] ${msg}`);
}

const ProviderSchema = z.enum(['ga', 'gtm', 'plausible', 'umami']).optional();

function validateAnalytics() {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
  const parsed = ProviderSchema.safeParse(provider);
  if (!parsed.success) {
    warn(`NEXT_PUBLIC_ANALYTICS_PROVIDER missing or invalid (got: ${provider ?? 'undefined'}). Expected one of: ga, gtm, plausible, umami.`);
    return;
  }
  if (parsed.data === 'gtm') {
    const gtm = process.env.NEXT_PUBLIC_GTM_ID || '';
    if (!/^GTM-[A-Z0-9]+$/i.test(gtm)) {
      warn(`GTM provider: NEXT_PUBLIC_GTM_ID is missing or invalid. Expected format 'GTM-XXXXX'.`);
    }
  }
  if (parsed.data === 'ga') {
    const ga = process.env.NEXT_PUBLIC_GA_ID || '';
    if (!/^G-[A-Z0-9]+$/i.test(ga)) {
      warn(`GA provider: NEXT_PUBLIC_GA_ID is missing or invalid. Expected format 'G-XXXXXXXXXX'.`);
    }
  }
}

function validateSanity() {
  const pid = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  if (!pid) warn('SANITY_PROJECT_ID is not set.');
  if (!dataset) warn('SANITY_DATASET is not set.');
}

function validateIndexNow() {
  const host = process.env.INDEXNOW_HOST;
  const key = process.env.INDEXNOW_KEY;
  if (host && !key) warn('INDEXNOW_HOST set but INDEXNOW_KEY missing.');
}

function main() {
  validateAnalytics();
  validateSanity();
  validateIndexNow();
}

main();