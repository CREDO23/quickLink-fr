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
  link : {
    id : string
    long_form : string
    maker : string
    visit_times : number
  }
  shortUrl : string
} 
