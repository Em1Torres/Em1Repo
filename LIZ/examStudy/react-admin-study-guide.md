# Study Guide: Frontend Development with React and React-Admin

Course: Integration of Computer Security in Networks and Software Systems
Based on the class presentations: React, React-Admin, I18nProvider, Accessibility, Components and Hooks.

How to use this guide: the exam is mostly theoretical, so each section starts with the concepts (what it is and why it exists). Short code examples follow only where they make an idea easier to remember. A glossary and practice questions are at the end.

---

## 1. React

**What it is.** A JavaScript library created by Meta (Facebook) for building dynamic and interactive applications.

**Main goal.** Build a better User Interface (UI) and User Experience (UX).

**Related technologies** (shown in the slides): JavaScript, Node.js, HTML and CSS. React is written in JavaScript, so everything in React is "JavaScript underneath", and the HTML/CSS ideas still apply to what ends up in the browser.

### Key features

| Feature | Definition | Why it matters |
|---|---|---|
| **JSX** | JavaScript Syntax Extension: a mix of HTML and JavaScript in the same file. | You describe the UI with HTML-like tags and can embed JavaScript inside `{ }`. |
| **Virtual DOM** | A lightweight copy of the page's Document Object Model (DOM) kept in memory. | React compares the virtual copy with the previous one and updates only the individual elements that changed, so it is faster than redrawing the whole page. |
| **Components** | Independent, reusable pieces of UI (see section 6). | You build big interfaces from small parts. |

**Extra detail on the DOM.** The DOM is the tree of the page: `document` → `<html>` → `<head>` and `<body>` → elements such as `<title>`, `<h1>`, `<a>` with their text and attributes. Changing the real DOM is slow-ish, which is why React first works on its virtual version.

**Note on the slide about components.** One slide says components are "used to compile and optimize the JavaScript code". The more accurate and exam-safe definition is the one from the Components slides: *independent and reusable code that returns HTML (JSX markup)*. If your teacher's wording appears in the exam, use theirs, but understand the second one.

### JSX example (from the slides)

```jsx
const updatedList = list.map((listItems) => {
  return <li>{listItems}</li>;
});
```

`map` goes through each item of `list` and returns one `<li>` element per item. The `{ }` is how JavaScript values are placed inside the markup.

---

## 2. React-Admin

**What it is.** An open-source framework for building B2B (business-to-business) applications, created by **Marmelab**. It is built on top of React and is used to create dynamic, interactive admin-style applications: lists of records, forms, dashboards, and so on.

**Why use it.** Instead of writing every table, form and route yourself, you declare *what* data you have (resources) and React-Admin provides ready-made screens and behavior (sorting, pagination, forms, navigation).

**Installation (from the class).** Follow the instructions on the official page (marmelab.com/react-admin). If the `yarn` command is not available, open another terminal and run:

```bash
npm install -g yarn
```

### 2.1 TypeScript vs JavaScript

React-Admin projects commonly use TypeScript (TS).

- TypeScript has the **same syntax as JavaScript**, plus types.
- It **points out compilation errors** before the program runs.
- It gives **improved readability**, because the types document what each function expects.

```ts
// JavaScript: all of these run, even the weird ones
const add = (x, y) => x + y;
add('1', '1');        // '11'  (string concatenation)
add(null, undefined); // NaN

// TypeScript: the editor/compiler flags the wrong calls
const add = (x: number, y: number): number => x + y;
add('1', '1');        // error
add(1, 1);            // OK
```

Same idea with variables: `let str: string; str = 3;` is an error in TypeScript because `str` was declared as a string. In plain JavaScript the same assignment is allowed.

### 2.2 Basic structure of an app

```
<Admin>                      (root component)
   └── <Resource> ...        (one per entity: posts, users, albums)
   └── <CustomRoutes> ...    (extra pages that are not CRUD)
```

---

## 3. The `<Admin>` component

- It is the **root component** of React-Admin.
- Its **children** are `<Resource>` and `<CustomRoutes>`.
- It receives **props** (settings) that configure the whole app.

### Basic example

```tsx
import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { PostList, PostEdit, PostCreate } from './posts';

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
  </Admin>
);
```

Read it as: "An admin app that gets its data from `dataProvider`, with one resource called `posts` that has a list screen, an edit screen and a create screen."

### 3.1 dataProvider (the most important prop)

