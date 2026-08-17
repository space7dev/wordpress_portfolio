/**
 * @typedef {Object} ProjectMetric
 * @property {string} value
 * @property {string} label
 *
 * @typedef {Object} Project
 * @property {string} slug
 * @property {string} title
 * @property {string} type
 * @property {string} category
 * @property {string} year
 * @property {string} summary
 * @property {string} challenge
 * @property {string} solution
 * @property {string[]} services
 * @property {string[]} stack
 * @property {ProjectMetric[]} metrics
 * @property {string} accent
 * @property {string} screenshot
 * @property {boolean} featured
 * @property {string} [url]
 *
 * @typedef {Object} Service
 * @property {string} number
 * @property {string} title
 * @property {string} description
 * @property {string[]} deliverables
 *
 * @typedef {Object} Testimonial
 * @property {string} quote
 * @property {string} name
 * @property {string} role
 *
 * This module owns the shared portfolio content shapes. Runtime data remains plain
 * JavaScript so the project does not require a compilation step.
 */

export {};
