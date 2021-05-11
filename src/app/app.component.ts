import { Component, OnInit } from "@angular/core";
import {
  Like,
  MovinstagramService,
  Post,
  Comment,
} from "./movinstagram.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "movinstagram";
  posts: Post[] = [];
  comments: Comment[] = [];
  likes: Like[] = [];
  users: String[] = [];
  mainUser = "batman";

  constructor(private movServ: MovinstagramService) {}

  ngOnInit(): void {
    this.getAllData();
  }

  changeUser(user: string) {
    this.mainUser = user;
  }

  getAllData() {
    this.getPosts();
    this.getComments();
    this.getLikes();
    this.getBestFriends();
  }

  getProfilePic(user) {
    return this.movServ.getProfilePic(user);
  }

  getPosts() {
    this.movServ.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  getComments() {
    this.movServ.getComments().subscribe((comments) => {
      this.comments = comments;
    });
  }

  getLikes() {
    this.movServ.getLikes().subscribe((likes) => {
      this.likes = likes;
    });
  }

  getBestFriends() {
    this.movServ.getBestFriends().subscribe((friends) => {
      this.users = friends;
      this.users.push("superman");
      this.users = this.users.sort();
    });
  }

  getPostLikes(postId) {
    let likes: Like[] = [];
    likes = this.likes.filter((element) => element.postId == postId);
    return likes;
  }

  getPostComments(postId) {
    let comments: Comment[] = [];
    comments = this.comments.filter((element) => element.postId == postId);
    return comments;
  }
}
