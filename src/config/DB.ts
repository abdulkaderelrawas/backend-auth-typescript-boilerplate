import mongoose, { Mongoose } from 'mongoose';

export default class DB {
  private static MONGO_URI: string;

  constructor(MONGO_URI: string) {
    DB.MONGO_URI = MONGO_URI;
  }

  //    .d8888b.   .d88888b.  888b    888 888b    888 8888888888 .d8888b. 88888888888      8888888b.  888888b.
  // d88P  Y88b d88P" "Y88b 8888b   888 8888b   888 888       d88P  Y88b    888          888  "Y88b 888  "88b
  // 888    888 888     888 88888b  888 88888b  888 888       888    888    888          888    888 888  .88P
  // 888        888     888 888Y88b 888 888Y88b 888 8888888   888           888          888    888 8888888K.
  // 888        888     888 888 Y88b888 888 Y88b888 888       888           888          888    888 888  "Y88b
  // 888    888 888     888 888  Y88888 888  Y88888 888       888    888    888          888    888 888    888
  // Y88b  d88P Y88b. .d88P 888   Y8888 888   Y8888 888       Y88b  d88P    888          888  .d88P 888   d88P
  //  "Y8888P"   "Y88888P"  888    Y888 888    Y888 8888888888 "Y8888P"     888          8888888P"  8888888P"

  public async connectDB() {
    try {
      const conn: Mongoose = await mongoose.connect(DB.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      });

      console.log(`Mongo DB connected successfuly to: ${conn.connection.host}`);
    } catch (error) {
      console.log(`Error from Mongo connectDB: ${error.message}`);
      process.exit(1);
    }
  }
}
