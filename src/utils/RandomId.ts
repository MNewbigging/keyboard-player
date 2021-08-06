export class RandomId {
  private static characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  private static idLength = 5;
  public static createId() {
    let id = '';

    for (let i = 0; i < this.idLength; i++) {
      id += this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    }

    return id;
  }
}
