# SQL Injection Labs

A hands-on SQL Injection training track from **The Cyber Labs**. This module
contains vulnerable, local-only web applications that teach how SQL injection
bugs appear in real features, how attackers reason through them, and how
developers can fix the root cause with safer query patterns.

> Safety note: run these labs only in your own local training environment. Do
> not deploy the vulnerable code publicly or test these techniques on systems
> where you do not have permission.

## Video Placeholders

Each lab is designed to have two YouTube resources:

- **Detailed YouTube Video:** concept explanation, lab walkthrough, and manual
  testing process.
- **Solution Video:** final exploit path, flag recovery, and secure-code review.

Add the links later using this format:

```md
Detailed YouTube Video: TODO
Solution Video: TODO
```

## What You Will Learn

By completing this track, you will practice:

- SQL query structure and how user input changes query behavior.
- Authentication bypass attacks.
- UNION-based data extraction.
- Error-based SQL injection.
- Boolean-based blind SQL injection.
- Time-based blind SQL injection.
- Second-order SQL injection.
- API and JSON-based injection points.
- Stacked query abuse where supported.
- Secure fixes using parameterized queries and safer data access patterns.

## Tech Stack

| Area | Tooling |
|---|---|
| Frontend and backend | Next.js 15, TypeScript |
| Database | PostgreSQL |
| Local environment | Docker Compose |
| Package manager | pnpm |

## Quick Start

From this module's lab application directory:

```bash
cd sql-injection/labs
docker compose up --build
```

Open the application:

```text
http://localhost:3000
```

Reset the lab database when needed:

```bash
cd sql-injection/labs
./reset.sh
```

If the reset script is not executable on your machine:

```bash
chmod +x reset.sh
./reset.sh
```

## Recommended Learning Flow

1. Read the lab scenario and objectives.
2. Explore the target application manually.
3. Identify which input reaches the database.
4. Observe response differences, errors, timing, redirects, or displayed data.
5. Build the payload step by step.
6. Capture the flag or complete the stated objective.
7. Review the vulnerable code path.
8. Rewrite the query using parameterized statements.
9. Watch the detailed video and solution video when links are added.

## Lab Index

| Lab | Title | Difficulty | Time | Technique | Start URL | Detailed Video | Solution Video |
|---|---|---:|---:|---|---|---|---|
| 01 | Login Bypass | Beginner | 15 min | Always-true injection | `/lab/01-auth-bypass` | TODO | TODO |
| 02 | Ghost Records | Beginner | 25 min | UNION-based SQLi | `/lab/02-union-attack` | TODO | TODO |
| 03 | Error-based SQLi | Intermediate | 30 min | PostgreSQL error leakage | `/lab/03-error-based` | TODO | TODO |
| 04 | Boolean Blind SQLi | Intermediate | 35 min | True/false inference | `/lab/04-boolean-blind` | TODO | TODO |
| 05 | Time-based Blind SQLi | Advanced | 45 min | Conditional delay extraction | `/lab/05-time-based` | TODO | TODO |
| 06 | Second-order SQLi | Advanced | 40 min | Stored payload execution | `/lab/06-second-order` | TODO | TODO |
| 07 | CRM System | Advanced | 45 min | Error-based double query | `/lab/07-crm-system` | TODO | TODO |
| 08 | Admin Dashboard | Intermediate | 30 min | UNION plus role escalation | `/lab/08-admin-dashboard` | TODO | TODO |
| 09 | API SQL Injection | Intermediate | 35 min | REST and JSON injection | `/lab/09-api-injection` | TODO | TODO |
| 10 | Blind SQLi Investigation | Advanced | 50 min | Blind extraction workflow | `/lab/10-blind-investigation` | TODO | TODO |
| 11 | Stacked Queries | Advanced | 50 min | Batch query injection | `/lab/11-stacked-queries` | TODO | TODO |

## Lab Details

### Lab 01: Login Bypass

**Scenario:** Raven Technologies has an employee portal with a vulnerable login
flow.

**Goal:** bypass authentication, reach the employee dashboard, and find the
hidden audit flag.

**Key skills:**

- Understanding SQL `WHERE` clauses.
- Making a condition evaluate to true.
- Using comments to ignore the rest of a query.
- Explaining why string concatenation breaks authentication.

**Links:**

- Detailed YouTube Video: TODO
- Solution Video: TODO
- Start: `http://localhost:3000/lab/01-auth-bypass`

### Lab 02: Ghost Records

**Scenario:** an employee directory search box accepts an employee ID, but the
backend query exposes more data than intended.

**Goal:** enumerate the query shape and extract hidden records from another
table.

**Key skills:**

- Finding the column count.
- Identifying reflected columns.
- Using `UNION SELECT` safely inside a lab environment.
- Understanding why mixed trusted and untrusted query data is dangerous.

**Links:**

- Detailed YouTube Video: TODO
- Solution Video: TODO
- Start: `http://localhost:3000/lab/02-union-attack`

### Lab 03: Error-based SQLi

**Scenario:** a banking application leaks useful database information through
SQL error messages.

**Goal:** use visible errors to understand the query and extract sensitive admin
configuration data.

**Key skills:**

- Reading database error messages.
- Mapping query structure from failures.
- Extracting data through reflected query results.
- Disabling verbose production errors.

**Links:**

- Detailed YouTube Video: TODO
- Solution Video: TODO
- Start: `http://localhost:3000/lab/03-error-based`

### Lab 04: Boolean Blind SQLi

**Scenario:** a hospital records system does not display raw database output,
but it does reveal whether a condition is true or false.

**Goal:** infer confidential data one decision at a time.

**Key skills:**

