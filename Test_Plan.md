# 🌾 Test Plan – Rolnopol Application

---

## 📋 Objective

Validate key business functionalities of the Rolnopol system based on provided documentation.

---

## 🎯 Scope

### ✅ In Scope

- Authentication (register, login, logout)
- Farm management (fields, animals, staff, assignments)
- Marketplace operations (create, buy, cancel offers)
- Financial operations (balance, transactions, transfers)
- Basic permissions (user access)
- Basic documentation page loading and content validation

### ❌ Out of Scope

- UI styling and layout
- Very deep internal documentation content validation

---

# 🏷️ Test Tags Convention

| Tag            | Purpose                        |
| -------------- | ------------------------------ |
| `@smoke`       | Critical happy-path validation |
| `@regression`  | Full regression coverage       |
| `@auth`        | Authentication-related tests   |
| `@farm`        | Farm management module         |
| `@marketplace` | Marketplace module             |
| `@finance`     | Financial operations           |
| `@permissions` | Authorization/access control   |
| `@api`         | API-level validation           |
| `@ui`          | UI/E2E interaction             |
| `@negative`    | Negative/error scenarios       |
| `@critical`    | High business impact           |
| `@healthcheck` | System health tests            |

---

## 🧪 Test Scenarios

### 1. 🔐 Authentication

- [ ] Register new user (valid data)  
       `@smoke @regression @auth @ui @critical`

- [ ] Login with valid credentials  
       `@smoke @regression @auth @ui @critical`

- [ ] Login with invalid credentials  
       `@regression @auth @ui @negative`

- [ ] Logout and session invalidation  
       `@smoke @regression @auth @ui`

---

### 2. 🚜 Farm Management

- [ ] Create, edit, delete field  
       `@regression @farm @ui`

- [ ] Create, edit, delete animal  
       `@regression @farm @ui`

- [ ] Create, edit, delete staff  
       `@regression @farm @ui`

- [ ] Assign staff/animal to field  
       `@smoke @regression @farm @ui @critical`

---

### 3. 🛒 Marketplace

- [ ] Create offer for unassigned asset → status `active`  
       `@smoke @regression @marketplace @ui`

- [ ] Create offer for assigned asset → status `unavailable`  
       `@regression @marketplace @negative`

- [ ] Buy offer with sufficient funds → `success`  
       `@smoke @regression @marketplace @finance @critical`

- [ ] Buy offer with insufficient funds → `blocked`  
       `@regression @marketplace @finance @negative`

- [ ] Cancel offer → status `cancelled`  
       `@regression @marketplace @ui`

---

### 4. 💰 Financial Operations

- [ ] Verify balance updates after purchase/sale  
       `@smoke @regression @finance @critical`

- [ ] Verify transaction history  
       `@regression @finance`

- [ ] Transfer funds between users  
       `@smoke @regression @finance @critical`

- [ ] Prevent overdraft  
       `@regression @finance @negative`

---

### 5. 🔒 Permissions

- [ ] User cannot access admin endpoints  
       `@smoke @regression @permissions @api @negative @critical`

- [ ] User can manage only own resources  
       `@smoke @regression @permissions @critical`

---

### 6. � Documentation / API Docs

- [ ] Verify `/swagger.html` loads and shows API documentation text  
       `@smoke @api @ui`

- [ ] Verify `/docs.html` loads and shows Rolnopol System Guide header  
       `@smoke @api @ui`

---

### 7. �💚 System Health

- [ ] Verify `/api/v1/healthcheck` returns `OK`  
       `@smoke @healthcheck @api`

- [ ] Verify API endpoints require authentication  
       `@smoke @regression @api @auth @permissions`

---

## 🌐 Environment

| Component   | URL                     |
| ----------- | ----------------------- |
| **Local**   | `http://localhost:3000` |
| **Swagger** | `/swagger.html`         |

---

## 💡 Example Playwright Usage

### Example test

```ts
test("Login with valid credentials @smoke @auth @critical", async ({
  page,
}) => {
  // test implementation
});
```
