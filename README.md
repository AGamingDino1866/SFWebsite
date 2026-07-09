# Success Club 2026 Scholarship Portal

A simple scholarship website for the **Success Club 2026 - SDG 4: Quality Education** school project.

This year, Success Club 2026 culminates in a shared SDG Badge Project under **UN Sustainable Development Goal 4: Quality Education**. Along with the SDG projects for the Success Student Association, all five student clubs - Media, Business, Law, Social Sciences, and AI - work together toward one mission: creating a merit-based scholarship programme for underprivileged children who have the academic potential to succeed but are denied opportunity due to financial hardship.

Across Pakistan, thousands of children from low-income families are academically capable but financially unable to access quality education. Their potential goes unrealized not because of a lack of ambition or intellect, but because of economic circumstances. Success Club 2026 supports a real, operational scholarship programme that directly benefits underprivileged families.

## AI Club Project

**Designing & Building a Scholarship Website Portal**

Students work as product designers, web developers, and technology consultants to design and develop a functional scholarship website portal. The website serves as the central hub for the Success Club Scholarship Program, allowing students to explore scholarship opportunities, access eligibility guidance, submit applications, and receive updates through a user-friendly digital platform.

## Live Workflow

- Students open the website.
- Students click **My Applications**.
- The site sends them to the official Google Form.
- Google limits the form to one response per email.
- Responses appear in a private connected Google Sheet.
- Admins use the hidden `admin.html` page to open the response sheet.

## Frontend-Only Features

The portal uses frontend-only features to make the site feel complete while keeping hosting simple and reliable.

### Eligibility Checker

A guided checker helps students understand which scholarship path may fit them before opening the application form. It can ask about grade level, city, school needs, and household income range, then point the student toward the correct application choice.

### Application Checklist

The application page includes a preparation checklist so students know what to gather before opening the form:

- Active email address
- Full name and city
- Current school
- Current grade
- Guardian information
- Household income range
- Short personal statement

### FAQ Section

The FAQ section answers common student questions, including:

- Can I submit more than once?
- How do I check my application status?
- Which email should I use?
- When will the review team contact me?
- What happens after I submit the form?

### Application Timeline

The student-facing flow is shown as a simple timeline:

```txt
Learn about scholarships -> Check eligibility -> Prepare documents -> Submit form -> Review -> Contact -> Final decision
```

### Form Launch Modal

Before students leave the website, the form launch modal explains that they are opening the official Google Form and should use the correct email address. This keeps the transition clear and prevents confusion.

## Project Phases

### Phase 1: Discovery, Research & User Experience

Learning modules:

- Introduction to Digital Products
- Website Planning & Structure
- User Experience (UX) Fundamentals
- Scholarship Technology Ecosystems
- Website Design Fundamentals
- Information Architecture
- Problem Solving

Activities:

- Define the purpose of the scholarship website as an information and application portal.
- Identify target users: students applying for scholarships.
- Decide core features and website functionality.
- List scholarship information to be displayed.
- Decide website pages: Home, Scholarships, Apply, About, Contact.

Deliverables:

- User Research Report
- User Personas
- Scholarship Portal Blueprint
- Feature Requirement Document

### Phase 2: Website Design & Development

Learning modules:

- Frontend Development
- HTML, CSS & JavaScript
- Responsive Design
- UI Components
- Web Accessibility
- SEO Fundamentals

Activities:

- Design wireframes and user interfaces.
- Build scholarship information pages.
- Develop application submission workflows.
- Create the scholarship application form.
- Test user experience and accessibility.

Deliverables:

- Website Wireframes
- Scholarship Portal Prototype
- Eligibility Guidance System

### Phase 3: Testing, Optimization & Improvement

Learning modules:

- Product Testing
- User Feedback Analysis
- Website Optimization
- Bug Fixing
- Quality Assurance

Activities:

- Check cross-browser compatibility.
- Fix layout issues across devices and screen sizes.
- Validate HTML and CSS for errors.
- Organize a clean project file structure.

Deliverables:

- Functional Scholarship Portal
- User Testing Report
- Tested website flow functionality

### Phase 4: Final Showcase & Demo Day

Learning modules:

- Product Demonstration
- Technology Pitching
- Innovation Communication

Activities:

- Present the scholarship portal to judges.
- Demonstrate website pages and the application flow.
- Explain design decisions and the development process.
- Respond to technical and user experience questions.

Final deliverables:

- Fully Functional Scholarship Portal
- Application Management System
- Product Presentation Deck
- Demo Showcase

## Portfolio Outcome

By the end of Success Club 2026, students will have designed and developed a working scholarship portal that serves as the digital backbone of the Success Club Scholarship Initiative, helping underprivileged students access opportunities through a clear, accessible, and technology-driven platform aligned with **SDG 4: Quality Education**.

## Dates & Locations

```txt
1st July - Mid August 2026
Karachi | Lahore | Islamabad
```

## Important Links

Application form:

```txt
https://forms.gle/LWNga2iSiBCWmFnD7
```

Contact email:

```txt
successscholarships2026@gmail.com
```

## Admin Notes

The admin page is intentionally hidden from the public menu. It links to the private Google Sheet where submissions are reviewed. The sheet URL is not listed in this README.

For review tracking, add these columns in the Sheet:

```txt
Status
Notes
```

Suggested statuses:

```txt
Pending
Approved
Rejected
Needs Info
```

## Theme

**Success Club 2026**

**SDG 4: Quality Education**

Helping underprivileged students continue their education through a clear, accessible scholarship process.
