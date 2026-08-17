export const site = {
  name: 'Senior WordPress Developer',
  shortName: 'SWD',
  role: 'Senior WordPress Developer',
  description: 'Senior WordPress developer creating expressive, fast, and easy-to-manage websites for ambitious organizations.'
};

/** @type {import('../types/portfolio.js').Service[]} */
export const services = [
  {
    number: '01',
    title: 'WordPress strategy',
    description: 'A clear technical and editorial foundation before a single template is built.',
    deliverables: ['Discovery workshops', 'Content architecture', 'Technical planning']
  },
  {
    number: '02',
    title: 'Design & systems',
    description: 'Distinctive interfaces with reusable rules that keep every page coherent.',
    deliverables: ['UX and UI design', 'Design systems', 'Block patterns']
  },
  {
    number: '03',
    title: 'Custom development',
    description: 'Purpose-built themes and plugins without the drag of an oversized page builder.',
    deliverables: ['Block themes', 'WooCommerce', 'Custom plugins']
  },
  {
    number: '04',
    title: 'Care & growth',
    description: 'Long-term partnership that keeps WordPress secure, quick, and useful.',
    deliverables: ['Performance tuning', 'Accessibility', 'Ongoing support']
  }
];

/** @type {import('../types/portfolio.js').Testimonial} */
export const testimonial = {
  quote: 'We got the rare combination of a site our audience loves and a system our editors genuinely enjoy using.',
  name: 'Maya Chen',
  role: 'Editorial Director, Field Notes'
};

export const principles = [
  { value: '12+', label: 'Years building for the web' },
  { value: '70+', label: 'WordPress launches' },
  { value: '100%', label: 'Independent & hands-on' }
];
