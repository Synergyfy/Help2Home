Property Listing Page Wizard - Updates & Corrections

Based on Synergyfy Global's feedback starting from 17:45, here's a comprehensive list of all corrections and updates needed for the property listing wizard:

🎯 Complete Task Prompt for AI Implementation
You are tasked with updating the property listing wizard page. Implement the following corrections and features:

### 1. REQUIRED vs OPTIONAL FIELD INDICATORS
- Add clear visual distinction between required and optional fields
- Mark required fields with an asterisk (*) or similar indicator
- Ensure all form sections clearly show which fields must be completed before proceeding

### 2. AI-POWERED DESCRIPTION SUGGESTIONS
- Implement an AI suggestion feature for property descriptions
- When users fill in the property title, the system should suggest a full description
- Users can accept, edit, or reject the AI-generated description
- This applies to the property details section

### 3. PROPERTY AVAILABILITY CALENDAR FEATURE
- Add a calendar date picker for property availability
- Allow landlords to select when the property becomes available in step 1:
  * "Available Now"
  * "Available in [X] weeks/months"
  * "Available on [specific date]"
- Display selected availability dates prominently on the property listing
- Show availability information on the marketplace homepage at a glance
- Include availability as a filterable option in the marketplace search/filter section
- Users should be able to filter properties by availability (e.g., "Show properties available in 6 months")

### 4. INSTALLMENT PAYMENT POLICY POP-UP
- Create a mandatory pop-up modal when landlords enable installment payments
- Pop-up should include:
  * Clear statement: "By enabling this, you agree to receive payments directly from tenants over time"
  * Information about financing partner involvement
  * Notice that interest will be added to the total payable amount
  * A checkbox: "I understand the policies" with a hyperlink to "Installment Policy for Landlord" page
  * Only allow enabling installments after user checks the box and clicks "Okay"
- The policy link should navigate to a dedicated "Installment Policy for Landlord" page

### 5. DOWN PAYMENT PERCENTAGE VALIDATION
- Set maximum down payment percentage limit to 90% (not 100%)
- Prevent users from entering percentages above 90%
- Show validation error if user attempts to enter more than 90%
- Display error message: "Maximum down payment is 90% of the total rent"

### 6. DOWN PAYMENT FIXED AMOUNT VALIDATION
- Set maximum fixed down payment amount to 90% of the total property rent
- Calculate: Maximum Fixed Amount = 90% × Total Rent
- Prevent users from entering amounts exceeding this maximum
- Show validation error if user attempts to exceed the limit
- Display error message: "Maximum down payment amount is [calculated amount]"

### 7. PERCENTAGE TO FIXED AMOUNT AUTO-CONVERSION
- When user switches from percentage to fixed amount input:
  * Automatically convert the percentage value to a fixed amount
  * Example: If user entered 50%, automatically calculate and display 50% of total rent as fixed amount
- When user switches from fixed amount to percentage input:
  * Automatically calculate and display the equivalent percentage
  * Example: If user entered 5 million as fixed amount, calculate and display the percentage of total rent

### 8. RENTAL PERIOD UNIT CLARITY
- When landlord changes rental period from "Per Annum" to "Per Month":
  * Clearly indicate the change in the UI
  * Prompt user to update their rental amount figure
  * Show visual indicator that the amount needs adjustment
  * Example: If rent was 7 million per annum, user needs to recalculate for monthly rate

### 9. REPAYMENT DURATION AS SLIDER (NOT FIXED OPTIONS)
- Replace fixed options (3 months, 6 months, etc.) with a dynamic slider
- Slider range depends on property availability:
  * **For 6-month availability property**: Slider range 1-4 months
  * **For 1-year availability property**: Slider range 1-10 months
  * **For 2-year availability property**: Slider range 1-20 months
- Allow users to select any duration within the range (not just preset options)
- Slider should update calculations in real-time as user adjusts duration

### 10. MONTHLY INTEREST RATE (NOT ANNUAL)
- Change from annual interest rate to monthly interest rate
- Admin should set monthly interest rates (e.g., 2% per month) instead of annual rates
- Reason: Annual rates don't work well for properties with short availability (e.g., 6 months)
- For 6-month properties, annual rate would need to be divided by 2, causing confusion
- Monthly rates are clearer and more flexible for all property durations
- Admin should control and set these rates globally for all landlords

