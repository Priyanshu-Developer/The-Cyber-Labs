# Lab 02: Employee Directory Leak - Operation: Ghost Records

## Overview

| Field          | Value                                |
|----------------|--------------------------------------|
| **Lab ID**     | 02                                   |
| **Title**      | Employee Directory Leak              |
| **Difficulty** | Beginner                             |
| **Category**   | SQL Injection - UNION Data Extraction|
| **Target**     | Raven Technologies Employee Directory|
| **Database**   | PostgreSQL                           |
| **Framework**  | Next.js 15 + TypeScript              |

## Story

Congratulations on gaining access to the Raven Technologies employee portal.

During your investigation, you discover another internal application used by
Human Resources to search employee records.

The HR team insists:

> Employees can only search by Employee ID, so there is no risk.

But during a routine code review, one developer quietly admitted:

> The search feature was built years ago. Nobody has touched it since.

An anonymous whistleblower left behind one final clue:

> The search box knows more than it should.

Your mission is to investigate the employee search system and determine whether
confidential information can be extracted from the backend database.

## Mission Objectives

Primary objective:

- Investigate the employee search feature.
- Enumerate the database structure.
- Extract hidden information.
- Recover the secret flag.

Secondary objective:

- Determine how many columns the query returns.
- Identify which columns are reflected in the webpage.
- Learn how UNION-based SQL Injection works.

## Target

Employee Search Portal

```text
Search Employee ID:
____________________

[ Search ]
```

Start at:

```text
http://localhost:3000/lab/02-union-attack
```

## Rules

- Do not modify server files while solving.
- Do not brute force.
- Do not use automated SQL injection tools.
- Everything required is inside this application.
- Observe every response carefully.

## Flag Format

```text
FLAG{...}
```

Example:

```text
FLAG{union_queries_are_powerful}
```

## Hints

### Hint 1

The application only expects a number. Or does it?

### Hint 2

Understanding how many columns are returned is often the first step.

### Hint 3

Not every returned column is displayed on the webpage. Find the ones that are.

### Hint 4

Once you control the returned data, you might be able to display anything stored
inside the database.

## Learning Goals

After completing this lab, you should understand:

- UNION SELECT attacks.
- Determining column count.
- Identifying reflected columns.
- Reading arbitrary database data.
- Why displaying database errors can be dangerous.
- Secure parameterized queries.

## Scenario

The application performs the following query:

```sql
SELECT id,
       name,
       department,
       email
FROM raven_employees
WHERE id = <user_input>;
```

The developers believed that because the input should always be numeric, the
application was safe.

Was it?

## Success Conditions

- Determine the number of returned columns.
- Successfully inject a UNION query.
- Display information not intended by the application.
- Locate the hidden security flag.

## Flag Location

The flag is not inside the employee directory table. It has been hidden elsewhere
in the database, inside an internal archive record planted by the security team.

## Progression From Lab 01

Lab 01 introduced authentication bypass by manipulating a `WHERE` clause.

Lab 02 moves beyond login bypass and shows how attackers use `UNION SELECT` to
read unintended data from other tables.

## Reset

```bash
./reset.sh
```

This drops and recreates all lab data.
