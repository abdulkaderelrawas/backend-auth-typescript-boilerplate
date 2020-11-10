import User from '../models/UserModel';

export class UserController {
  /**
   * @description   GET all users
   * @route         GET /api/v1/users
   * @access        Protected, Admin
   */
  public async getUsers(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await User.find({});
        resolve(users);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @description   Resgister a new user
   * @route         POST /api/v1/users
   * @access        Public
   */
  public async registerUser<
    T extends {
      name: String;
      email: String;
      password: String;
    }
  >(data: T): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, email, password } = data;

        const userExists = await User.findOne({ email });

        if (userExists) {
          return reject('User already exists.');
        }

        const user = await User.create({
          name,
          email,
          password,
        });

        if (user) {
          resolve({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: 'xxxx',
          });
        } else {
          return reject('Invalid user data.');
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
