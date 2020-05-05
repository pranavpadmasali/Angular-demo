export interface User {
    username: string;
    password: Password;
  }

  export interface Password {
    type: string;
    data: string;
    faceData: string;
  }