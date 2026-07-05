# Lab 05: Time-based Blind SQLi - UniPortal Night Registrar

## Overview

| Field          | Value                                  |
|----------------|----------------------------------------|
| **Lab ID**     | 05                                     |
| **Title**      | UniPortal Night Registrar              |
| **Difficulty** | Advanced                               |
| **Category**   | SQL Injection - Time-based Blind SQLi  |
| **Target**     | Student-number probe                   |
| **Database**   | PostgreSQL                             |
| **Framework**  | Next.js 15 + TypeScript                |

## Scenario

UniPortal operates a late-night registrar tool that checks whether a student
number exists during enrollment freezes. The endpoint does not print hidden
records, and useful database errors are not part of the normal workflow.

The one signal you can observe is time. If a request takes noticeably longer
than usual, the database may have answered a hidden yes/no question.

## Mission Objectives

Primary objective:

- Establish normal response timing for the student probe.
- Build a conditional delay using PostgreSQL.
- Use delayed responses as a true/false signal.
- Extract the hidden registrar flag from `uni_flags`.

Secondary objective:

- Understand why time-based SQLi works without visible output.
- Practice extracting data character-by-character.
- Explain why parameterized queries stop timing payloads from becoming SQL.

## Target

Registrar Student Probe

```text
Student Number:
____________________

[ Search ]
```

Start at:

```text
http://localhost:3000/lab/05-time-based
```

## Rules

- Do not modify server files while solving.
- Do not use automated SQL injection tools.
- Do not brute force credentials.
- Use response time as the signal.

## Hints

### Hint 1

Try a real student number such as `STU-2024-001` and compare the elapsed time
with a fake one.

### Hint 2

PostgreSQL has `pg_sleep(seconds)`.

### Hint 3

A `CASE WHEN` expression can sleep only when your condition is true.

### Hint 4

The flag is stored in `uni_flags`.

## Learning Goals

After completing this lab, you should understand:

- Time-based blind SQL injection.
- Conditional delays with `pg_sleep`.
- Character-by-character extraction.
- Why hiding output does not remove injection risk.
- How parameterized queries prevent injected conditions.

## Success Conditions

- Produce one payload that responds normally.
- Produce one payload that delays intentionally.
- Recover the full `FLAG{...}` value from `uni_flags`.

## Reset

```bash
./reset.sh
```

This drops and recreates all lab data.
