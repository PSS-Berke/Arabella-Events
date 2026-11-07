// AWE inquiry emails (designed Nov 2026; preview artifact: AWE Inquiry Emails): table-based, inline-styled HTML that renders in Gmail,
// Apple Mail and Outlook. Web fonts load where supported (Apple Mail, iOS);
// everywhere else they fall back to Georgia / Helvetica.
const C = {
  page: '#f3ece5',
  card: '#fffdfa',
  ink: '#443221',
  body: '#5a4a3e',
  muted: '#80695a',
  faint: '#a8978a',
  gold: '#9a8158',
  rule: '#e6dccf',
  panel: '#f8f2ec',
};
const SERIF = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const SANS = "'Barlow', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const SITE = 'https://www.arabellasweddings.com';
const INSTAGRAM = 'https://www.instagram.com/arabellasweddingsandevents';

// Hosted images (public/email). Script lettering is an image because email
// clients can't load the site's script font.
export const EMAIL_ASSETS = {
  logo: `${SITE}/email/awe-logo.png`,
  thankYou: `${SITE}/email/thank-you.png`,
  arabella: `${SITE}/email/arabella.png`,
  newInquiry: `${SITE}/email/new-inquiry.png`,
};

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function firstNames(names) {
  return String(names || '').trim() || 'there';
}

function shell({ title, preheader, assets, logoWidth, content, footer }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Barlow:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  body { margin: 0; padding: 0; background: ${C.page}; }
  a { color: ${C.gold}; }
  @media (max-width: 620px) {
    .px { padding-left: 24px !important; padding-right: 24px !important; }
    .h1 { font-size: 20px !important; line-height: 28px !important; letter-spacing: 3px !important; }
    .stack, .stack td { display: block !important; width: 100% !important; }
    .stack td { padding-bottom: 14px !important; }
    .btn a { display: block !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.page};">${esc(preheader)}&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page};">
  <tr><td align="center" style="padding:32px 12px 40px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
      <tr><td align="center" style="padding:8px 0 28px;">
        <a href="${SITE}" style="text-decoration:none;"><img src="${assets.logo}" width="${logoWidth}" alt="AWE · Arabella's Weddings &amp; Events" style="display:block;width:${logoWidth}px;max-width:100%;height:auto;border:0;"></a>
      </td></tr>
      <tr><td style="background:${C.card};border:1px solid ${C.rule};">
        ${content}
      </td></tr>
      <tr><td class="px" align="center" style="padding:28px 40px 0;font-family:${SANS};font-size:12px;line-height:20px;color:${C.faint};">
        ${footer}
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function eyebrow(text) {
  return `<div style="font-family:${SERIF};font-size:15px;line-height:20px;font-style:italic;letter-spacing:2.5px;color:${C.gold};">${text}</div>`;
}

// Script lettering is an image: email clients can't load the site's script font.
function script(src, width, alt, align = 'center') {
  return `<img src="${src}" width="${width}" alt="${alt}" style="display:${align === 'center' ? 'block' : 'inline-block'};${align === 'center' ? 'margin:0 auto;' : ''}width:${width}px;max-width:100%;height:auto;border:0;">`;
}

// Names set like the site's headings: Cormorant capitals with wide tracking.
function caps(text, size) {
  return `<div class="h1" style="font-family:${SERIF};font-size:${size}px;line-height:${Math.round(size * 1.3)}px;font-weight:500;letter-spacing:${(size * 0.16).toFixed(1)}px;text-transform:uppercase;color:${C.ink};">${text}</div>`;
}

function button(href, label, filled) {
  const style = filled
    ? `background:${C.ink};color:#ffffff;border:1px solid ${C.ink};`
    : `background:${C.card};color:${C.ink};border:1px solid ${C.ink};`;
  return `<td class="btn" style="padding:0 8px 10px 0;"><a href="${esc(href)}" style="${style}display:inline-block;padding:13px 26px;font-family:${SANS};font-size:11px;line-height:14px;letter-spacing:2.5px;text-transform:uppercase;text-decoration:none;text-align:center;">${label}</a></td>`;
}

function detailRows(rows) {
  return rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `<tr>
        <td valign="top" style="padding:12px 16px 12px 0;border-top:1px solid ${C.rule};width:150px;font-family:${SANS};font-size:10.5px;line-height:18px;letter-spacing:2px;text-transform:uppercase;color:${C.faint};">${label}</td>
        <td valign="top" style="padding:12px 0;border-top:1px solid ${C.rule};font-family:${SANS};font-size:15px;line-height:22px;font-weight:300;color:${C.ink};">${esc(value)}</td>
      </tr>`
    )
    .join('');
}

function formatReceived(date) {
  return new Date(date).toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
    timeZone: 'America/Phoenix',
  });
}

