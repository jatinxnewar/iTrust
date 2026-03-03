/**
 * iTrust Development: Quick Start Guide
 * For developers joining the team or starting new features
 */

# Developer Quick Start Guide

## 🎯 You're New to the Project? Start Here!

Welcome to iTrust! This guide will get you productive in minutes.

### Time Investment
- **5 minutes**: Read this file
- **15 minutes**: Review ARCHITECTURE.md
- **30 minutes**: Study EXAMPLES.md
- **Ready to code**: 50 minutes total

---

## 📋 Essential Files to Read (In Order)

### 1. This File (10 min)
You're reading it! Gives you the big picture.

### 2. ARCHITECTURE.md (20 min)
Complete overview of architecture, available hooks, patterns, and best practices.

**Read these sections first:**
- Directory Structure
- Custom Hooks (the 7 main ones)
- Component Patterns

### 3. hooks/INDEX.js (10 min)
Reference guide for all available custom hooks with examples.

### 4. EXAMPLES.md (20 min)
Real code examples showing how to use the infrastructure.

**Study these examples:**
- Example 1: Login Form (shows useForm + validation)
- Example 2: Doctor List (shows useApi + usePagination)
- Example 4: Multiple Hooks Together (shows real usage)

### 5. MIGRATION_GUIDE.md (optional)
Only needed if you're refactoring existing components.

---

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests (when available)
npm test
```

---

## 🎨 The 5-Minute Architecture Overview

### Before (Old Way)
```jsx
function MyComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/doctors')
      .then(r => r.json())
      .then(data => setData(data))
      .catch(err => setError(err));
  }, []);

  // ... more code for validation, formatting, etc.
  return <div>Content</div>;
}
```

### After (New Way)
```jsx
import { useApi } from '../hooks/useApi';

function MyComponent() {
  const { data, error, loading } = useApi('/doctors');
  return <div>Content</div>;
}
```

**That's it!** ✨

---

## 🛠️ The 7 Hooks You'll Use Constantly

### 1. `useApi(url, options)` - Get Data
```jsx
const { data, error, isLoading, refetch } = useApi('/doctors', {
  autoFetch: true  // Fetch on mount
});
```
**When to use:** Any API call, data fetching

### 2. `useForm(initialValues, onSubmit)` - Forms
```jsx
const { values, errors, handleSubmit, getFieldProps } = useForm(
  { email: '', password: '' },
  onSubmit
);
```
**When to use:** Any form (login, signup, profile, etc.)

### 3. `useLocalStorage(key, defaultValue)` - Remember User Preferences
```jsx
const { value: theme, setValue: setTheme } = useLocalStorage('theme', 'light');
```
**When to use:** User preferences, saved data

### 4. `usePagination(items, perPage)` - Show Lists
```jsx
const { currentItems, nextPage, previousPage } = usePagination(doctors, 10);
```
**When to use:** Lists, tables, search results

### 5. `useModal()` - Dialogs & Popups
```jsx
const modal = useModal();
modal.open('ADD_DOCTOR');  // Open modal
modal.close();             // Close modal
```
**When to use:** Dialogs, confirmations, popups

### 6. `useTimeFilter()` - Time Periods
```jsx
const { timeFilter, setTimeFilter, getFilterLabel } = useTimeFilter();
// timeFilter = 'weekly' | 'monthly' | 'yearly'
```
**When to use:** Dashboards, analytics, reports

### 7. `useLocalStorage` + `useSessionStorage` - Storage
```jsx
const { value, setValue } = useSessionStorage('token', null);
```
**When to use:** Auth tokens, temporary data

---

## 🎨 Design System at Your Fingertips

Import colors, spacing, shadows from theme.js:

```jsx
import { COLORS, SPACING, SHADOWS } from '../constants/theme';

// In your styles
<div style={{
  backgroundColor: COLORS.primary,
  padding: SPACING[4],
  boxShadow: SHADOWS.lg
}}>
  Content
</div>
```

**Available:**
- `COLORS` - All app colors (primary, secondary, status, etc.)
- `SPACING` - Margin/padding scale (0-32rem)
- `SHADOWS` - Box shadows (sm to 2xl)
- `TRANSITIONS` - Animation transitions
- `BORDER_RADIUS` - Border radius values
- `Z_INDEX` - Layering (dropdown, modal, tooltip, etc.)

---

## ✅ Common Tasks

### Task 1: Display a List of Doctors
```jsx
import { useApi } from '../hooks/useApi';
import { usePagination } from '../hooks/usePagination';

