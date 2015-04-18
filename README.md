# Masking Tape
#### JavaScript input masking plugin

## Usage
The plugin exposes a function called **maskInput** that takes 2 arguments.
 * The ID of the input you are masking
 * An options object

```javascript
maskInput("phone", {
  template: "(~~~) ~~~ - ~~~~",
  input: "~",
});
```

## Options
```javascript
{
  template: "", // A textual representation of the input mask. Required
  input: "", // The character(s) that will receive input. Required
  space: " ", // The character that replaces the input character
  hardInput: "", // The character(s) that will receive input and also act as a hard mask for hiding part of the input. For example hiding the first 5 digits of a social security number.
  formatValue: false //A boolean value determining whether or not the actual input value will receive the formatting.
}
```

## Development
Masking Tape uses a gulp buildsystem that watches the source directory.

##### To get started
```
npm install
```

##### To build
```
gulp build
```
