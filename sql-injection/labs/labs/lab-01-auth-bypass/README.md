# Lab 01: Authentication Bypass - Raven Technologies Employee Portal

## Overview

| Field          | Value                                          |
|----------------|------------------------------------------------|
| **Lab ID**     | 01                                             |
| **Title**      | Authentication Bypass - Employee Portal        |
| **Difficulty** | Beginner                                       |
| **Time**       | 15-20 minutes                                  |
| **Category**   | SQL Injection                                  |
| **Database**   | PostgreSQL                                     |
| **Framework**  | Next.js 15 + TypeScript                        |

## Scenario

Raven Technologies recently migrated its legacy employee portal to a new internal
web application.

A junior developer was asked to quickly rebuild the login page before an internal
security audit. The development team claims:

> We sanitize everything.

However, an anonymous insider sent your security team an encrypted message:

> The login page is not as secure as they think. Sometimes asking the database
> the right question is enough.

Management has authorized you to perform a controlled penetration test against
the employee portal.

## Mission Objectives

Primary objective:

- Bypass the authentication mechanism.
- Gain access to the employee dashboard.
- Locate the hidden internal audit flag.

Secondary objective:

- Understand why the authentication bypass worked.
- Identify the vulnerable SQL query.
- Explain how SQL comments and boolean conditions changed the login logic.

## Target

Employee Login Portal

```text
Username: __________________
Password: __________________

[ Login ]
```

Start at:

```text
http://localhost:3000/lab/01-auth-bypass
```

## Rules

- Do not modify application files while solving the lab.
- Do not use brute force.
- Do not use automated scanners.
- Everything required exists inside this lab.
- Think like the database.

## Getting Started

```bash
# From the project root
docker compose up --build

# Wait for both containers to be healthy, then open:
# http://localhost:3000/lab/01-auth-bypass
```

## Flag Format

```text
FLAG{...}
```

Example:

```text
FLAG{sql_login_bypass_master}
```

## Hints

### Hint 1

The application sends your username and password directly to the database.

### Hint 2

Think about what SQL checks during login.

### Hint 3

What happens if the `WHERE` condition always evaluates to `TRUE`?

### Hint 4

Comments can sometimes make the database ignore the rest of a query.

## Learning Goals

After completing this lab, you should understand:

- How login forms interact with SQL databases.
- Why string concatenation is dangerous.
- Authentication bypass using SQL Injection.
- SQL comments.
- Boolean conditions inside SQL.
- Secure authentication practices.

## Vulnerable Query

During the security assessment, you discover that the application builds SQL
queries like this:

```sql
SELECT *
FROM portal_employees
WHERE username = '<input>'
AND password = '<input>';
```

Something about this query does not seem right.

## Success Conditions

- Login without valid credentials.
- Reach the Employee Dashboard.
- Find the hidden flag.

## Flag Location

The flag is not inside the login page. It can only be accessed after successfully
authenticating and exploring the employee dashboard.

After logging in as an administrator, the dashboard displays:

```text
Welcome, Administrator
```

It also shows a Security Audit Notice explaining that the vulnerability exists
because user input was concatenated directly into an SQL query.

## Congratulations

When you find the flag, you have successfully exploited an SQL Injection
vulnerability to bypass authentication.

Real-world impact of this vulnerability includes:

- Unauthorized account access.
- Privilege escalation.
- Exposure of sensitive employee information.
- Complete compromise of internal applications.

The next lab explores how attackers move beyond login bypass to extract
sensitive data from the database.

## Reset

```bash
./reset.sh
```

This drops and recreates all lab data.