function DoctorsList() {
  const { data: doctors } = useApi('/doctors');
  const { currentItems, nextPage } = usePagination(doctors, 10);

  return (
    <div>
      {currentItems?.map(doctor => (
        <div key={doctor.id}>{doctor.name}</div>
      ))}
      <button onClick={nextPage}>Next</button>
    </div>
  );
}
```

### Task 2: Create a Login Form
```jsx
import { useForm } from '../hooks/useForm';
import { required, email, password } from '../utils/validation';

function LoginForm() {
  const { handleSubmit, getFieldProps, errors } = useForm(
    { email: '', password: '' },
    async (values) => {
      await api.post('/login', values);
    }
  );

  return (
    <form onSubmit={(e) => handleSubmit(e, {
      email: required('Email'),
      password: password()
    })}>
      <input {...getFieldProps('email')} type="email" />
      {errors.email && <span>{errors.email}</span>}
      <input {...getFieldProps('password')} type="password" />
      {errors.password && <span>{errors.password}</span>}
      <button type="submit">Login</button>
    </form>
  );
}
```

### Task 3: Show User Preferences
```jsx
import { useLocalStorage } from '../hooks/useLocalStorage';
import { COLORS } from '../constants/theme';

function ThemePicker() {
  const { value: theme, setValue: setTheme } = useLocalStorage('theme', 'light');

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
```

### Task 4: Display Formatted Data
```jsx
import { formatNumber, formatDate, formatPhone } from '../utils/formatters';

function UserCard({ user }) {
  return (
    <div>
      <p>Phone: {formatPhone(user.phone)}</p>
      <p>Joined: {formatDate(user.joinDate)}</p>
      <p>Steps: {formatNumber(user.steps)}</p>
    </div>
  );
}
```

### Task 5: Handle Modal Dialog
```jsx
import { useModal } from '../hooks/useModal';

function Dashboard() {
  const modal = useModal();

  return (
    <>
      <button onClick={() => modal.open('ADD_METRIC')}>Add Metric</button>
      {modal.isOpen && (
        <AddMetricModal type={modal.modalType} onClose={modal.close} />
      )}
    </>
  );
}
```

---

## 🚀 Creating Your First Component

### Step 1: Check if You Need Which Hooks
```
□ Getting data?     → useApi
□ Building form?    → useForm
□ Having a list?    → usePagination
□ Showing modal?    → useModal
□ Picking period?   → useTimeFilter
□ Storing preference? → useLocalStorage
```

### Step 2: Combine Your Hooks
```jsx
import { useApi } from '../hooks/useApi';
import { usePagination } from '../hooks/usePagination';
import { formatNumber } from '../utils/formatters';
import { COLORS } from '../constants/theme';

function MyFeature() {
  // Get data
  const { data } = useApi('/endpoint');
  
  // Paginate if list
  const { currentItems } = usePagination(data, 10);
  
  // Format for display
  
  // Style with constants
  
  return (
    // Your JSX here
  );
}
```

### Step 3: Add PropTypes
```jsx
import PropTypes from 'prop-types';
import { DoctorShape } from '../types/propTypes';

MyComponent.propTypes = {
  doctor: DoctorShape.isRequired
};
```

### Step 4: Test in Browser

That's it! Your component is ready. 🎉

---

## 💡 Pro Tips

### Tip 1: Combine Multiple Hooks
Most features need 2-3 hooks working together:
```jsx
function ComplexFeature() {
  const { data } = useApi('/data');           // Get data
  const { currentItems } = usePagination(...) // Paginate
  const modal = useModal();                    // Handle modal
  const { values } = useForm(...);             // Manage form
}
```

### Tip 2: Use Constants Everywhere
Don't hardcode! Use constants:
```jsx
// ❌ Don't do this
const color = '#2563eb';
const endpoints = '/api/users/list';

// ✅ Do this instead
import { COLORS } from '../constants/theme';
import { API_ENDPOINTS } from '../constants/api';

const color = COLORS.primary;
const endpoint = API_ENDPOINTS.user.list;
```

### Tip 3: Compose Validators
Stack validation rules:
```jsx
import { compose, required, email, minLength } from '../utils/validation';

const validators = {
  email: compose(
    required('Email'),
    email(),
    minLength(5, 'Email')
  )
};
```

### Tip 4: Extract Sub-components
Big components? Break them down:
```jsx
// ❌ 300 lines in one component
function HugeDashboard() { ... }

// ✅ Break into focused pieces
function MetricCard({ metric }) { ... }
function FilterBar({ onFilter }) { ... }
function Dashboard() {
  return (
    <>
      <FilterBar />
      <MetricCard />
    </>
  );
}
```

### Tip 5: Check `hooks/INDEX.js`
Before writing code, check if a hook exists:
```jsx
import { HOOKS_INDEX } from '../hooks/INDEX';
// Scroll through and see what's available
```

---

## 🔧 Useful Resources

| Need | Location |
|------|----------|
| Architecture overview | ARCHITECTURE.md |
| Code examples | EXAMPLES.md |
| How to migrate code | MIGRATION_GUIDE.md |
| Hook reference | hooks/INDEX.js |
| PropTypes shapes | types/propTypes.js |
| Formatters | utils/formatters.js |
| Validators | utils/validation.js |
| Theme tokens | constants/theme.js |
| API endpoints | constants/api.js |
| Project summary | INFRASTRUCTURE_SUMMARY.js |

---

## 🎓 Learning Path

### Day 1: Foundation
- Read ARCHITECTURE.md (20 min)
- Study hooks/INDEX.js (15 min)
- Review EXAMPLES.md thoroughly (30 min)
- Create a simple component using useApi (30 min)

### Day 2: Advanced Usage
- Create a form with validation (45 min)
- Build a paginated list (30 min)
- Implement a modal dialog (30 min)
- Study existing refactored components (20 min)

### Day 3: Productivity
- Create features using hooks (daily)
- Reference MIGRATION_GUIDE.md when refactoring (as needed)
- Help others understand the patterns (20 min)

---

## ❓ Quick Answer Guide

**Q: Where do I put an API endpoint?**
A: In `constants/api.js` as part of `API_ENDPOINTS`

**Q: How do I fetch data?**
A: Use `useApi` hook from `hooks/useApi.js`

**Q: How do I validate a form?**
A: Use `useForm` + validators from `utils/validation.js`

**Q: Where do I find colors?**
A: In `COLORS` from `constants/theme.js`

**Q: How do I paginate a list?**
A: Use `usePagination` hook

**Q: How do I show a modal?**
A: Use `useModal` hook

**Q: How do I format numbers/dates?**
A: Use `formatters.js` utility functions

**Q: How do I add PropTypes?**
A: Import shapes from `types/propTypes.js`

**Q: What if the hook I need doesn't exist?**
A: Check `hooks/INDEX.js` first, then ask the team

**Q: How do I refactor an old component?**
A: Follow patterns in `MIGRATION_GUIDE.md`

---

## 🚨 Common Mistakes (Avoid These!)

### ❌ Mistake 1: Manual useState for API Calls
```jsx
// DON'T do this
const [data, setData] = useState(null);
useEffect(() => {
  fetch('/api/data').then(r => r.json()).then(setData);
}, []);

// DO this instead
const { data } = useApi('/api/data');
```

### ❌ Mistake 2: No Validation on Forms
```jsx
// DON'T do this
<form onSubmit={(e) => e.preventDefault()}>
  <input value={email} />
  <button>Submit</button>
</form>

// DO this instead
const { handleSubmit } = useForm(...);
const validators = { email: required('Email') };
<form onSubmit={(e) => handleSubmit(e, validators)}>
```

### ❌ Mistake 3: Hardcoded Colors/Spacing
```jsx
// DON'T do this
<div style={{ color: '#2563eb', padding: '16px' }}>

// DO this instead
import { COLORS, SPACING } from '../constants/theme';
<div style={{ color: COLORS.primary, padding: SPACING[4] }}>
```

### ❌ Mistake 4: No PropTypes
```jsx
// DON'T do this
function Component(props) { ... }

// DO this instead
import { DoctorShape } from '../types/propTypes';
Component.propTypes = { doctor: DoctorShape };
```

### ❌ Mistake 5: 300-Line Components
```jsx
// DON'T do this
function HugePage() {
  // 300 lines of JSX
}

// DO this instead
// Extract into sub-components
const Header = () => { ... };
const Content = () => { ... };
const Footer = () => { ... };
function HugePage() {
  return <>
    <Header />
    <Content />
    <Footer />
  </>;
}
```

---

## ✨ Next Steps

1. ✅ Read this guide (you're doing it!)
2. ✅ Open ARCHITECTURE.md
3. ✅ Review hooks/INDEX.js
4. ✅ Study EXAMPLES.md
5. ✅ Create your first component
6. ✅ Join the team Slack
7. ✅ Ask questions (no question is too small!)

---

## 📞 Need Help?

| What | Where |
|------|-------|
| Hook doesn't exist? | Check hooks/INDEX.js |
| Not sure about pattern? | Read EXAMPLES.md |
| Error in code? | Check TROUBLESHOOTING in INFRASTRUCTURE_SUMMARY.js |
| Want to refactor? | Follow MIGRATION_GUIDE.md |
| General questions? | Ask team in Slack |

---

## 🎉 You're Ready!

You now understand:
- ✅ The 7 main hooks
- ✅ Common component patterns
- ✅ Where to find resources
- ✅ How to avoid common mistakes
- ✅ How to create new features

**Start coding!** Use the hooks, follow the patterns, ask questions.

Happy coding! 🚀
