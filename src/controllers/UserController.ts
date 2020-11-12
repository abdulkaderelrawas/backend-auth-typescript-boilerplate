import User from '../models/UserModel';
import { GenerateToken } from '../utils/GenerateToken';

export class UserController {
  //          d8888      8888888b.       888b     d888      8888888      888b    888
  //       d88888      888  "Y88b      8888b   d8888        888        8888b   888
  //      d88P888      888    888      88888b.d88888        888        88888b  888
  //     d88P 888      888    888      888Y88888P888        888        888Y88b 888
  //    d88P  888      888    888      888 Y888P 888        888        888 Y88b888
  //   d88P   888      888    888      888  Y8P  888        888        888  Y88888
  //  d8888888888      888  .d88P      888   "   888        888        888   Y8888
  // d88P     888      8888888P"       888       888      8888888      888    Y888

  /**
   * @description   GET all users
   * @route         GET /api/v1/users
   * @access        Protected, Admin
   */
  public async getUsers(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await User.find({}).select('-password');
        resolve(users);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @description   Delete a user
   * @route         DELETE /api/v1/users/:id
   * @access        Protect, Admin
   */
  public async deleteUser(user_id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById(user_id);
        if (user) {
          await user.remove();
          resolve({ message: 'User deleted successfully' });
        } else {
          reject({ message: 'User Not Found' });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @description   Get user profile
   * @route         GET /api/v1/users/profile
   * @access        Protect
   */
  public async getUserById(user_id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById(user_id).select('-password');
        if (user) {
          resolve(user);
        } else {
          reject({ message: 'User Not Found' });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @description   Update user
   * @route         PUT /api/v1/users/:id
   * @access        Protect, Admin
   */
  public async updateUser(req: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById(req.params.id);
        if (user) {
          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;
          user.isAdmin = req.body.isAdmin;

          const updatedUser = await user.save();

          resolve({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
          });
        } else {
          reject({ message: 'User Not Found' });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  //   8888888b.       8888888b.        .d88888b.       88888888888      8888888888       .d8888b.       88888888888
  // 888   Y88b      888   Y88b      d88P" "Y88b          888          888             d88P  Y88b          888
  // 888    888      888    888      888     888          888          888             888    888          888
  // 888   d88P      888   d88P      888     888          888          8888888         888                 888
  // 8888888P"       8888888P"       888     888          888          888             888                 888
  // 888             888 T88b        888     888          888          888             888    888          888
  // 888             888  T88b       Y88b. .d88P          888          888             Y88b  d88P          888
  // 888             888   T88b       "Y88888P"           888          8888888888       "Y8888P"           888

  /**
   * @description   Get user profile
   * @route         GET /api/v1/users/profile
   * @access        Protect
   */
  public async getUserProfile(user_id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById(user_id);
        if (user) {
          resolve({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          });
        } else {
          reject({ message: 'User Not Found' });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @description   Update user profile
   * @route         PUT /api/v1/users/profile
   * @access        Protect
   */
  public async updateUserProfile(req: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById(req.user._id);
        if (user) {
          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;
          if (req.body.password) {
            user.password = req.body.password;
          }

          const updatedUser = await user.save();
          const jwt = new GenerateToken(updatedUser._id);

          resolve({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: await jwt.generateToken(),
          });
        } else {
          reject({ message: 'User Not Found' });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  //   8888888b.       888     888      888888b.        888           8888888       .d8888b.
  // 888   Y88b      888     888      888  "88b       888             888        d88P  Y88b
  // 888    888      888     888      888  .88P       888             888        888    888
  // 888   d88P      888     888      8888888K.       888             888        888
  // 8888888P"       888     888      888  "Y88b      888             888        888
  // 888             888     888      888    888      888             888        888    888
  // 888             Y88b. .d88P      888   d88P      888             888        Y88b  d88P
  // 888              "Y88888P"       8888888P"       88888888      8888888       "Y8888P"

  /**
   * @description   Resgister a new user
   * @route         POST /api/v1/users
   * @access        Public
   */
  public async registerUser<
    T extends {
      name: string;
      email: string;
      password: string;
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
          const jwt = new GenerateToken(user._id);
          if (jwt) {
            resolve({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              token: await jwt.generateToken(),
            });
          }
        } else {
          return reject('Invalid user data.');
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @description   Login & get Token
   * @route         POST /api/v1/users
   * @access        Public
   */
  public async login<
    T extends {
      email: string;
      password: string;
    }
  >(data: T): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, password } = data;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
          const jwt = new GenerateToken(user._id);
          resolve({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: await jwt.generateToken(),
          });
        } else {
          reject('Invalid email or password.');
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
