declare global {}

interface IAPIResponse<DT> {
  message: string;
  data: DT;
  error: null;
  success: boolean;
}


interface IUser {
  id?: string;
  username?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
}

interface ILink {
  long_form : string
  short_form : string
  visited_times : number
}
