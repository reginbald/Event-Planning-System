export class mockRequest implements express.Request{
  get = (name: string) => {};

  header(name: string): string;

  headers: { [key: string]: string; };

  accepts(): string[];
  accepts(type: string): string | boolean;
  accepts(type: string[]): string | boolean;
  accepts(...type: string[]): string | boolean;

  acceptsCharsets(): string[];
  acceptsCharsets(charset: string): string | boolean;
  acceptsCharsets(charset: string[]): string | boolean;
  acceptsCharsets(...charset: string[]): string | boolean;

  acceptsEncodings(): string[];
  acceptsEncodings(encoding: string): string | boolean;
  acceptsEncodings(encoding: string[]): string | boolean;
  acceptsEncodings(...encoding: string[]): string | boolean;

  acceptsLanguages(): string[];
  acceptsLanguages(lang: string): string | boolean;
  acceptsLanguages(lang: string[]): string | boolean;
  acceptsLanguages(...lang: string[]): string | boolean;

  range(size: number): any[];

  accepted: MediaType[];

  param(name: string, defaultValue?: any): string;

  is(type: string): boolean;

  protocol: string;

  secure: boolean;

  ip: string;

  ips: string[];

  subdomains: string[];

  path: string;

  hostname: string;

  host: string;

  fresh: boolean;

  stale: boolean;

  xhr: boolean;

  body: any;

  cookies: any;

  method: string;

  params: any;

  clearCookie(name: string, options?: any): Response;

  query: any;

  route: any;

  signedCookies: any;

  originalUrl: string;

  url: string;

  baseUrl: string;

  app: Application;
}
