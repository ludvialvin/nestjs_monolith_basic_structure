export class LoginDto {
   email: string;
   password: string;
}

export class LogTokenDto {
   user_id: number;
   access_token: string;
   refresh_token: string;
}
