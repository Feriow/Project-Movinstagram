import { Component, Input, OnInit } from "@angular/core";
import { Like, Comment, MovinstagramService } from "../movinstagram.service";

@Component({
  selector: "app-post",
  templateUrl: "../post/post.component.html",
  styleUrls: ["../post/post.component.css"],
})
export class PostComponent implements OnInit {
  @Input() likes: Like[] = [];
  @Input() comments: Comment[];
  @Input() title: string;
  @Input() user: string;
  @Input() picture: string;
  @Input() currentUser: string;
  @Input() postId: string;
  isLiked: boolean;
  postLikes = [];
  likesExb: String;

  constructor(private movServ: MovinstagramService) {}

  ngOnInit(): void {
    this.getLikesTitle();
  }

  getLikesTitle = () => {
    if (this.postLikes.length == 0) {
      this.postLikes = this.likes;
    }
    if (this.likesExb) {
      this.likesExb = "";
    }
    let likesUsers = [];
    for (let like of this.postLikes) {
      likesUsers.push(like.user);
    }
    likesUsers.sort();
    this.likesExb = likesUsers.join("\n");
    this.getIsLiked();
    return this.likesExb;
  };

  getIsLiked() {
    if (this.postLikes.length > 0) {
      this.isLiked = this.postLikes.find(
        (like) => like.user === this.currentUser
      )
        ? true
        : false;
    } else {
      this.isLiked = this.likes.find((like) => like.user === this.currentUser)
        ? true
        : false;
    }

    return this.isLiked ? "favorite" : "favorite_border";
  }

  clickLike = () => {
    if (this.isLiked) {
      let pos = this.postLikes
        .map(function (e) {
          return e.user;
        })
        .indexOf(this.currentUser);
      if (pos !== -1) {
        this.postLikes.splice(pos, 1);
      }
    } else {
      let newLike = {
        id: "123",
        postId: this.postId,
        user: this.currentUser,
      };
      this.postLikes.push(newLike);
    }
    this.postLikes = this.postLikes.sort((a, b) =>
      a.user > b.user ? 1 : b.user > a.user ? -1 : 0
    );
    this.getLikesTitle();
  };

  getProfilePic(user) {
    return this.movServ.getProfilePic(user);
  }
}