- It is the **communication layer with the API**: it fetches or saves the data.
- React-Admin does not talk to the API directly. Components ask the dataProvider, and the dataProvider talks to the backend. This is why you can switch backends without rewriting your screens.
- There are **more than 50 existing data providers** (AWS, Django, Google Sheets, etc.).

A data provider is an object with methods that each return a **Promise** (an asynchronous result):

| Method | Purpose |
|---|---|
| `getList` | Get a page of records (with sorting, filtering, pagination) |
| `getOne` | Get one record by id |
| `getMany` | Get several records by their ids |
| `getManyReference` | Get records related to another record |
| `create` | Create a record |
| `update` | Update one record |
| `updateMany` | Update several records |
| `delete` | Delete one record |
| `deleteMany` | Delete several records |

Example using a ready-made provider (a fake REST API using json-server):

```tsx
import jsonServerProvider from "ra-data-json-server";

export const dataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL
);
```

The URL comes from an environment variable (`VITE_JSON_SERVER_URL`), a good practice because the address is kept out of the code and can change between environments.

### 3.2 Other `<Admin>` properties

| Prop | What it does |
|---|---|
| `authProvider` | Authentication and permissions |
| `dashboard` | Content of the dashboard (home) page |
| `darkTheme` | Sets the dark theme |
| `i18nProvider` | Translations (internationalization) |
| `loginPage` | Content of the login page (lets you change the authentication strategy) |
| `notification` | Replaces the notification component |

> Security link to your course: `authProvider` is where login and permission checks live, so it is the part of React-Admin most related to computer security. Remember that hiding a screen in the frontend is not real protection; the API must also enforce permissions.

---

## 4. The `<Resource>` component

- Defines the **CRUD** routes of an entity: **C**reate, **R**ead, **U**pdate, **D**elete.
- Its "methods" (props that receive a component) are: **List, Create, Edit, Show**.

| Prop | Screen it provides | CRUD operation |
|---|---|---|
| `list` | Table of records | Read (many) |
| `show` | Read-only detail page | Read (one) |
| `create` | Form for a new record | Create |
| `edit` | Form for an existing record | Update (and delete) |

Each `<Resource>` has a `name` that matches the API endpoint (for example `posts` → `/posts`).

### 4.1 `<List>`

- A component that **fetches a list of records from the data provider**.
- A basic list already includes **sorting and pagination**.
- Inside it, a `<Datagrid>` shows the records as a table, and each column is a **Field**.

```tsx
export const PostList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="userId" reference="users" />
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
);
```

- `source` = the name of the property in the record (the column in the data).
- `TextField` = shows plain text.
- `ReferenceField` = the value is an id that points to another resource (here, `userId` points to `users`), so React-Admin looks up and displays the related record.
- `EditButton` = a button that opens the edit screen.

### 4.2 `<Edit>`

- A component that **fetches a record based on the URL**, **prepares a form submit handler**, and **renders the page title and actions**.

```tsx
export const PostEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="userId" reference="users" />
      <TextInput source="id" disabled />
      <TextInput source="title" />
      <TextInput source="body" multiline rows={5} />
    </SimpleForm>
  </Edit>
);
```

- `SimpleForm` = a basic form layout.
- **Inputs** (`TextInput`, `ReferenceInput`) are the editable counterparts of Fields.
- `disabled` makes the id visible but not editable.
- `multiline rows={5}` makes a larger text area.

### 4.3 `<Create>`

- A component that **prepares a form submit handler and renders the page title and actions**.
- Compared with `<Edit>`: it does **not fetch an existing record** (there is none yet), so the form starts empty.

```tsx
export const PostCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="userId" reference="users" />
      <TextInput source="title" />
      <TextInput source="body" multiline rows={5} />
    </SimpleForm>
  </Create>
);
```

### 4.4 Field vs Input (easy to confuse)

| | Field | Input |
|---|---|---|
| Purpose | **Display** data | **Edit** data |
| Used in | `List`, `Show` | `Create`, `Edit` (inside a form) |
| Examples | `TextField`, `ReferenceField`, `EmailField` | `TextInput`, `ReferenceInput` |

---

## 5. Internationalization with I18nProvider

**Problem.** React-Admin's interface is in English by default. A language package can translate it, for example:

```bash
npm install --save @react-admin/ra-language-spanish
```

(The slide shows the package name split across lines; check the exact name on the React-Admin translation docs before installing.)

But the package **does not translate all actions and buttons**.

