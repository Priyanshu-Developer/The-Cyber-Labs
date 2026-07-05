# Lab 03: Error-based SQLi - BankSecure Wire Desk

## Overview

| Field          | Value                                |
|----------------|--------------------------------------|
| **Lab ID**     | 03                                   |
| **Title**      | BankSecure Wire Desk                 |
| **Difficulty** | Intermediate                         |
| **Category**   | SQL Injection - Error-based Leakage  |
| **Target**     | Bank account lookup                  |
| **Database**   | PostgreSQL                           |
| **Framework**  | Next.js 15 + TypeScript              |

## Scenario

BankSecure is preparing its wire-transfer desk for a compliance review. Analysts
use a small lookup tool to confirm whether an account is active before approving
transfer batches.

The application usually returns account details or a quiet "not found" response,
but malformed input can expose raw PostgreSQL error messages. Management wants
to know whether those errors can leak protected emergency configuration data.

## Mission Objectives

Primary objective:

- Investigate the account lookup form.
- Trigger a controlled database error.
- Use the error response to infer the vulnerable query structure.
- Extract the protected `db_master_password` value.
- Extract the protected `api_secret_key` value.

Secondary objective:

- Explain why raw database errors make injection bugs more dangerous.
- Identify how the trailing `status = 'active'` condition affects payloads.
- Document the defensive fix.

## Target

Account Lookup Portal

```text
Account Number:
____________________

[ Lookup ]
```

Start at:

```text
http://localhost:3000/lab/03-error-based
```

## Rules

- Do not modify server files while solving.
- Do not brute force account numbers.
- Do not use automated SQL injection tools.
- Use only the account lookup workflow.

## Hints

### Hint 1

Compare a normal missing account with malformed input. They fail differently.

### Hint 2

The input is placed inside single quotes.

### Hint 3

PostgreSQL error messages often include the value that failed to convert.

### Hint 4

The target values are stored in `bank_admin_data`.

## Learning Goals

After completing this lab, you should understand:

- Error-based SQL injection.
- How database errors reveal query structure and data.
- Why subqueries can be used inside expressions.
- How comments can remove unwanted trailing SQL.
- Why production apps should not expose raw database errors.
- How parameterized queries prevent this class of bug.

## Success Conditions

- Trigger at least one useful PostgreSQL error.
- Recover `db_master_password`.
- Recover `api_secret_key`.
- Explain the vulnerable query and the secure fix.

## Reset

```bash
./reset.sh
```

This drops and recreates all lab data.
