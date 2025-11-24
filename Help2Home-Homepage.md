# Help2Home — Homepage

## 0\) Quick summary \(one sentence\)

Build a fast, accessible, mobile‑first homepage that helps visitors quickly search property, discover featured listings, find role‑specific entry points \(Landlord, Tenant, Agent, Investor\), and trust the brand enough to sign up or inquire\.

## 1\) High‑level objectives for the homepage

- Communicate what Help2Home is in one glance \(value proposition\)\.
- Make search the primary action — let users find listings quickly\.
- Provide clear paths for Landlords, Tenants, Agents&#x2F;Caretakers and Investors to enter the appropriate flows\.
- Showcase trust signals \(testimonials, partner logos, secure payments, verified listings\)\.
- Encourage sign‑ups and lead capture \(CTA for listing a property, book a viewing, contact support\)\.
- Load fast on low bandwidth and be accessible for all users \(WCAG AA baseline\)\.

## 2\) Technical &amp; design constraints

- **Framework**: React \(single page app\) — components must be reusable\. If your stack differs, adapt names but keep component boundaries\.
- **Styling**: Use a utility CSS approach \(Tailwind, or clear CSS naming convention — BEM\)\. Keep class names consistent\.
- **Responsive**: Mobile‑first\. Support breakpoints: 0–639px \(mobile\), 640–1023px \(tablet\), 1024–1439px \(desktop\), 1440px\+ \(wide\)\. Provide layout changes for each\.
- **Performance**: First Contentful Paint \(FCP\) &lt; 1\.5s on 3G emulation target\. Use lazy loading, optimized images, critical CSS inlined, and caching headers\.
- **Accessibility**: WCAG 2\.1 AA\. Keyboard navigable, semantic HTML, ARIA where necessary, color contrast &gt;= 4\.5:1 for body text\.
- **Browser support**: Latest two versions of Chrome, Firefox, Edge, Safari; mobile Safari\. Graceful fallback for older browsers\.
- **Localization**: Support EN \(Nigeria English\) and future languages\. Currency: NGN as default; ability to show other currencies if needed\.

## 3\) Page structure &amp; component map \(top → bottom\)

