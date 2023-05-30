export class Token {
   public tokenType: string;
   public accessToken: string;

   constructor(source: any) {
      this.tokenType = source.toke_type;
      this.accessToken = source.access_token;
   }
}