**Solution.** Create your own `I18nProvider`:

1. **Write the messages** in a `spanishMessages` object, translating the keys you need (the keys are grouped, for example `ra.action.*`).
2. **Create the i18nProvider** by importing the messages and the **Polyglot.js** library (through `ra-i18n-polyglot`).
3. **Pass it to `<Admin>`** with the `i18nProvider` prop.

Step 1, the messages (excerpt):

```ts
export const spanishMessages = {
  ra: {
    action: {
      add_filter: 'Agregar filtro',
      add: 'Agregar',
      back: 'Regresar',
      cancel: 'Cancelar',
      create: 'Crear',
      delete: 'Eliminar',
      edit: 'Editar',
      export: 'Exportar',
      list: 'Lista',
      refresh: 'Actualizar',
      // ...rest of the messages
    },
  },
};
```

Step 2, the provider:

```ts
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { spanishMessages } from './spanishMessages';

export const i18nProvider = polyglotI18nProvider(
  locale => spanishMessages,
  'es' // default locale
);
```

Note the messages like `'Un objeto seleccionado |||| %{smart_count} objetos seleccionados'`: the `||||` separates singular and plural forms and `%{smart_count}` is replaced with the number (Polyglot handles plurals).

### Remember: use `label`

`i18nProvider` translates the framework's own texts. For **your own** resource and field names, use the `label` prop:

```tsx
<Resource name="users" list={UserList} options={{ label: 'Usuarios' }} />

<TextField source="userId" label="Usuario" />
<TextInput source="q" label="Buscar" alwaysOn />
```

- On a `<Resource>`, the label goes inside `options={{ label: '...' }}` (it changes the name in the menu).
- On Fields and Inputs, `label="..."` changes the column or form-field name.

---

## 6. Components (React concepts)

- **Components** are independent, reusable code that returns HTML (JSX markup).
- Rules and features:
  - Their **names must start with a capital letter** (`PostList`, not `postList`), so React can tell them apart from normal HTML tags.
  - Components **can render other components** (that is how `<Admin>` contains `<Resource>`, which uses `<List>`, which contains `<Datagrid>`, and so on).
  - **Types: Class and Functional.**

**Class component** (older style): a JavaScript class that extends `React.Component`, keeps its data in `this.state`, and has a `render()` method.

**Functional component** (modern style): a plain function that returns JSX and uses **hooks** for state. It is shorter and is the style used in React-Admin.

The same counter written both ways (from the slides):

```jsx
// Class
class Acumulador extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        <h1>El botón ha sido pulsado { count } veces</h1>
        <button onClick={() => this.setState({ count: count + 1 })}>Púlsame</button>
      </div>
    );
  }
}

// Functional with a hook
function Acumulador(props) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>El botón ha sido pulsado { count } veces</h1>
      <button onClick={() => setCount(count => count + 1)}>Púlsame</button>
    </div>
  );
}
```

---

## 7. Hooks

**Definition.** A function that lets you **create and/or access React state and lifecycle features in (functional) components**. Before hooks, you needed a class to have state. Now a simple function can do it.

### Basic React hooks

| Hook | Explanation |
|---|---|
| `useState` | The value you pass is the **initial state**. It stays until a new value is assigned using the "set" function. Returns `[value, setValue]`. |
| `useEffect` | Performs **side effects** in function components after every render: data fetching, subscriptions, or changing the DOM. |

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

