import { Note } from './types';

const welcomeNote: Note = {
  _id: '1',
  title: 'Welcome',
  content: `# NoteMarkdown

Discover the powerful features of NoteMarkdown, your ultimate markdown editor.

## Features Overview

* Follows [CommonMark](https://commonmark.org)
* Supports [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders React components seamlessly
* Provides customizable components
* Integrates multiple plugins for enhanced functionality

## Table of Contents

The following table of contents is generated automatically:

## Code Syntax Highlighting

NoteMarkdown supports syntax highlighting for various programming languages:

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
\`\`\`

\`\`\`javascript
function sum(a, b) {
    return a + b;
}

console.log(sum(5, 3));
\`\`\`

Isn't that neat?

## GitHub Flavored Markdown (GFM)

With GFM support, you can enjoy extended markdown features such as:

| Feature       | Support              |
| ------------- | -------------------- |
| CommonMark    | Complete             |
| GFM           | Complete with plugin |

Strikethrough:

~~This text is struck through~~

Task lists:

- [ ] Finish the NoteMarkdown project
- [x] Create an example note

Automatic URL linking:

https://notemarkdown.example.com

## Custom Component Integration

You can integrate custom components to enhance your markdown rendering experience:

\`\`\`tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Markdown from 'react-markdown';
import CustomHeader from './CustomHeader';

const markdownContent = \`
# Custom Components in NoteMarkdown

Here we use a custom header component.
\`;

ReactDOM.render(
  <Markdown components={{ h1: CustomHeader }}>{markdownContent}</Markdown>,
  document.getElementById('root')
);
\`\`\`

## More Information

Learn more about using NoteMarkdown and its features by visiting our [documentation](https://notemarkdown.example.com/docs).
***
Thank you for choosing NoteMarkdown!`
};

export default welcomeNote;