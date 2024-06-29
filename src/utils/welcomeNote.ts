import { Note } from './types';

const welcomeNote: Note = {
  _id: '1',
  title: 'Welcome',
  content: `Discover the features of NoteMarkdown, your ultimate yet simple markdown editor.

*Click the **pencil icon** on the top right corner to start editing this note.*
***
Automatically generates table of contents through naming any H2 or H3 (## or ###) "Table of Contents"

## Table of Contents

## Code Syntax Highlighting

NoteMarkdown supports syntax highlighting for various programming languages:

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
\`\`\`\

\`\`\`javascript
function sum(a, b) {
    return a + b;
}

console.log(sum(5, 3));
\`\`\`\

Isn't that neat?

## Tables

| Project       | Status     |
| ------------- | ---------  |
| NoteMarkdown  | Complete   |
| Next project  | Pending    |

(Markdown source for columns and rows do not need to align)

## Todo Lists
- [ ] Finish the NoteMarkdown project
- [x] Create an example note

## Text Formatting

**Bold text** and _italic text_ and even **_combined_**
~~This text is struck through~~

## Automatic URL linking
https://notemarkdown.com
And with custom labels [NoteMarkdown](https://notemarkdown.com)

***
Made with ❤️ by [Lucas](https://x.com/LucasCodes)
`
};

export default welcomeNote;