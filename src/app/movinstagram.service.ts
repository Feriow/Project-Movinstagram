import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const baseUrl = "http://localhost:3001";

export interface Post {
  id: string;
  user: string;
  title: string;
  picture: string;
}

export interface Comment {
  id: string;
  comment: string;
  user: string;
  postId: string;
}

export interface Like {
  id: string;
  user: string;
  postId: string;
}

const profilePics = [
  { user: "antman", picUrl: "../assets/img/antman.png" },
  { user: "aquaman", picUrl: "../assets/img/aquaman.png" },
  { user: "batman", picUrl: "../assets/img/batman.png" },
  { user: "blackWidow", picUrl: "../assets/img/blackWidow.png" },
  { user: "captainAmerica", picUrl: "../assets/img/captainAmerica.png" },
  { user: "captainMarvel", picUrl: "../assets/img/captainMarvel.png" },
  { user: "greenLantern", picUrl: "../assets/img/greenLantern.png" },
  { user: "ironMan", picUrl: "../assets/img/ironMan.png" },
  { user: "spiderMan", picUrl: "../assets/img/spiderMan.png" },
  { user: "superman", picUrl: "../assets/img/superman.png" },
  { user: "thor", picUrl: "../assets/img/thor.png" },
  { user: "wonderWoman", picUrl: "../assets/img/wonderWoman.png" },
];

@Injectable({
  providedIn: "root",
})
export class MovinstagramService {
  currentUser: string = "";
  constructor(private httpClient: HttpClient) {}

  getPosts() {
    return this.httpClient.get<Post[]>(`${baseUrl}/posts`);
  }

  getComments() {
    return this.httpClient.get<Comment[]>(`${baseUrl}/comments`);
  }

  getLikes() {
    return this.httpClient.get<Like[]>(`${baseUrl}/likes`);
  }

  getBestFriends() {
    return this.httpClient.get<String[]>(`${baseUrl}/bestFriends`);
  }

  getProfilePic(user: String) {
    let picUrl = "";
    picUrl = profilePics.find((element) => element.user == user).picUrl;
    return picUrl;
  }

  setCurrentUser(user: string) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getLikesUsernames = (likes: Like[]) => {
    let likeUsernames = [];

    for (let i = 0; i < likes.length; i++) {
      likeUsernames.push(likes[i].user);
    }
    likeUsernames.sort();
    console.log(likeUsernames);
  };

  // Criar métodos para pegar imagem perfil, vincular comentários, vincular likes?
  /* 1) Criar array de objetos com nome e caminho da imagem
2) Criar metodo no serviço que procura o nome de usuario no array e retorna o endereço da imagem */
}
