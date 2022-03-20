import Axios from "axios";
import FormData from "form-data";

interface TokenData {
  token_type: string;
  access_token: string;
  expires: number;
}

const tokenEndpoint = "https://www.fflogs.com/oauth/token";
const authEnpoint = "";
const clientId = "";
const clientSecret = "";

export class TokenService {
  access_token: string = "";
  expires: number = 0;
  fetched_at: number = 0;

  private readonly client_id: string = "958b898b-0aca-475c-a7b9-c89fca4cd76a";
  private readonly client_secret: string =
    "eAmW7RW8iOcxAP0vdeLSmYnPpWYtSh7uFnSPM9V6";
  private readonly tokenEndpoint = "https://www.fflogs.com/oauth/token";

  // TODO: take in client_id / secret as constructor params

  async getToken(): Promise<string> {
    if (this.access_token != "" && !this.isTokenExpired()) {
      return this.access_token;
    }

    const tokenData = await this.fetchToken();

    this.fetched_at = Date.now();
    this.expires = tokenData.expires;
    this.access_token = tokenData.access_token;

    return this.access_token;
  }

  private async fetchToken(): Promise<TokenData> {
    const formData = new FormData();
    formData.append("grant_type", "client_credentials");

    let res = await Axios.post(tokenEndpoint, formData, {
      auth: { username: this.client_id, password: this.client_secret },
      headers: formData.getHeaders(),
    });
    if (!res.data) throw new Error("Issue fetching token");

    return res.data;
  }
  private isTokenExpired(): boolean {
    return Date.now() - this.fetched_at > this.expires;
  }
}

const tokenService = new TokenService();

export default tokenService;
