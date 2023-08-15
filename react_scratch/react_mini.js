// Virtual DOM Element
class VNode {
  constructor(tag, props, children) {
    this.tag = tag; // HTML tag name
    this.props = props || {}; // Attributes
    this.children = children || []; // Child nodes
  }

  render() {
    const el = document.createElement(this.tag);

    // Set attributes
    for (const [attr, value] of Object.entries(this.props)) {
      el.setAttribute(attr, value);
    }

    // Append child nodes
    for (const child of this.children) {
      if (child instanceof VNode) {
        el.appendChild(child.render());
      } else {
        el.appendChild(document.createTextNode(child));
      }
    }

    return el;
  }
}

// Minimal Virtual DOM framework
class MinimalVirtualDOM {
  constructor() {
    this.root = null; // Root of the Virtual DOM
    this.mounted = null; // Mounted Real DOM element
  }

  // Render the Virtual DOM
  render() {
    if (this.root) {
      this.mounted = this.root.render();
      document.body.innerHTML = ''; // Clear existing content
      document.body.appendChild(this.mounted);
    }
  }
}

// Create an instance of MinimalVirtualDOM
const app = new MinimalVirtualDOM();

// Define a component using the Virtual DOM
const component = new VNode('div', { class: 'container' }, [
  new VNode('h1', {}, ['Hello, Minimal Virtual DOM']),
  'This is a text node.',
  new VNode('p', {}, ['A simple example of a minimal Virtual DOM.']),
]);

// Set the root of the Virtual DOM to the component
app.root = component;

// Render the Virtual DOM to the Real DOM
app.render();

