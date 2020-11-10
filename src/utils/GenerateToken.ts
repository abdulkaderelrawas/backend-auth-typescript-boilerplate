import jwt from 'jsonwebtoken';

export class GenerateToken {
  private userID: string;

  constructor(userID: string) {
    this.userID = userID;
  }

  public async generateToken(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const userID = this.userID;
        const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });

        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  }
}
