/**
 * Fluent text composition builder and WhatsApp markdown formatting helpers.
 *
 * Implements WhatsApp-native markdown formatting (bold, italic, strikethrough, monospace, blockquote)
 * with a chainable builder API modeled after the Go implementation in whatsrook.
 */

/** Formats text as WhatsApp bold: `*text*` */
export function Bold(text: string | number): string {
  return `*${text}*`;
}

/** Formats text as WhatsApp italic: `_text_` */
export function Italic(text: string | number): string {
  return `_${text}_`;
}

/** Formats text as WhatsApp inline monospace: `` `text` `` */
export function Code(text: string | number): string {
  return `\`${text}\``;
}

/** Formats text as WhatsApp monospace code block: ```` ```text``` ```` */
export function CodeBlock(text: string, lang = ""): string {
  return `\`\`\`${lang ? `${lang}\n` : ""}${text}\`\`\``;
}

/** Formats text as WhatsApp strikethrough: `~text~` */
export function Strike(text: string | number): string {
  return `~${text}~`;
}

/** Formats text as WhatsApp quote: `> text` */
export function Quote(text: string): string {
  return text
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");
}

/** Formats text with bullet point: `• text` */
export function Bullet(text: string): string {
  return `• ${text}`;
}

/** Inserts a visual separator line */
export function Divider(): string {
  return "──────────────────────────";
}

/**
 * Fluent TextBuilder for composing structured, readable WhatsApp messages.
 */
export class TextBuilder {
  private parts: string[] = [];

  constructor(initial?: string) {
    if (initial) {
      this.parts.push(initial);
    }
  }

  public text(str: string): this {
    this.parts.push(str);
    return this;
  }

  public bold(str: string | number): this {
    this.parts.push(Bold(str));
    return this;
  }

  public italic(str: string | number): this {
    this.parts.push(Italic(str));
    return this;
  }

  public code(str: string | number): this {
    this.parts.push(Code(str));
    return this;
  }

  public codeBlock(str: string, lang = ""): this {
    this.parts.push(CodeBlock(str, lang));
    return this;
  }

  public strike(str: string | number): this {
    this.parts.push(Strike(str));
    return this;
  }

  public quote(str: string): this {
    this.parts.push(Quote(str));
    return this;
  }

  public bullet(str: string): this {
    this.parts.push(Bullet(str));
    return this;
  }

  public divider(): this {
    this.parts.push(Divider());
    return this;
  }

  public line(str = ""): this {
    this.parts.push(str ? `${str}\n` : "\n");
    return this;
  }

  public space(): this {
    this.parts.push(" ");
    return this;
  }

  public build(): string {
    return this.parts.join("");
  }

  public toString(): string {
    return this.build();
  }
}

/**
 * Constructs a new fluent TextBuilder.
 */
export function NewText(initial?: string): TextBuilder {
  return new TextBuilder(initial);
}
