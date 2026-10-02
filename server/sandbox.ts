import website from './index';

// Only this entry point is deployed to the isolated Stripe sandbox Worker.
// All payment verification and onboarding behavior stays in the production module.
const origin = 'https://novren-website-test.gabe-11c.workers.dev';
const recipients = new Set(['gabe@novren.co', 'hello@novren.co']);

function sandboxEnv(env: Env): Env {
  if (
    env.SITE_ORIGIN !== origin ||
    String(env.STRIPE_LIVEMODE) !== 'false' ||
    !env.STRIPE_PAYMENT_LINK_URL.startsWith('https://buy.stripe.com/test_') ||
    !env.STRIPE_ANNUAL_PAYMENT_LINK_URL.startsWith('https://buy.stripe.com/test_')
  ) throw new Error('Sandbox configuration must never use live payments.');
  const EMAIL: SendEmail = {
    async send(message: EmailMessage | EmailMessageBuilder) {
      if (
        !('subject' in message) ||
        typeof message.to !== 'string' ||
        !recipients.has(message.to.toLowerCase()) ||
        message.cc || message.bcc
      ) throw new Error('Sandbox email recipient is not approved.');
      return env.EMAIL.send({
        ...message,
        subject: '[TEST ONLY — NO SERVICE ACTIVATION] ' + message.subject,
        text: 'NOVREN SANDBOX TEST. No money was charged. Do not activate a GoWP site.\n\n' + (message.text || ''),
        html: '<p><strong>NOVREN SANDBOX TEST. No money was charged. Do not activate a GoWP site.</strong></p>' + (message.html || ''),
      });
    },
  };
  return { ...env, EMAIL };
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const response = await website.fetch(request, sandboxEnv(env), ctx);
    const result = new Response(response.body, response);
    result.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return result;
  },
  async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    return website.scheduled(controller, sandboxEnv(env), ctx);
  },
} satisfies ExportedHandler<Env>;
