# Success Club 2026 Scholarship Portal

A scholarship website for the **Success Club 2026 - SDG 4: Quality Education** project.

The website helps underprivileged students learn about scholarship support, prepare their application, submit the official application form, and check their application status.

## Website Pages

### Home

The homepage introduces the mission of the scholarship portal: helping underprivileged students continue their education. It includes a hero image, mission sections, university inspiration cards, and guidance for students.

### My Applications

The My Applications page is the main student action page. It includes an eligibility checker, application checklist, application timeline, FAQ section, and button to open the official application form.

### Resources

The Resources page helps students prepare stronger applications with document tips, essay guidance, a prep tracker, and university research prompts.

### Status

The Status page lets students check their application status with an application ID. Status records are stored in Firebase Firestore and updated by the scholarship team.

### Contact Us

The contact page gives students a way to reach the scholarship team for help. Students are asked to use the same email address they used in the application form so their response can be found quickly.

### Admin Page

The admin page is hidden from the public menu. It is used by the review team to access submitted application responses and manage review notes/status privately.

## Student Flow

```txt
Visit Home -> Open My Applications -> Check eligibility -> Prepare details -> Submit form -> Check status
```

## Application Form

```txt
https://forms.gle/LWNga2iSiBCWmFnD7
```

## Contact Email

```txt
successscholarships2026@gmail.com
```

## Status Lookup

Status lookup uses Firebase Firestore collection:

```txt
application_status
```

Each application status should use the application ID as the document ID, such as:

```txt
SC2026-DEMO
```

Suggested fields:

```txt
application_id
student_name
city
status
message
updated_at
```

## Project Theme

**Success Club 2026**

**SDG 4: Quality Education**

Helping underprivileged students continue their education through a clear and accessible scholarship process.
