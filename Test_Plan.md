# 🌾 Test Plan – Rolnopol Application

---

## 📋 Objective

Validate critical smoke scenarios and key business functionalities of the Rolnopol system based on available documentation and application pages.

---

## 🎯 Scope

### ✅ In Scope

- Basic application availability
- Authentication pages availability
- Register page loading and form visibility
- Login page loading and form visibility
- API documentation page loading
- System documentation page loading and content validation
- Future coverage for:
  - Authentication flows
  - Farm management
  - Marketplace
  - Financial operations
  - Permissions
  - API healthcheck

### ❌ Out of Scope

- UI styling and layout validation
- Pixel-perfect visual testing
- Very deep internal documentation content validation
- Performance testing
- Security penetration testing

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

---

### 1. 🌐 Basic Application Smoke Tests

- [x] Verify home page loads and page title contains `Rolnopol`  
       `@smoke @regression @ui`

---

### 2. 🔐 Authentication Pages

- [x] Verify `/register.html` loads successfully  
       `@smoke @auth @ui @critical`

- [x] Verify register page URL is correct  
       `@smoke @auth @ui @critical`

- [x] Verify register page title contains `Rolnopol`  
       `@smoke @auth @ui @critical`

- [x] Verify register form is visible  
       `@smoke @auth @ui @critical`

- [x] Verify register email input is visible  
       `@smoke @auth @ui @critical`

- [x] Verify register password input is visible  
       `@smoke @auth @ui @critical`

- [x] Verify `/login.html` loads successfully  
       `@smoke @auth @ui @critical`

- [x] Verify login page URL is correct  
       `@smoke @auth @ui @critical`

- [x] Verify login page title contains `Rolnopol`  
       `@smoke @auth @ui @critical`

- [x] Verify login form is visible  
       `@smoke @auth @ui @critical`

- [x] Verify login page shows text `User Login & Account Access`  
       `@smoke @auth @ui @critical`

- [x] Verify login email input is visible  
       `@smoke @auth @ui @critical`

- [x] Verify login password input is visible  
       `@smoke @auth @ui @critical`

---

### 3. 🔐 Authentication Flows

- [ ] Register new user with valid data  
       `@smoke @regression @auth @ui @critical`

- [ ] Login with valid credentials  
       `@smoke @regression @auth @ui @critical`

- [ ] Login with invalid credentials  
       `@regression @auth @ui @negative`

- [ ] Logout and session invalidation  
       `@smoke @regression @auth @ui`

---

### 4. 📚 Documentation / API Docs

- [x] Verify `/swagger.html` loads successfully  
       `@smoke @api @ui`

- [x] Verify Swagger page URL is correct  
       `@smoke @api @ui`

- [x] Verify Swagger iframe is visible  
       `@smoke @api @ui`

- [x] Verify Swagger iframe contains expected API documentation text  
       `@smoke @api @ui`

- [x] Verify `/docs.html` loads successfully  
       `@smoke @api @ui`

- [x] Verify docs page URL is correct  
       `@smoke @api @ui`

- [x] Verify docs page shows `Rolnopol System Guide & API Reference` text  
       `@smoke @api @ui`

---

### 5. 🚜 Farm Management

- [ ] Create, edit, delete field  
       `@regression @farm @ui`

- [ ] Create, edit, delete animal  
       `@regression @farm @ui`

- [ ] Create, edit, delete staff  
       `@regression @farm @ui`

- [ ] Assign staff or animal to field  
       `@smoke @regression @farm @ui @critical`

---

### 6. 🛒 Marketplace

- [ ] Create offer for unassigned asset and verify status `active`  
       `@smoke @regression @marketplace @ui`

- [ ] Create offer for assigned asset and verify status `unavailable`  
       `@regression @marketplace @negative`

- [ ] Buy offer with sufficient funds and verify success  
       `@smoke @regression @marketplace @finance @critical`

- [ ] Buy offer with insufficient funds and verify transaction is blocked  
       `@regression @marketplace @finance @negative`

- [ ] Cancel offer and verify status `cancelled`  
       `@regression @marketplace @ui`

---

### 7. 💰 Financial Operations

- [ ] Verify balance updates after purchase or sale  
       `@smoke @regression @finance @critical`

- [ ] Verify transaction history  
       `@regression @finance`

- [ ] Transfer funds between users  
       `@smoke @regression @finance @critical`

- [ ] Prevent overdraft  
       `@regression @finance @negative`

---

### 8. 🔒 Permissions

- [ ] User cannot access admin endpoints  
       `@smoke @regression @permissions @api @negative @critical`

- [ ] User can manage only own resources  
       `@smoke @regression @permissions @critical`

---

### 9. 💚 System Health

- [ ] Verify `/api/v1/healthcheck` returns `OK`  
       `@smoke @healthcheck @api`

- [ ] Verify API endpoints require authentication  
       `@smoke @regression @api @auth @permissions`

---

## 🌐 Environment

| Component | URL                     |
| --------- | ----------------------- |
| Local     | `http://localhost:3000` |
| Swagger   | `/swagger.html`         |
| Docs      | `/docs.html`            |
| Register  | `/register.html`        |
| Login     | `/login.html`           |

---

## 💡 Example Playwright Usage

### Run all tests

```bash
npx playwright test
```