1. Top header \(navigation \+ search bar \+ auth actions\)
2. Hero section \(value prop \+ search \+ primary CTAs\)
3. Role quick‑access cards \(Landlord, Tenant, Agent&#x2F;Caretaker, Investor\)
4. Featured listings carousel &#x2F; grid
5. How it works \(three‑step simple explanation\)
6. Benefits &#x2F; features overview \(icons \+ short bullets\)
7. Testimonials &#x2F; trust badges &#x2F; partner logos
8. Popular locations \(city cards with quick filters\)
9. Resources &#x2F; Blog preview \(optional\) or market insights snippet
10. Footer \(links, contact, social, legal\)

Each of the items above is a separate **component**\.

## 4\) Detailed component spec \(with acceptance criteria and states\)

### 4\.1 Header \(component: `Header`\)

**Includes**: Logo \(left\), primary nav links \(Browse, List your property, How it works\), search icon or mini search, language&#x2F;currency selector, phone&#x2F;contact link, Sign in &#x2F; Sign up buttons\.

**Layout behaviour**:

- Mobile: Collapsed hamburger menu at right, logo left\. A compact search icon visible next to hamburger\. Auth actions hidden inside menu \(except a small sign in icon\)\. The header must be sticky \(optional\) but should become compact on scroll down\.
- Desktop: Full nav visible, search input inline if space allows\.

**Accessibility &amp; semantics**:

- Header must be `&lt;header&gt;` with nav inside `&lt;nav aria\-label=&quot;Main navigation&quot;&gt;`\.
- All links must have descriptive `aria\-label` attributes where label text is not self explanatory\.

**Interactions**:

- Hamburger opens a full‑screen or sliding panel menu — trap focus inside panel; close on ESC\.
- Sign in button opens auth modal \(component `AuthModal`\) — focus management required\.

**Acceptance criteria**:

- Header renders correctly at all breakpoints\.
- Keyboard users can open menu, navigate links, and open sign in modal\.
- Visual focus styles exist for all interactive elements\.

### 4\.2 Hero \(component: `HeroSearch`\)

**Includes**: Large headline, supporting subtitle, primary search bar \(location input \+ rent&#x2F;min&#x2F;max or &#39;For sale&#x2F;To let&#39; toggle\), primary CTA buttons \(Search, List your property\), background image or subtle gradient\.

**Content guidance \(copy placeholders\)**:

- Headline: &quot;Find your next home in Nigeria — fast, trusted, local&quot;
- Subtitle: &quot;Search verified homes, schedule viewings and pay rent online — all in one place\.&quot;
- CTA primary: &quot;Search properties&quot;
- CTA secondary: &quot;List your property&quot;

**Search bar behaviour**:

- Location field: autocomplete suggestions from API\. Debounce input \(300ms\)\. Show suggestions with property counts\.
- Filters toggle: small dropdown or modal for filters \(price range, bedrooms, property type, furnished, date available\)\. On mobile filters open full screen\.
- On submit: call `GET &#x2F;api&#x2F;v1&#x2F;listings&#x2F;search?q=\.\.\.&amp;filters\.\.\.` and navigate to listings page with query params\.

**States**:

- Idle: empty &#x2F; placeholder\.
- Typing: suggestions dropdown appears; keyboard arrow navigation must work\.
- No results: show friendly message and suggested alternatives\.
- Error: show inline error \(e\.g\., &quot;Search temporarily unavailable&quot;\) with retry\.

**Accessibility**:

- Input fields have `label` or `aria\-label`\.
- Autocomplete is role=listbox with aria\-activedescendant management\.

**Acceptance criteria**:

- Autocomplete returns suggestions and keyboard navigation works\.
- Search submission navigates to correct results page and preserves filters in URL\.

### 4\.3 Role Quick‑Access \(component: `RoleCards`\)

**Four cards**: Landlord, Tenant, Agent&#x2F;Caretaker, Investor\. Each card includes icon, 1–2 line description, and two CTAs: &quot;Get started&quot; and &quot;Learn more&quot;\.

**Behaviour**:

- Cards are horizontally scrollable on mobile and grid on desktop\.
- Clicking &quot;Get started&quot; opens a role‑specific sign up modal or route \(`&#x2F;signup?role=landlord`\)\.
- Hover state on desktop: slight elevation and reveal quick details\.

**Acceptance criteria**:

- Each card is reachable via keyboard and actionable\.
- Role parameter is added to signup route when user clicks &quot;Get started&quot;\.

### 4\.4 Featured listings \(component: `FeaturedListings`\)

**Two presentation modes**:

- Carousel \(desktop &amp; tablet\) with autoplay \(user can pause\) and arrows\.
- Grid \(mobile\) with stacked cards\.

**Listing card contents**:

- Primary image \(16:9 or 4:3\) with lazy loading and low‑quality placeholder\.
- Price, address, quick badges \(e\.g\. &quot;Verified&quot;, &quot;2 beds&quot;\), short snippet, and CTA &quot;View listing&quot;\.
- Heart&#x2F;favourite icon to save listing \(if signed in show immediate save; otherwise show sign up prompt\)\.

**Interactions**:

- Clicking card navigates to `&#x2F;listing&#x2F;\{id\}`\.
- On hover show quick actions: Save, Schedule viewing\.

**Performance**:

- Use `&lt;picture&gt;` element &#x2F; responsive `srcset` and modern formats \(WebP&#x2F;AVIF\) with fallbacks\.

**Acceptance criteria**:

- Cards lazy load images and show correct placeholders\.
- Clicking a listing sends the user to the detailed page\.

### 4\.5 How it works \(component: `HowItWorks`\)

**Three steps visually**: Search → Book viewing → Move in &#x2F; Pay rent\.

- Each step has an icon, 1\-line description, and optional microcopy link\.

**Acceptance criteria**:

- Steps are clear and readable on mobile and desktop\.

### 4\.6 Benefits &#x2F; Feature list \(component: `FeaturesGrid`\)

- 6–8 short bullets with icons: Verified listings, Secure payments, 24&#x2F;7 support, Easy listing, Local experts, Transparent fees\.

**Acceptance criteria**:

- Semantic list \(`&lt;ul&gt;`\) with accessible icons \(aria\-hidden or labelled properly\)\.

### 4\.7 Testimonials &amp; Trust \(component: `Testimonials`\)

- Carousel or grid of short quotes, name, role \(Tenant &#x2F; Landlord\), star rating, and optional image\.
- Partner logos row \(banks, agencies, payment providers\) — displayed as non‑linked images for trust\.

**Acceptance criteria**:

- Testimonials are readable by screen readers and carousel is pauseable\.

### 4\.8 Popular locations \(component: `LocationsGrid`\)

- Cards with city name, average rent, quick link `Explore \{city\}` that pre‑populates search for that city\.
- On click navigate to listings using query param `?location=\{city\}`\.

**Acceptance criteria**:

- SEO‑friendly links that can be crawled\.

### 4\.9 Resources &#x2F; Market insights \(component: `InsightsPreview`\) — Optional

- Small section for blog&#x2F;news or market snapshot \(e\.g\., rent trends in Lagos\)\.

**Acceptance criteria**:

- Headlines link to resource pages and show dates\.

### 4\.10 Footer \(component: `Footer`\)

- Columns: Company \(About, Careers\), For \(Landlords, Tenants, Agents, Investors\), Help \(FAQ, Contact\), Legal \(Terms, Privacy\), Contact \(phone, email\), Social icons\.
- Bottom bar with copyright and language&#x2F;currency quick toggle\.

**Accessibility**:

- Footer links use descriptive text and have appropriate contrast\.

**Acceptance criteria**:

- All links functional, accessible, and keyboard reachable\.

## 5\) Behavior &amp; interaction details

- **Routing**: Use client‑side routing for speed but ensure pages are reachable by URL for SEO\. Example: `&#x2F;search?location=lagos&amp;beds=2&amp;min=50000&amp;max=150000`\.
- **State management**: Keep search state in URL \(query params\) and in a global store \(e\.g\. React Context &#x2F; Redux\) so components can read&#x2F;write consistently\.
- **Forms &amp; validation**: Client‑side validation for inputs with friendly error messages; server‑side validation must be expected\. Inline validation messages\.
- **Modals &amp; overlays**: Trap focus, ESC closes, return focus to triggering element\.
- **Skeleton loaders**: Use skeleton placeholders for any content fetched from API\.
- **Offline &amp; slow network**: Make sure core hero search works if suggestions fail — allow user to type and submit\.
- **Lazy loading**: Images below the fold and non‑critical scripts should be lazy\. Use IntersectionObserver\.
- **SEO**: Server‑side renderable components for the hero and featured listings \(or prerender where possible\)\. Use appropriate meta tags; Open Graph tags for social preview\.
- **Analytics &amp; tracking**: fire structured events \(see section 7\)\.

## 6\) Copywriting &amp; microcopy guidelines \(tone &amp; placeholders\)

**Tone**: Clear, friendly, trustworthy\. Use short sentences and active verbs\.

**Primary headline**: short, 6–8 words that express value\.<br>**Subhead**: one sentence that explains the main benefit\.

**CTAs**:

- Primary \(action\): &quot;Search properties&quot; &#x2F; &quot;List your property&quot;
- Secondary \(action\): &quot;Get started&quot; &#x2F; &quot;Learn more&quot;
- Microcopy under CTAs: &quot;No account required to search&quot; \(if true\)\.

**Form microcopy**:

- Location input placeholder: &quot;City, neighbourhood, landmark \(e\.g\., Victoria Island\)&quot;
- Date format: use clear examples \(e\.g\., &quot;Available from — DD&#x2F;MM&#x2F;YYYY&quot;\)
- Error messages: polite, actionable \(e\.g\., &quot;We couldn&#39;t load suggestions\. Try again or press Search to see all results\.&quot;\)

**Accessibility copy**:

- Use `aria\-label` for icons like heart&#x2F;favourite, e\.g\., `aria\-label=&quot;Save listing to favourites&quot;`\.

## 7\) Analytics, events &amp; A&#x2F;B test hooks

Implement an analytics layer \(send events to your analytics endpoint\) and make events consistent:

**Page view**: `homepage\_view` with fields: `user\_id \(nullable\)`, `locale`, `traffic\_source`\.

**Hero search events**:

- `hero\_search\_submitted` — payload: `\{query, filters, results\_count, search\_source: &#39;hero&#39;\}`
- `hero\_suggestion\_clicked` — `\{suggestion\_text, suggestion\_type, index\}`

**Listing interactions**:

- `listing\_card\_click` — `\{listing\_id, position, source: &#39;featured&#39;\}`
- `save\_listing` — `\{listing\_id, signed\_in\}`

**Role CTA clicks**:

- `role\_cta\_click` — `\{role: &#39;landlord&#39;|&#39;tenant&#39;|&#39;agent&#39;|&#39;investor&#39;, action: &#39;get\_started&#39;|&#39;learn\_more&#39;\}`

**Other**:

- `view\_testimonial`, `partner\_logo\_click`, `location\_quicklink\_click`\.

**A&#x2F;B testing hooks**:

- Mark CTAs and headline blocks with data attributes: `data\-ab\-test=&#39;hero\_headline&#39;` so variants can be swapped server&#x2F;client side\.

## 8\) API contracts \(frontend perspective\)

These are the minimal contracts the frontend expects\. Use semantic endpoints and versioning\.

**GET &#x2F;api&#x2F;v1&#x2F;search&#x2F;suggestions?q=\.\.\.**<br> Response: `\[\{id, label, type, count\}\]` where `type` could be `city|neighbourhood|landmark`\.

**GET &#x2F;api&#x2F;v1&#x2F;listings&#x2F;featured?limit=6**<br> Response: `\[\{id, title, price, currency, mainImageUrl, images\[\], address, beds, baths, verified, slug\}\]`\.

**POST &#x2F;api&#x2F;v1&#x2F;metric&#x2F;event**<br> Payload: analytics events as described above\.

**GET &#x2F;api&#x2F;v1&#x2F;partners**<br> Response: list of partner logos&#x2F;links\.

**GET &#x2F;api&#x2F;v1&#x2F;testimonials?limit=4**<br> Response: `\[\{text, name, role, rating\}\]`\.

\(Do not rely on these exact routes — adapt to backend team\. Frontend should defensively handle missing fields\.\)

## 9\) Assets &amp; content required from product&#x2F;design

- Logo files: SVG \(primary\), fallback PNG\.
- Brand colors, fonts, spacing tokens, and components library \(buttons, inputs, cards\)\.
- High quality hero background images \(3 variants for different breakpoints\) and image usage policy\.
- Icons \(SVG\) for role cards and features\.
- Placeholder images for skeletons and low‑quality image placeholders \(LQIP\)\.
- Copy for hero, role cards, features, and legal boilerplate\.
- Testimonials content, partner logos in SVG or PNG\.

## 10\) Security &amp; privacy considerations

- Do not embed any PII in analytics events\. Use hashed identifiers where needed\.
- All API calls must be over HTTPS\.
- For saved favourites or any sensitive action, require authentication\.
- Rate limit search suggestions on the client to protect backend and prevent abuse\.

## 11\) Testing &amp; QA checklist

-  Layout matches design in mobile&#x2F;tablet&#x2F;desktop\.
-  Keyboard navigation works for all interactive areas\.
-  Screen reader snapshot: navigate hero search, role cards, featured listing\.
-  All images load and lazy load correctly; responsive sizes served\.
-  Form validation cases: empty, invalid, network error\.
-  Analytics events fire with correct payloads\.
-  Broken API responses handled gracefully \(empty states, retry options\)\.
-  Performance checks: Lighthouse score \(Performance 80\+, Accessibility 90\+, Best Practices 80\+\)\.
-  SEO: server side render or prerender critical content; meta tags present\.

## 12\) Acceptance Criteria \(end\-to\-end\)

1. Hero search should return suggestions and navigate to results page; search state is preserved in URL\.
2. Role cards must route to role‑specific onboarding \(query param set\) and be keyboard accessible\.
3. Featured listings must show images, price, and link to the listing detail page\.
4. All CTAs must be instrumented with analytics events\.
5. Homepage must render fully on mobile within acceptable performance budget and meet accessibility checks\.

## 13\) Implementation timeline \(suggested milestones\)

- Day 1–2: Scaffold project, implement global layout, header, footer\.
- Day 3–5: Implement HeroSearch \(autocomplete\) \+ API mocking\.
- Day 6–8: Implement RoleCards \+ Sign up modal wiring\.
- Day 9–11: FeaturedListings component \+ lazy images\.
- Day 12–14: HowItWorks, Testimonials, Locations grid\.
- Day 15–17: Accessibility fixes, analytics instrumentation, QA\.
- Day 18: Final review and deploy to staging\.

\(Adjust timeline per team velocity\.\)

## 14\) Handoff notes for backend &amp; product

- Provide working endpoints for suggestions and featured listings \(see API contracts\)\.
- Provide image CDN URL patterns and responsive image sizes\.
- Provide SEO meta copy and OpenGraph images\.
- Backend should support CORS for the frontend domain and provide rate limits and caching headers\.

## 15\) Common edge cases &amp; how to handle them

- **No featured listings returned**: show fallback CTA to &quot;List your property&quot; and a short pitch\.
- **Slow suggestion API**: allow user to type and submit search without suggestions\.
- **User blocked scripts**: ensure critical interactions \(search\) still work without JavaScript \(progressive enhancement\) where possible — at minimum, ensure HTML form submit to search page works\.
- **High latency on mobile**: show skeletons and optimistic UI; defer non‑critical widgets\.

## 16\) Developer notes &amp; code patterns

- Break UI into small, testable components: `Header`, `HeroSearch`, `RoleCards`, `ListingCard`, `FeaturedListings`, `HowItWorks`, `Testimonials`, `LocationsGrid`, `Footer`\.
- Use composition and props for flexibility\.
- Centralize API calls in an `api` service\. Use swr&#x2F;react‑query for caching and stale‑while‑revalidate UX\.
- Use CSS variables for theme tokens and keep spacing consistent\.
- Write unit tests for components and E2E tests for the main flows \(hero search, role CTA, listing click\)\.

### End — Next steps

Once you confirm this spec, the next canvas can map this into an **MVP checklist** \(minimum features to ship\) and provide annotated wireframes for each breakpoint\.

*Document created for Help2Home — homepage frontend build\.*

