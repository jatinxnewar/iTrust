import React from 'react';
import PropTypes from 'prop-types';

/**
 * Footer Link Configuration
 */
const FOOTER_SECTIONS = {
  product: {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'FAQ', href: '#faq' }
    ]
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Blog', href: '#blog' },
      { label: 'Contact', href: '#contact' }
    ]
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'HIPAA Compliance', href: '#hipaa' },
      { label: 'Security', href: '#security' }
    ]
  }
};

const SOCIAL_LINKS = [
  { id: 'twitter', emoji: '🐦', href: '#twitter', label: 'Twitter' },
  { id: 'linkedin', emoji: '💼', href: '#linkedin', label: 'LinkedIn' },
  { id: 'facebook', emoji: '📘', href: '#facebook', label: 'Facebook' },
  { id: 'instagram', emoji: '📷', href: '#instagram', label: 'Instagram' }
];

/**
 * Footer Link Component
 */
const FooterLink = ({ href, label }) => (
  <li>
    <a href={href} className="transition-base hover:text-white column-gap-1">
      {label}
    </a>
  </li>
);

FooterLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

/**
 * Footer Section Component
 */
const FooterSection = ({ title, links }) => (
  <div>
    <h4 className="text-semibold mb-3 text-white">{title}</h4>
    <ul className="space-y-2 text-sm text-secondary">
      {links.map(link => (
        <FooterLink key={link.href} {...link} />
      ))}
    </ul>
  </div>
);

FooterSection.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired
    })
  ).isRequired
};

/**
 * Social Links Component
 */
const SocialLinks = () => (
  <div className="flex gap-3 md:gap-6">
    {SOCIAL_LINKS.map(link => (
      <a
        key={link.id}
        href={link.href}
        className="transition-base hover:text-white text-secondary"
        aria-label={link.label}
      >
        <span className="text-xl">{link.emoji}</span>
      </a>
    ))}
  </div>
);

/**
 * Footer Brand Section Component
 */
const FooterBrand = () => (
  <div>
    <h3 className="text-3xl font-bold mb-4 text-white">iTrust</h3>
    <p className="text-secondary text-sm leading-relaxed">
      AI-powered health management for a healthier tomorrow.
    </p>
  </div>
);

/**
 * Footer Bottom Section Component
 */
const FooterBottom = ({ currentYear = new Date().getFullYear() }) => (
  <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
    <p className="text-sm text-secondary">
      © {currentYear} iTrust. All rights reserved.
    </p>
    <SocialLinks />
  </div>
);

FooterBottom.propTypes = {
  currentYear: PropTypes.number
};

/**
 * Main Footer Component
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="footer-content grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <FooterBrand />
          <FooterSection title={FOOTER_SECTIONS.product.title} links={FOOTER_SECTIONS.product.links} />
          <FooterSection title={FOOTER_SECTIONS.company.title} links={FOOTER_SECTIONS.company.links} />
          <FooterSection title={FOOTER_SECTIONS.legal.title} links={FOOTER_SECTIONS.legal.links} />
        </div>

        {/* Footer Bottom */}
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