### 11. INTEREST RATE DISPLAY (READ-ONLY FOR LANDLORDS)
- Interest rates should be set by admin, not by individual landlords
- Landlords should only see the interest rate as a read-only display
- Remove any input field for landlords to enter interest rates
- Display format: "Annual Interest Rate: [X]%" (as informational text only)
- Admin panel should have a separate page to set interest rates for the platform

### 12. REAL-TIME PAYMENT CALCULATION
- When landlord enters down payment amount and selects repayment duration:
  * Automatically calculate monthly payment amount
  * Display: "Monthly Payment: [calculated amount]"
  * Include interest in the monthly payment calculation
  * Update calculations in real-time as user adjusts any value

### 13. REMAINING BALANCE CALCULATION
- Calculate and display remaining balance after down payment:
  * Remaining Balance = Total Rent - Down Payment
  * Apply interest rate to remaining balance
  * Show: "Remaining Balance: [amount] + [interest amount]"
  * Update in real-time as down payment changes

### 14. FINANCIAL CALCULATOR INTEGRATION
- Ensure the financial calculator on marketplace shows:
  * Down payment percentage/amount
  * Repayment duration (in months)
  * Monthly payment amount
  * Total interest charges
  * Remaining balance
- Calculator should match the landlord's configured installment settings
- Display should be clear and easy to understand for potential tenants

### 15. PROPERTY AVAILABILITY FILTERING
- Add "Availability" filter option in marketplace search/filter section
- Allow users to filter by:
  * "Available Now"
  * "Available in [X] weeks"
  * "Available in [X] months"
  * "Available on [specific date]"
- Filter should work alongside existing filters (location, price, etc.)

### 16. FORM FIELD ORGANIZATION
- Ensure all required fields are clearly marked
- Group related fields logically
- Maintain consistent spacing and layout
- Ensure form is mobile-responsive

### 17. ERROR HANDLING & VALIDATION MESSAGES
- Display clear, specific error messages for:
  * Down payment exceeding 90%
  * Fixed amount exceeding 90% of rent
  * Invalid percentage values
  * Missing required fields
- Use consistent error message styling
- Position error messages near the problematic field

### 18. USER GUIDANCE & TOOLTIPS
- Add helpful tooltips explaining:
  * What down payment means
  * How installment payments work
  * How interest is calculated
  * What availability means
- Ensure tooltips are accessible and non-intrusive

📋 Summary of Key Updates by Section
Finance Section Updates 💰
17:45 - Down payment percentage max: 90% (not 100%)
21:41 - Add mandatory pop-up for installment policy acknowledgment
23:53 - Fixed amount should not exceed 90% of total rent
25:01 - Auto-convert between percentage and fixed amount
26:13 - Remove landlord ability to set interest rates; admin only
34:32 - Change from annual to monthly interest rates
Availability Feature 📅
17:40 - Add calendar picker for property availability dates
18:09 - Display availability on homepage at a glance
19:00 - Add availability as filterable option in marketplace
Repayment Duration ⏱️
31:50 - Change from fixed options to slider control
32:13 - 6-month property: 1-4 months range
33:08 - 1-year property: 1-10 months range
33:21 - 2-year property: 1-20 months range
Form & UX Updates 🎨
14:02 - Mark fields as required vs optional
14:14 - Add AI suggestion feature for property descriptions
16:08 - Ensure required/optional indicators on all sections
✅ Implementation Priority

High Priority (Critical):

Down payment validation (90% max)
Installment policy pop-up
Monthly interest rate system
Repayment duration slider
Availability calendar feature

Medium Priority (Important):

Auto-conversion between percentage/fixed amount
Real-time payment calculations
Availability filtering in marketplace
Required/optional field indicators

Low Priority (Enhancement):

AI description suggestions
Tooltips and user guidance
Enhanced error messaging

This comprehensive list covers all feedback from 17:45 onwards regarding the property listing wizard updates.