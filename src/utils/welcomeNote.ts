import { Note } from './types';

const welcomeNote: Note = {
  _id: '1',
  title: 'Welcome',
  content: `Discover the features of NoteMarkdown, **your ultimate yet simple markdown editor**.

NoteMarkdown follows [CommonMark](https://commonmark.org/help/) conventions.

*Click the **pencil icon** on the top right corner to start editing this note.*
***
Automatically generates table of contents through naming any H2 or H3 (## or ###) "Table of Contents"

## Table of Contents

## Code Syntax Highlighting
NoteMarkdown supports syntax highlighting for various programming languages:

\`\`\`python
# Python example
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

print(factorial(5))
\`\`\`

\`\`\`javascript
// JavaScript example
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6));
\`\`\`

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

## Numbered Lists
1. One
Some text here
2. Two
Some more here
3. Three
And of course some here


## Text Formatting
**Bold**
*Italic*
*Combined*
~~Strike through~~
\`Inline code\`

## Automatic URL linking
https://notemarkdown.com
And with custom labels [NoteMarkdown](https://notemarkdown.com)

## Images
![Image](https://images.pexels.com/photos/1555900/pexels-photo-1555900.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)

## Quotes
> "Your imagination is the preview of life's coming attractions." - Albert Einstein

## Horizontal lines
***
You can use two for a cool divider
***

Made with ❤️ by [Lucas](https://x.com/LucasCodes)
`
};

export default welcomeNote;