- Designing true/false tests.
- Extracting values character by character.
- Using response differences as a data channel.
- Reducing information leaks in application responses.

**Links:**

- Detailed YouTube Video: TODO
- Solution Video: TODO
- Start: `http://localhost:3000/lab/04-boolean-blind`

### Lab 05: Time-based Blind SQLi

**Scenario:** a university portal hides direct output, but the database can be
made to delay responses when a condition is true.

**Goal:** recover sensitive data by measuring response timing.

**Key skills:**

- Building conditional timing checks.
- Interpreting delayed and normal responses.
- Avoiding false positives from network noise.
- Preventing timing-based inference with safe queries.

**Links:**

- Detailed YouTube Video: TODO
- Solution Video: TODO
- Start: `http://localhost:3000/lab/05-time-based`

### Lab 06: Second-order SQLi

**Scenario:** an e-commerce platform stores user-controlled input during
registration and later reuses it inside another query.

**Goal:** plant a payload, trigger it in a later workflow, and understand why
stored input is still untrusted input.

**Key skills:**

- Recognizing second-order injection.
- Tracking data across multiple requests.
- Separating input validation from query safety.
- Fixing delayed execution bugs with parameters.

**Links:**

- Detailed YouTube Video: TODO
- Solution Video: TODO
- Start: `http://localhost:3000/lab/06-second-order`

### Lab 07: CRM System

**Scenario:** a CRM search workflow exposes database behavior through an
advanced error-based injection path.

**Goal:** enumerate and dump customer data from the CRM database.

**Key skills:**

- Database enumeration.
- Error-based extraction.
- Understanding information schema concepts.
- Limiting database permissions for application users.

**Links:**

- Detailed YouTube Video: TODO
- Solution Video: TODO
- Start: `http://localhost:3000/lab/07-crm-system`

### Lab 08: Admin Dashboard

**Scenario:** a dashboard separates normal users from administrators, but the
data retrieval path can be manipulated.

**Goal:** pivot from normal access toward administrative data exposure.

**Key skills:**

- UNION-based role manipulation.
- Data enumeration.
- Authorization checks after database reads.
- Keeping authorization logic server-side and explicit.

**Links:**

- Detailed YouTube Video: TODO
- Solution Video: TODO
- Start: `http://localhost:3000/lab/08-admin-dashboard`

### Lab 09: API SQL Injection

**Scenario:** SQL injection is not limited to forms; API requests can carry
unsafe values in JSON bodies, route parameters, and headers.

**Goal:** identify injectable API input and extract unauthorized data.

**Key skills:**

- Testing REST API endpoints.
- Inspecting JSON request bodies.
- Understanding server-side API trust boundaries.
- Validating input without replacing parameterized queries.

**Links:**

- Detailed YouTube Video: TODO
- Solution Video: TODO
- Start: `http://localhost:3000/lab/09-api-injection`

### Lab 10: Blind SQLi Investigation

**Scenario:** an investigation target provides almost no direct feedback, so
the attacker must combine boolean and timing signals.

**Goal:** perform a structured blind SQLi investigation and extract the target
secret.

**Key skills:**

- Planning blind extraction.
- Comparing response bodies and timing.
- Creating reliable test conditions.
- Logging evidence during manual testing.

**Links:**

- Detailed YouTube Video: TODO
- Solution Video: TODO
- Start: `http://localhost:3000/lab/10-blind-investigation`

### Lab 11: Stacked Queries

**Scenario:** a room or booking workflow allows multiple SQL statements to be
sent in one request where the database driver permits it.

**Goal:** use stacked query behavior to change application state and complete
the lab objective.

**Key skills:**

- Understanding statement stacking.
- Recognizing driver and database differences.
- Limiting query capabilities.
- Using least-privilege database accounts.

**Links:**

- Detailed YouTube Video: TODO
- Solution Video: TODO
- Start: `http://localhost:3000/lab/11-stacked-queries`

## Standard Lab README Template

Use this template when adding or updating an individual lab README:

```md
# Lab XX: Lab Title

## Overview

| Field | Value |
|---|---|
| Lab ID | XX |
| Difficulty | Beginner / Intermediate / Advanced |
| Time | 30 min |
| Category | SQL Injection |
| Technique | Technique name |
| Start URL | http://localhost:3000/lab/... |

## Videos

- Detailed YouTube Video: TODO
- Solution Video: TODO

## Scenario

Write the story and target context here.

## Mission Objectives

- Objective 1
- Objective 2
- Objective 3

## Rules

- Use only the local lab environment.
- Do not use automated scanners unless the lab specifically allows them.
- Do not modify source files while solving the challenge.
- Stop after completing the lab objective.

## Hints

### Hint 1

Add a gentle first hint.

### Hint 2

Add a stronger hint.

### Hint 3

Point toward the core technique without giving away the full solution.

## Solution Notes

Add the written solution after the challenge is published, or link to the
solution video.

## Mitigation

Explain the secure coding fix, including parameterized queries, least privilege,
error handling, and validation where relevant.
```

## Defensive Checklist

Use these practices when fixing the vulnerable patterns demonstrated in the
labs:

- Use parameterized queries or prepared statements for every user-controlled
  value.
- Avoid building SQL with string concatenation.
- Validate input type, length, and format before business logic.
- Return generic application errors to users.
- Log detailed errors only on the server side.
- Use least-privilege database users for the application.
- Keep authorization checks separate from user-controlled query results.
- Add tests for malicious input, not only normal input.

## Repository Notes

The runnable app lives in:

```text
sql-injection/labs
```

Individual older lab notes live in:

```text
sql-injection/labs/labs
```

The main lab metadata used by the homepage lives in:

```text
sql-injection/labs/app/data/labs.ts
```