Calling `setCount` changes the state, React re-renders, and then `useEffect` updates the page title (a side effect outside the component's own output).

### React-Admin hooks seen in class

| Hook | What it does |
|---|---|
| `useMediaQuery` | Analyzes the **current screen size**, useful for responsive design. |
| `warnWhenUnsavedChanges` | Asks the user to **confirm before leaving a page with unsaved changes**. Used as a prop on the form. |
| `useNotify` | Displays a **notification at the bottom of the page** (error, warning, info; can be undoable). |
| `useRefresh` | Refreshes the current data/view. |
| `useRedirect` | Sends the user to another page. |

**Responsive list with `useMediaQuery`:** on small screens show a compact `SimpleList`, on large screens show the full `Datagrid`.

```tsx
export const UserList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
          <EmailField source="email" />
          {/* ...more fields */}
        </Datagrid>
      )}
    </List>
  );
};
```

**Notifications:**

```ts
notify('This is an error', { type: 'error' });
notify('This is a warning', { type: 'warning' });
notify('Element updated', { type: 'info', undoable: true });
```

**Several hooks together** (notify, refresh and redirect after a successful save):

```tsx
export const PostEdit = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify('Changes saved', { undoable: true });
    redirect('/posts');
    refresh();
  };

  return (
    <Edit mutationOptions={{ onSuccess }}>
      <SimpleForm warnWhenUnsavedChanges>
        <TextInput source="title" />
        <TextInput source="body" multiline rows={5} />
      </SimpleForm>
    </Edit>
  );
};
```

**Rules to remember about hooks:** they start with `use`, and are called at the top level of a function component (not inside loops or conditions).

### Class activity (hooks report)

The assignment asks you to analyze **five hooks** you could use in your project (list: marmelab.com/react-admin/Reference.html#hooks), **excluding** the ones above. For each one: write a code example, explain its functionality, and show the interface changes in a report. Ideas to explore: `useGetList`, `useGetOne`, `useUpdate`, `useDelete`, `useRecordContext`, `useTranslate`, `useListContext`, `useAuthenticated`. Check each one in the official reference before you choose.

---

## 8. Accessibility

**Definition.** Design of products or services that **can be used by everyone**.

**Main goal.** Aid people with disabilities, **but** it should accommodate **all potential users in many contexts of use** (for example someone using a phone in bright sunlight, or with a slow connection).

### Web accessibility

- **Main goal:** make websites and content more usable.
- People can **perceive, understand, navigate, contribute and interact** with the Web.

### Why it is important

- It supports **social inclusion** of people with disabilities, older people, and people in rural areas.
- It improves **user experience (UX)** and satisfaction for everyone.

### Disabilities and how design helps

| Type | Examples from the class | Design support |
|---|---|---|
| **Color blindness** | Tritanopia (blue-yellow confusion) and protanopia (red confusion) | Do not rely on color alone; check contrast and test with simulators. |
| **Visual impairment** | Adjustable font size, keyboard shortcuts | Allow text zoom; make everything usable with the keyboard; screen readers need good structure and `alt` text. |
| **Auditory impairment** | Closed captions, sign language | Captions and sign-language interpretation for audio and video. |
| **Physical disability** | Appropriate labels for voice control, keyboard shortcuts | Clear labels so voice commands can name a control; full keyboard operation. |

### Web Accessibility Initiative (WAI)

- An initiative of the **World Wide Web Consortium (W3C)**.
- It **creates standards and support materials** to understand and implement accessibility.
- Slogan: *"Accessibility: Essential for some, useful for all."*

### The four principles (POUR)

| Principle | Meaning | Examples |
|---|---|---|
| **Perceivable** | Information can be presented in ways users can sense. | Captions, alt text, enough contrast |
| **Operable** | Users can operate the interface. | Keyboard navigation, shortcuts, enough time to act |
| **Understandable** | Content and behavior are clear and predictable. | Plain language, consistent layouts, helpful errors |
| **Robust** | Content works with many browsers and assistive technologies. | Valid, well-structured HTML so screen readers can interpret it |

### Accessibility tools

- **Coblis** Color Blindness Simulator
- **Google Lighthouse** (audits accessibility, among other things)
- **Toptal** color filter (color-blindness simulation)

### Practical tips (from the slides)

- Describe images (`<alt>`).
- Use simple colors.
- Build for keyboard-only use.
- Write in plain language.
- Build simple and consistent layouts.
- Make buttons descriptive ("Attach files", not "Click here").
- Give users enough time to complete an action.
- Structure content using HTML5 elements (`<h1>`, `<nav>`, `<label>`).
- Use simple sentences and bullets.
- Write descriptive links and headings ("Contact us").

### Class activity (accessibility report)

Analyze the accessibility of **three websites** against Perceivable, Operable, Understandable and Robust, and prepare a **5-10 minute presentation** with findings and conclusions (how each site can improve, which one is most accessible, etc.). The slides suggest categories: public universities (UNAM, IPN, UV), private universities (ITESM, Ibero, UDLAP), government (SRE, SEP, SEGOB), bookstores (Gandhi, El Péndulo, Porrúa), banks (BBVA, Banorte, Banamex), streaming (Netflix, Amazon Prime, Disney+), and social media (X, Instagram, TikTok).

References from the slides: Interaction Design Foundation (Accessibility), W3C WAI, Harvard HUIT Digital Accessibility, Pixelplex (accessibility tips).

---

## 9. Quick glossary

| Term | Meaning |
|---|---|
| **React** | JavaScript library from Meta for building UIs |
| **JSX** | HTML-like syntax inside JavaScript |
| **DOM** | Tree representation of a web page |
| **Virtual DOM** | In-memory copy of the DOM; React updates only what changed |
| **Component** | Reusable piece of UI that returns JSX; name starts with a capital letter |
| **Hook** | Function (starts with `use`) that gives components state or lifecycle features |
| **React-Admin** | Open-source framework by Marmelab for B2B admin apps, built on React |
| **`<Admin>`** | Root component; takes `dataProvider`, `authProvider`, `i18nProvider`, etc. |
| **`<Resource>`** | Defines the CRUD routes (list, create, edit, show) for one entity |
| **dataProvider** | Layer that talks to the API; returns Promises |
| **authProvider** | Handles authentication and permissions |
| **i18nProvider** | Handles translations |
| **Datagrid** | Table used inside `<List>` |
| **Field / Input** | Display data / edit data |
| **CRUD** | Create, Read, Update, Delete |
| **TypeScript** | JavaScript with types; catches errors at compile time |
| **WAI / W3C** | Web Accessibility Initiative / World Wide Web Consortium |
| **POUR** | Perceivable, Operable, Understandable, Robust |

---

## 10. Practice questions (answers below)

1. Who created React, and what is its main goal?
2. What is the advantage of the Virtual DOM?
3. What does JSX stand for, and what does it combine?
4. Who created React-Admin, and what kind of applications is it for?
5. What is the root component of React-Admin, and what are its children?
6. What does the dataProvider do? Name four of its methods.
7. Which `<Admin>` prop would you use for login and permissions? For translations? For the home page?
8. What does `<Resource>` define? Which props provide the screens?
9. What does a basic `<List>` include out of the box?
10. What is the difference between `<Edit>` and `<Create>`?
11. Difference between a Field and an Input?
12. Why create your own I18nProvider instead of only installing the Spanish package?
13. Which library does the i18nProvider use for translations?
14. How do you rename a resource or a field label in the interface?
15. Name two rules for React components and the two types.
16. What is a hook? Explain `useState` and `useEffect`.
17. What do `useMediaQuery`, `warnWhenUnsavedChanges` and `useNotify` do?
18. What is web accessibility, and why does it matter?
19. What are the four WAI principles?
20. Name three accessibility tools and three practical tips.

### Answers

1. Meta (Facebook). Goal: build a better UI/UX for dynamic, interactive applications.
2. It updates only the individual elements that changed, so updates are faster.
3. JavaScript Syntax Extension; combines HTML and JavaScript.
4. Marmelab; open-source framework for B2B apps.
5. `<Admin>`; its children are `<Resource>` and `<CustomRoutes>`.
6. It communicates with the API to fetch or save data. Methods: `getList`, `getOne`, `getMany`, `getManyReference`, `create`, `update`, `updateMany`, `delete`, `deleteMany`.
7. `authProvider`; `i18nProvider`; `dashboard`.
8. The CRUD routes of an entity. Props: `list`, `create`, `edit`, `show`.
9. Fetching the records from the data provider, plus sorting and pagination.
10. `<Edit>` fetches an existing record from the URL and prepares the submit handler; `<Create>` has no existing record and starts with an empty form. Both render the title and actions.
11. Fields display data (List/Show); Inputs edit data (Create/Edit forms).
12. The package does not translate all actions and buttons, so you complete the missing messages yourself.
13. Polyglot.js (through `ra-i18n-polyglot`).
14. With the `label` prop (`options={{ label: '...' }}` on a Resource).
15. Names start with a capital letter; components can render other components. Types: Class and Functional.
16. A function that lets components create/access state and lifecycle features. `useState` holds a value (initial state, changed with the set function); `useEffect` runs side effects after renders (data fetching, subscriptions, DOM changes).
17. Analyzes the current screen size; asks for confirmation before leaving with unsaved changes; shows a notification at the bottom of the page.
18. Designing sites that everyone can perceive, understand, navigate and interact with. It supports social inclusion and improves UX.
19. Perceivable, Operable, Understandable, Robust.
20. Tools: Coblis, Google Lighthouse, Toptal color filter. Tips: alt text, keyboard-only support, descriptive buttons/links (others in section 8).