/** The notification Arabella receives for each new inquiry. */
export function inquiryEmail(lead, { assets = EMAIL_ASSETS, receivedAt = new Date() } = {}) {
  const names = esc(lead.names);
  const summary = [lead.packages, lead.venueDate].filter(Boolean).map(esc).join(' &nbsp;·&nbsp; ');
  const replyHref = `mailto:${lead.email}?subject=${encodeURIComponent('Your wedding inquiry with AWE')}`;
  const telHref = `tel:${String(lead.phone || '').replace(/[^\d+]/g, '')}`;

  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td class="px" align="center" style="padding:40px 48px 8px;">
        ${script(assets.newInquiry, 190, 'New inquiry')}
        <div style="padding:14px 0 10px;">${caps(names, 26)}</div>
        <div style="font-family:${SANS};font-size:15px;line-height:23px;font-weight:300;color:${C.muted};">${summary}</div>
        <div style="padding-top:12px;">${eyebrow(esc(formatReceived(receivedAt)))}</div>
      </td></tr>

      <tr><td class="px" style="padding:24px 48px 4px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.panel};">
          <tr><td style="padding:18px 22px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="stack"><tr>
              <td valign="top" width="58%" style="font-family:${SANS};">
                <div style="font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:${C.faint};line-height:16px;">Email</div>
                <a href="mailto:${esc(lead.email)}" style="font-size:15px;line-height:24px;color:${C.ink};text-decoration:none;word-break:break-all;">${esc(lead.email)}</a>
              </td>
              <td valign="top" style="font-family:${SANS};">
                <div style="font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:${C.faint};line-height:16px;">Phone</div>
                <a href="${esc(telHref)}" style="font-size:15px;line-height:24px;color:${C.ink};text-decoration:none;">${esc(lead.phone)}</a>
              </td>
            </tr></table>
          </td></tr>
        </table>
      </td></tr>

      <tr><td class="px" style="padding:20px 48px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${detailRows([
            ['Venue &amp; date', lead.venueDate],
            ['Guests', lead.guestCount],
            ['Budget', lead.budget],
            ['Interested in', lead.packages],
            ['Heard about us', lead.referral],
          ])}
        </table>
      </td></tr>

      ${lead.vision ? `<tr><td class="px" style="padding:20px 48px 0;">
        <div style="font-family:${SANS};font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:${C.faint};line-height:16px;padding-bottom:10px;">Their vision</div>
        <div style="border-left:2px solid ${C.gold};padding:2px 0 2px 18px;font-family:${SERIF};font-size:20px;line-height:30px;font-style:italic;color:${C.ink};white-space:pre-line;">${esc(lead.vision)}</div>
      </td></tr>` : ''}

      <tr><td class="px" style="padding:32px 48px 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          ${button(replyHref, `Reply to ${names}`, true)}
          ${button(`${SITE}/admin`, 'All inquiries', false)}
        </tr></table>
      </td></tr>
    </table>`;

  return {
    subject: `New inquiry: ${lead.names}${lead.venueDate ? ` · ${lead.venueDate}` : ''}`,
    html: shell({
      title: `New inquiry from ${lead.names}`,
      preheader: `${lead.names} · ${[lead.packages, lead.guestCount && `${lead.guestCount} guests`, lead.budget].filter(Boolean).join(' · ')}`,
      assets,
      logoWidth: 96,
      content,
      footer: `Sent from the contact form on <a href="${SITE}" style="color:${C.muted};">arabellasweddings.com</a>.<br>Hit reply to write back to ${names} directly.`,
    }),
  };
}

/** The confirmation each couple receives right after they submit the form. */
export function autoReplyEmail(lead, { assets = EMAIL_ASSETS } = {}) {
  const names = esc(firstNames(lead.names));

  const steps = [
    ['I read your story', 'The details you shared, big and small, become the foundation for everything we create together.'],
    ['You’ll hear from me within 24 hours', 'I’ll reply personally to find a time to talk, because your excitement should never have to wait.'],
    ['We talk through your vision', 'Your date, your venue, the people you love and how you want the day to feel. From there, I’ll share how we can bring it to life.'],
  ];

  const stepRows = steps
    .map(
      ([title, text], i) => `<tr>
        <td valign="top" width="44" style="padding:0 0 18px;font-family:${SERIF};font-size:26px;line-height:28px;color:${C.gold};">${i + 1}</td>
        <td valign="top" style="padding:0 0 18px;font-family:${SANS};">
          <div style="font-size:15px;line-height:22px;font-weight:500;color:${C.ink};">${title}</div>
          <div style="font-size:14.5px;line-height:23px;font-weight:300;color:${C.body};">${text}</div>
        </td>
      </tr>`
    )
    .join('');

  const recap = [
    ['Venue &amp; date', lead.venueDate],
    ['Guests', lead.guestCount],
    ['Budget', lead.budget],
    ['Interested in', lead.packages],
  ]
    .filter(([, v]) => v)
    .map(
      ([label, value]) => `<tr>
        <td valign="top" style="padding:6px 14px 6px 0;width:130px;font-family:${SANS};font-size:10.5px;line-height:20px;letter-spacing:2px;text-transform:uppercase;color:${C.faint};">${label}</td>
        <td valign="top" style="padding:6px 0;font-family:${SANS};font-size:14.5px;line-height:20px;font-weight:300;color:${C.ink};">${esc(value)}</td>
      </tr>`
    )
    .join('');

  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td class="px" align="center" style="padding:48px 56px 0;">
        ${script(assets.thankYou, 250, 'Thank you')}
        <div style="padding-top:12px;">${caps(names, 24)}</div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:22px auto 0;"><tr><td style="width:56px;height:1px;background:${C.gold};font-size:0;line-height:0;">&nbsp;</td></tr></table>
      </td></tr>

      <tr><td class="px" style="padding:28px 56px 8px;font-family:${SANS};font-size:16px;line-height:27px;font-weight:300;color:${C.body};">
        <p style="margin:0 0 16px;">I’m so glad you reached out. Your inquiry is on its way to me, and I can’t wait to hear more about your celebration.</p>
        <p style="margin:0;">Here’s what happens next.</p>
      </td></tr>

      <tr><td class="px" style="padding:20px 56px 6px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${stepRows}</table>
      </td></tr>

      ${recap ? `<tr><td class="px" style="padding:4px 56px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.panel};">
          <tr><td style="padding:20px 24px 16px;">
            <div style="font-family:${SANS};font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:${C.gold};line-height:16px;padding-bottom:8px;">What you shared</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${recap}</table>
          </td></tr>
        </table>
      </td></tr>` : ''}

      <tr><td class="px" style="padding:30px 56px 0;font-family:${SANS};font-size:16px;line-height:27px;font-weight:300;color:${C.body};">
        In the meantime, feel free to reply to this email with inspiration photos, a Pinterest board, or any questions at all.
      </td></tr>

      <tr><td class="px" style="padding:28px 56px 0;">
        <div style="font-family:${SANS};font-size:15px;line-height:22px;font-weight:300;color:${C.body};">With love,</div>
        <div style="padding:6px 0 4px;">${script(assets.arabella, 150, 'Arabella', 'left')}</div>
        <div style="font-family:${SANS};font-size:11px;line-height:18px;letter-spacing:2px;text-transform:uppercase;color:${C.faint};">Arabella’s Weddings &amp; Events</div>
      </td></tr>

      <tr><td class="px" align="center" style="padding:36px 56px 48px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
          ${button(`${SITE}/gallery`, 'Design + Gallery', true)}
          ${button(`${SITE}/services`, 'Our packages', false)}
        </tr></table>
      </td></tr>
    </table>`;

  return {
    subject: 'Your inquiry is on its way · AWE',
    html: shell({
      title: 'Thank you for your inquiry',
      preheader: 'Your inquiry is on its way to Arabella. You’ll hear back personally within 24 hours.',
      assets,
      logoWidth: 150,
      content,
      footer: `<a href="${SITE}" style="color:${C.muted};text-decoration:none;">arabellasweddings.com</a> &nbsp;·&nbsp; <a href="${INSTAGRAM}" style="color:${C.muted};text-decoration:none;">Instagram</a><br>Wedding Planning &amp; Design in Sedona and Scottsdale, Arizona<br><span style="color:${C.faint};">You’re receiving this because you sent an inquiry on our website.</span>`,
    }),
  };
}
