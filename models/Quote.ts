// models/Quote.ts
export default class Quote {
  id: string;
  text: string;
  author: string;

  constructor(id: string, text: string, author: string) {
    this.id = id;
    this.text = text;
    this.author = author;
  }

  static fromZenResponse(data: any): Quote {
    return new Quote(
      Date.now().toString(),
      data.q || 'No quote available',
      data.a || 'Unknown'
    );
  }
}
