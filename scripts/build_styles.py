#!/usr/bin/env python3
"""Refresh inline first-screen styles and version the full asynchronous CSS.

Run after editing styles.css. --check is read-only and used by publishing checks.
The original full stylesheet remains the source of truth and the no-JS fallback.
"""
import argparse
from hashlib import sha256
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def media_blocks(css):
    # This stylesheet has balanced CSS blocks; preserve complete responsive rules.
    for start in re.finditer(r'@media\b', css):
        opening = css.index('{', start.start())
        depth = 1
        end = opening + 1
        while depth:
            depth += (css[end] == '{') - (css[end] == '}')
            end += 1
        yield css[start.start():end]


def critical_styles(css):
    common = css[:css.index('.section {')]
    detail = css[css.index('.detail-hero {'):css.index('.detail-intro {')]
    guide = '\n'.join(line for line in css.splitlines()
                      if line.startswith(('.guide-hero ', '.hero-service-area ')))
    # Section spacing covers the first screen of resource and credits pages.
    section = re.search(r'\.section \{[^}]+}', css)[0]
    text = '\n'.join([common, detail, guide, section, *media_blocks(css)])
    return re.sub(r'\s+', ' ', re.sub(r'/\*.*?\*/', '', text, flags=re.S)).strip()


def update(check=False):
    css = (ROOT / 'styles.css').read_text()
    version = sha256(css.encode()).hexdigest()[:12]
    critical = critical_styles(css)
    tag = ('<!-- BEGIN GENERATED STYLES -->\n'
           '<style id="critical-css">' + critical + '</style>\n'
           '<link rel="stylesheet" href="/styles.css?v=' + version + '" '
           'media="print" onload="this.media=\'all\'">\n'
           '<noscript><link rel="stylesheet" href="/styles.css?v=' + version + '"></noscript>\n'
           '<!-- END GENERATED STYLES -->')
    stale = []
    for path in ROOT.rglob('*.html'):
        source = path.read_text()
        if '<!-- BEGIN GENERATED STYLES -->' in source:
            output = re.sub(r'<!-- BEGIN GENERATED STYLES -->.*?<!-- END GENERATED STYLES -->',
                            lambda m: tag, source, flags=re.S)
        else:
            output = re.sub(r'<link rel="stylesheet" href="(?:\.\./|/)?styles\.css">',
                            lambda m: tag, source)
        if output == source:
            continue
        stale.append(str(path.relative_to(ROOT)))
        if not check:
            path.write_text(output)
    if check and stale:
        raise ValueError('Run python scripts/build_styles.py: ' + ', '.join(stale))
    print(f'Inline styles {len(critical)} bytes; stylesheet version {version}; {len(stale)} pages updated.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    update(parser.parse_args().check)
