# SetuCrest School Supplies

Static, GitHub Pages–compatible website for school and institutional supplies across Delhi-NCR.

## Included

- Responsive semantic HTML landing page
- SEO title, description, canonical URL, robots.txt and sitemap.xml
- Organization structured data
- Zoho Forms enquiry form
- WhatsApp and direct contact links
- WhatsApp enquiry QR code
- Realistic category images for all seven supply categories
- `CNAME` for `school-supplies.setucrestglobal.com`
- SetuCrest logo and institutional supplies brochure

## GitHub Pages

1. Push the repository contents to the `main` branch.
2. In **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Confirm the custom domain as `school-supplies.setucrestglobal.com`.
4. Enable **Enforce HTTPS** after GitHub finishes the certificate check.

The enquiry form is hosted by Zoho Forms and embedded in the page, so visitors do not need Outlook or another email application. WhatsApp is provided as a direct link and QR-code alternative.

## SEO category pages

The site includes dedicated landing pages for:

- School stationery and classroom supplies
- School laboratory equipment
- School furniture and classroom requirements

Each page has a unique title, description, canonical URL, structured data, internal links and a quotation CTA.

## Editing and publishing

The confirmed phone and WhatsApp number is **+91 9821068129**. Use
`https://wa.me/919821068129` for WhatsApp. The website QR code includes the country
code. The downloadable brochure carries the same phone number.

Keep SetuCrest positioned as an institutional supplier. Do not claim manufacturing,
stock, certifications, fixed prices or delivery periods without verified business
information. Existing category URLs stay in place, including boards, art and sports.

Images displayed on the site are local WebP files. Product photographs must remain
under 100,000 bytes, with correct intrinsic dimensions and descriptive alt text.
Preserve the attribution and licence information in `assets/products/sources.json`
and `/image-credits/` when replacing a reference photograph.

After editing CSS or HTML, run these commands before committing:

```sh
python scripts/build_styles.py
python scripts/seo.py sitemap
python scripts/build_styles.py --check
python scripts/seo.py check
```

`styles.css` is the complete stylesheet. The style builder copies first-screen and
responsive styles into each page, loads the full stylesheet asynchronously, and
keeps a no-JavaScript fallback. Its content hash prevents stale CSS after changes.
The site uses system fonts; no external font download is required.

The publishing check validates canonical URLs, unique titles/descriptions, H1s,
local asset targets, contact links, image size/loading, internal discovery links
and sitemap images. IndexNow runs only after the matching Pages deployment; it is
not a Google Search Console indexing submission.
