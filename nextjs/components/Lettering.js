/*
 * Live-text replacements for the baked display-text PNGs.
 *
 * The live Wix site renders its display lettering as flat images, which left
 * the homepage and /arabella with no headings at all and no crawlable copy.
 * These render the same lettering as real text using the two faces already
 * bundled in the layout — Playfair Display for the Didone caps, Pinyon Script
 * for the script words. Sizing lives in globals.css (`.awe-*`).
 *
 * Sizes are expressed in `cqw` so the type scales with its box exactly as the
 * replaced images did. Container query units resolve against an ANCESTOR
 * container, never the element itself, so `.awe-fit` always goes on a wrapper
 * and the type class on a child. Putting both on one element silently falls
 * back to viewport units and renders roughly twice the intended size.
 */

// Wrapper that establishes the query container. Width utilities go here.
export function Lettering({ children, className = '' }) {
  return <div className={`awe-fit ${className}`}>{children}</div>;
}

// "THE heart" / "THE trajectory" / "THE core".
// Renders as a heading so the section it labels is actually reachable.
export function ScriptBadge({ word, as: Tag = 'h2', className = '' }) {
  return (
    <Lettering className={className}>
      <Tag className="m-0 text-center">
        {/* Both spans are display:block, so the space is invisible but keeps the
            text content reading "THE heart" rather than "THEheart". */}
        <span className="awe-caps awe-badge-the">THE</span>{' '}
        <span className="awe-caps awe-script awe-badge-word">{word}</span>
      </Tag>
    </Lettering>
  );
}

// A wide caps line that ends in a single script word ("…BY WHAT WE create").
export function ScriptTagline({ caps, word, variant, as: Tag = 'p', className = '' }) {
  return (
    <Lettering className={className}>
      <Tag className={`awe-caps ${variant} m-0 text-center`}>
        {caps} <span className="awe-script">{word}</span>
      </Tag>
    </Lettering>
  );
}
