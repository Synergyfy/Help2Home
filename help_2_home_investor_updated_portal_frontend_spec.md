## Rental Property Financing Marketplace (Tenant-Backed Investments)

This is a **second type of investment opportunity** different from property development projects.
Here, investors fund **tenant rent-to-own / installment-based rental payments** for real, already-identified properties where a tenant has applied and passed Help2Home affordability checks.

The frontend must treat this as a new opportunity class called:

> **Rental-Backed Investment**

---

### A. Rental Opportunities Page (Tenant Applications Marketplace)

Create a new tab inside Opportunities:

- Property Projects
- **Tenant Rental Financing** (new)

Each listing card must show:

- Property image
- Property location
- Monthly rent / installment amount
- Total property value
- Amount required from investors
- Tenant affordability score (e.g. 82/100)
- Risk level (Low / Medium / High)
- Repayment duration (e.g. 24 months)
- Investor expected ROI (%)
- Repayment success projection (%)
- Funding progress bar
- CTA: "View Tenant Application"

Filters required:

- Risk level
- Duration
- ROI range
- Funding needed
- Tenant income bracket
- Location

---

### B. Rental Opportunity Detail Page

This page must provide a **full Tenant Investment Dossier**.

#### 1. Property Summary

- Property photos carousel
- Address/location map
- Total property cost
- Monthly repayment plan
- Required funding amount
- Funding gap remaining

#### 2. Tenant Profile (KYC Approved)

Show anonymized but verified info:

- Employment status
- Monthly income range
- Income stability score
- Rent-to-income ratio
- Historical rental behavior (if available)
- Household size
- Employment duration

Never expose full personal identity data.

---

#### 3. Affordability Check Results

Display Help2Home internal assessment:

- Income vs repayment ratio
- Expense analysis
- Debt obligations (banded)
- Disposable income estimate
- Affordability status (Pass / Conditional)

---

#### 4. Default Risk & Repayment Projection

Show frontend widgets for:

- Probability of full repayment (%)
- Probability of default (%)
- Stress-tested repayment confidence
- Payment reliability score
- Behavioral risk indicators

Display using:

- Gauge meter
- Risk badge
- Projection timeline chart

---

#### 5. Investment Terms

- Investment duration
- Monthly repayment schedule
- Investor return %
- Payment distribution frequency
- Platform service fee
- Late payment penalty handling
- Exit terms

---

#### 6. Repayment Waterfall (Very Important UI)

Show how auto-deducted funds are split:
Example:

- Tenant pays ₦250,000 monthly
- Platform fee: 5%
- Investor pool share: 15% return

Create a visual breakdown bar:
Tenant Payment → Platform Fee → Investor Return → Principal Repayment

---

#### 7. Legal & Agreement Docs

- Tenant repayment agreement
- Investor participation agreement
- Risk disclosure
- Profit-sharing agreement

Download & preview required.

---

### C. Investment Flow (Rental Financing)

Steps:

1. Enter investment amount
2. Show expected monthly earnings
3. Show repayment duration
4. Accept rental financing agreement
5. Confirm investment

After confirmation:

- Mark funding progress updated
- Add this to investor Portfolio as:
  **Rental Income Investment**

---

### D. Auto Repayment Distribution Dashboard

Inside Portfolio → Rental Investments:

Show:

- Tenant repayment status (Paid / Missed / Pending)
- Next deduction date
- Total repaid to date
- Investor earnings received
- Remaining principal

Include timeline of:

- Monthly deductions
- Investor payout history

---

### E. Payment Distribution Logic (Frontend display only)

When tenant repayment is auto-deducted:
System distributes:

- Platform fee
- Investor returns
- Principal recovery

Investor should see:

- Amount credited
- Source property
- Date received
- Current ROI achieved

---

### F. Default / Recovery Monitoring

Create status states:

- On Track
- Delayed
- At Risk
- Defaulted

If delayed:

- Show grace period
- Late fee impact

If defaulted:

- Show recovery actions in progress
- Collateral status (if applicable)

---

### G. Notifications

Notify investors when:

- Funding is complete
- Landlord has been paid
- Monthly repayment received
- Tenant misses payment
- Recovery process initiated

---

## Final notes to developers

1. Keep UI simple, consistent and mobile-first.
2. Use the reusable components listed above.
3. When in doubt, prefer clear copy and protective UX: show confirmations for money moves.
4. Work closely with backend engineers to align API shapes and error handling.
5. Add feature flags for new investment product experiments so the team can enable/disable without deploy.

