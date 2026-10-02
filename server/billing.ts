import { InputError } from './validation';

export type BillingInterval = 'month' | 'year';
export function billingInterval(value: unknown): BillingInterval {
  if (value === undefined || value === 'month') return 'month';
  if (value === 'year') return 'year';
  throw new InputError('Please choose monthly or annual billing.');
}
export function billingOffer(interval: BillingInterval, env: Env) {
  const annual = interval === 'year';
  return {
    interval,
    amount: annual ? 399900 : 39900,
    price: annual ? '$3,999' : '$399',
    label: annual ? '$3,999/year, paid upfront for 12 months' : '$399/month',
    renewal: annual ? 'annually at $3,999' : 'monthly at $399',
    linkId: annual ? env.STRIPE_ANNUAL_PAYMENT_LINK_ID : env.STRIPE_PAYMENT_LINK_ID,
    linkUrl: annual ? env.STRIPE_ANNUAL_PAYMENT_LINK_URL : env.STRIPE_PAYMENT_LINK_URL,
  };
}
