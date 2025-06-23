export default class Quote {
  text: string;
  author: string;

  constructor(text: string, author: string) {
    this.text = text;
    this.author = author;
  }

  static fromZenResponse(data: any): Quote {
    return new Quote(data.q, data.a);
  }
}
