/**
 * Build a consistent project record while keeping portfolio content concise.
 *
 * @param {Partial<import('../types/portfolio.js').Project>} details
 * @returns {import('../types/portfolio.js').Project}
 */
function project(details) {
  return {
    year: 'Live',
    metrics: [],
    accent: 'violet',
    featured: false,
    services: ['Strategy', 'Design', 'Development'],
    ...details
  };
}

/** @type {import('../types/portfolio.js').Project[]} */
export const projects = [
  project({
    slug: 'crafted-ny',
    title: 'Crafted',
    type: 'Digital Agency',
    category: 'agency',
    summary: 'A confident agency presence built around bold brand storytelling, featured work, and clear service pathways.',
    challenge: 'Present a broad digital-agency offering without losing the personality and craft that distinguish the studio.',
    solution: 'A focused, cinematic experience balances brand expression with direct routes into services, case studies, and contact.',
    stack: ['WordPress', 'WP Engine', 'Responsive UI'],
    screenshot: '/images/projects/craftedny.webp',
    url: 'https://www.craftedny.com/',
    featured: true
  }),
  project({
    slug: 'pound-and-grain',
    title: 'Pound & Grain',
    type: 'Digital Agency',
    category: 'agency',
    summary: 'An energetic agency portfolio that pairs culture-led creative direction with an unconventional editorial layout.',
    challenge: 'Communicate a playful studio personality while keeping a large body of campaigns and capabilities discoverable.',
    solution: 'A visually expressive, campaign-first experience uses strong art direction and unexpected composition to reward exploration.',
    stack: ['Creative Direction', 'Responsive Web', 'Agency Portfolio'],
    screenshot: '/images/projects/poundandgrain.webp',
    url: 'https://poundandgrain.com/'
  }),
  project({
    slug: 'flightpath',
    title: 'Flightpath',
    type: 'Digital Agency',
    category: 'agency',
    summary: 'A conversion-minded agency website connecting digital expertise with clear business outcomes.',
    challenge: 'Make a full-service digital offering feel approachable to decision-makers across multiple industries.',
    solution: 'Clear positioning, high-impact imagery, and deliberate calls to action create a direct journey from capability to conversation.',
    stack: ['Digital Strategy', 'Responsive Web', 'Lead Generation'],
    screenshot: '/images/projects/flightpath.webp',
    url: 'https://www.flightpath.com/'
  }),
  project({
    slug: 'due-north',
    title: 'Due North',
    type: 'Digital Agency',
    category: 'agency',
    summary: 'A growth-focused agency website that turns complex marketing and AI services into clear commercial propositions.',
    challenge: 'Explain a wide service offering and establish authority without overwhelming prospective clients.',
    solution: 'A modular WordPress build uses focused landing sections, strong proof points, and repeatable conversion patterns.',
    stack: ['WordPress', 'Elementor', 'PHP', 'Astra'],
    screenshot: '/images/projects/duenorth.webp',
    url: 'https://duenorth.com.au/',
    featured: true
  }),
  project({
    slug: 'masterton-homes',
    title: 'Masterton Homes',
    type: 'Real Estate',
    category: 'real-estate',
    summary: 'A comprehensive home-builder platform supporting design discovery, packages, display locations, and buyer enquiries.',
    challenge: 'Help buyers navigate a large catalogue of home designs and location-specific information with confidence.',
    solution: 'Strong promotional storytelling is paired with structured discovery paths for designs, packages, and display homes.',
    stack: ['Real Estate UX', 'Content Platform', 'Responsive Web'],
    screenshot: '/images/projects/masterton.webp',
    url: 'https://masterton.com.au/'
  }),
  project({
    slug: 'royale-gold-coast',
    title: 'Royale Gold Coast',
    type: 'Real Estate',
    category: 'real-estate',
    summary: 'An immersive property-marketing website for luxury beachfront residences on the Gold Coast.',
    challenge: 'Translate a premium physical development into a digital experience with an equally refined sense of place.',
    solution: 'Full-bleed visual storytelling, restrained typography, and enquiry-led navigation create a polished luxury journey.',
    stack: ['Luxury Property', 'Immersive Media', 'Lead Generation'],
    screenshot: '/images/projects/royalegc.webp',
    url: 'https://www.royalegc.com.au/'
  }),
  project({
    slug: 'luxury-presence',
    title: 'Luxury Presence',
    type: 'Real Estate',
    category: 'real-estate',
    summary: 'A sophisticated marketing platform presenting websites and growth services for luxury real-estate professionals.',
    challenge: 'Showcase a complex product ecosystem while maintaining the premium visual standard expected by luxury agents.',
    solution: 'A polished WordPress experience combines product storytelling, portfolio proof, and clear acquisition funnels.',
    stack: ['WordPress', 'WPBakery', 'Real Estate Marketing'],
    screenshot: '/images/projects/luxury-presence.webp',
    url: 'https://www.luxurypresence.com/',
    featured: true
  }),
  project({
    slug: 'charlotte-penthouses',
    title: 'Charlotte Penthouses',
    type: 'Real Estate',
    category: 'real-estate',
    summary: 'A focused property-search experience for luxury penthouses and condominiums in Uptown Charlotte.',
    challenge: 'Make premium property inventory easy to search while establishing strong local-market credibility.',
    solution: 'Prominent search tools, lifestyle imagery, and location-focused content help buyers move quickly from interest to listing.',
    stack: ['Property Search', 'IDX', 'Responsive Web'],
    screenshot: '/images/projects/charlotte-penthouses.webp',
    url: 'https://charlottepenthouses.com/'
  }),
  project({
    slug: 'arizona-home-group',
    title: 'Arizona Home Group',
    type: 'Real Estate',
    category: 'real-estate',
    summary: 'A regional real-estate website combining property discovery with clear buyer, seller, and finance pathways.',
    challenge: 'Serve multiple audience needs while keeping local listings and expert guidance at the center of the experience.',
    solution: 'A search-first homepage and segmented user journeys connect visitors with relevant homes and services quickly.',
    stack: ['Property Search', 'Real Estate UX', 'Lead Generation'],
    screenshot: '/images/projects/arizona-home-group.webp',
    url: 'https://www.arizonahomegroup.com/'
  }),
  project({
    slug: 'bayside-resort',
    title: 'Bayside Resort',
    type: 'Resort Booking',
    category: 'hospitality',
    summary: 'A destination-led resort website supporting room discovery, packages, amenities, and direct bookings.',
    challenge: 'Balance the emotional appeal of a Cape Cod stay with the practical details guests need before booking.',
    solution: 'An Elementor-powered WordPress experience prioritizes seasonal imagery, offers, and a persistent direct-booking path.',
    stack: ['WordPress', 'Elementor', 'Booking UX'],
    screenshot: '/images/projects/bayside-resort.webp',
    url: 'https://baysideresort.com/'
  }),
  project({
    slug: 'tinkering-monkey',
    title: 'Tinkering Monkey',
    type: 'Design Agency',
    category: 'agency',
    summary: 'A warm, tactile studio and commerce website for a team creating custom signage and branded environments.',
    challenge: 'Show the quality of physical craftsmanship while supporting inspiration, education, and online purchasing.',
    solution: 'A visual WordPress and WooCommerce experience brings process, materials, gallery work, and products into one system.',
    stack: ['WordPress', 'WPBakery', 'WooCommerce', 'PHP'],
    screenshot: '/images/projects/tinkering-monkey.webp',
    url: 'https://www.tinkeringmonkey.com/',
    featured: true
  }),
  project({
    slug: 'maxobiz',
    title: 'Maxobiz',
    type: 'Design Agency',
    category: 'agency',
    summary: 'A modern agency platform presenting AI, design, development, and growth services at scale.',
    challenge: 'Organize a wide capability set and substantial body of work into a concise business-development experience.',
    solution: 'Strong typography, purposeful GSAP motion, and modular PHP templates give every service a clear place in the story.',
    stack: ['GSAP', 'PHP', 'Responsive UI'],
    screenshot: '/images/projects/maxobiz.webp',
    url: 'https://www.maxobiz.com/'
  }),
  project({
    slug: 'avatrade',
    title: 'AvaTrade',
    type: 'Forex Trading',
    category: 'fintech',
    summary: 'A global trading website presenting instruments, platforms, education, and account acquisition in one experience.',
    challenge: 'Make a technically dense, regulated financial product understandable across markets, languages, and devices.',
    solution: 'A scalable PHP platform combines market-led content, strong risk communication, and direct account-conversion pathways.',
    stack: ['PHP', 'Trading Platform', 'Multilingual Web'],
    screenshot: '/images/projects/avatrade.webp',
    url: 'https://www.avatrade.com/',
    featured: true
  }),
  project({
    slug: 'gis-cloud',
    title: 'GIS Cloud',
    type: 'Cloud Software',
    category: 'software',
    summary: 'A product-led website for an online GIS platform spanning field collection, mapping, analysis, and collaboration.',
    challenge: 'Explain specialist geospatial capabilities to technical and operational audiences without flattening the product story.',
    solution: 'Clear solution architecture, interactive product demonstrations, and role-based journeys make the platform easier to evaluate.',
    stack: ['Cloud Software', 'Geospatial UX', 'Product Marketing'],
    screenshot: '/images/projects/gis-cloud.webp',
    url: 'https://www.giscloud.com/'
  }),
  project({
    slug: 'aventus',
    title: 'Aventus',
    type: 'Cryptocurrency',
    category: 'fintech',
    summary: 'A Web3 platform website connecting enterprise audiences with blockchain infrastructure and community-owned compute.',
    challenge: 'Make advanced blockchain infrastructure credible and understandable to real-world business decision-makers.',
    solution: 'A clean product narrative pairs direct value propositions with structured routes into cloud, appchains, and network participation.',
    stack: ['Web3', 'Blockchain', 'Cryptocurrency'],
    screenshot: '/images/projects/aventus.webp',
    url: 'https://www.aventus.io/'
  }),
  project({
    slug: 'nnc-solutions',
    title: 'NNC Solutions',
    type: 'Telecommunications',
    category: 'software',
    summary: 'A bilingual telecommunications website supporting consumer services, business solutions, electronics, and customer help.',
    challenge: 'Bring a broad portfolio of telecom offerings into one navigable experience for personal and business customers.',
    solution: 'Service-oriented navigation and high-visibility campaign modules connect visitors with relevant plans, devices, and support.',
    stack: ['Telecommunications', 'Bilingual UX', 'Responsive Web'],
    screenshot: '/images/projects/nnc-solutions.webp',
    url: 'https://nncsolutions.com/en/'
  })
];

export function findProject(slug) {
  return projects.find((item) => item.slug === slug);
}
