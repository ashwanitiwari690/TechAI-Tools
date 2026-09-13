import { DeveloperToolMeta } from '../../../core/models/developer-tool.model';

export const DEVELOPER_TOOLS: DeveloperToolMeta[] = [
  { slug: 'json-formatter', name: 'JSON Formatter', shortDescription: 'Pretty-print and indent JSON.', category: 'Formatting', icon: '{ }' },
  { slug: 'json-validator', name: 'JSON Validator', shortDescription: 'Check JSON for syntax errors.', category: 'Formatting', icon: '✓' },
  { slug: 'json-minifier', name: 'JSON Minifier', shortDescription: 'Compress JSON by removing whitespace.', category: 'Formatting', icon: '⇥' },
  { slug: 'base64', name: 'Base64 Encoder / Decoder', shortDescription: 'Encode and decode Base64 strings.', category: 'Encoding', icon: '64' },
  { slug: 'url-encoder-decoder', name: 'URL Encoder / Decoder', shortDescription: 'Percent-encode and decode URLs.', category: 'Encoding', icon: '%' },
  { slug: 'jwt-decoder', name: 'JWT Decoder', shortDescription: 'Decode and inspect JSON Web Tokens.', category: 'Encoding', icon: 'JWT' },
  { slug: 'uuid-generator', name: 'UUID Generator', shortDescription: 'Generate random UUID v4 identifiers.', category: 'Generators', icon: 'ID' },
  { slug: 'timestamp-converter', name: 'Timestamp Converter', shortDescription: 'Convert between Unix time and readable dates.', category: 'Converters', icon: '⏱' },
  { slug: 'regex-tester', name: 'Regex Tester', shortDescription: 'Test regular expressions against sample text.', category: 'Text', icon: '.*' },
  { slug: 'word-counter', name: 'Word & Character Counter', shortDescription: 'Count words, characters and sentences.', category: 'Text', icon: '#' },
  { slug: 'case-converter', name: 'Case Converter', shortDescription: 'Convert text between upper, lower, title and more.', category: 'Text', icon: 'Aa' },
  { slug: 'html-formatter', name: 'HTML Formatter', shortDescription: 'Beautify and indent HTML markup.', category: 'Formatting', icon: '<>' },
  { slug: 'css-formatter', name: 'CSS Formatter', shortDescription: 'Beautify and indent CSS stylesheets.', category: 'Formatting', icon: '{;}' },
  { slug: 'javascript-formatter', name: 'JavaScript Formatter', shortDescription: 'Beautify and indent JavaScript code.', category: 'Formatting', icon: 'JS' },
  { slug: 'color-converter', name: 'Color Converter', shortDescription: 'Convert colors between HEX, RGB and HSL.', category: 'Converters', icon: '◑' },
  { slug: 'password-generator', name: 'Password Generator', shortDescription: 'Generate strong, random passwords.', category: 'Generators', icon: '🔒' },
  { slug: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', shortDescription: 'Generate placeholder text for mockups.', category: 'Generators', icon: '¶' }
];
