import { Component, Input, OnInit } from "@angular/core";
import { Like, Comment, MovinstagramService } from "../movinstagram.service";

@Component({
  selector: "app-post",
  templateUrl: "../post/post.component.html",
  styleUrls: ["../post/post.component.css"],
})
export class PostComponent implements OnInit {
  @Input() likes: Like[];
  @Input() comments: Comment[];
  @Input() title: string;
  @Input() user: string;
  @Input() picture: string;
  @Input() postId: string;
  @Input() currentUser: string;

  likesExb: String;
  likesAposInput: Like[];
  constructor(private movServ: MovinstagramService) {}

  ngOnInit(): void {
    this.getLikesTitle();
  }

  isLiked = () => {
    if (this.likes.find((like) => like.user == this.currentUser)) return true;
  };

  clickLike = () => {
    if (this.isLiked()) {
      let pos = this.likes
        .map(function (e) {
          return e.user;
        })
        .indexOf(this.currentUser);

      this.likes.splice(pos, 1);
      this.likesAposInput = this.likes.sort();
    }
    this.getLikesTitle();
  };

  /*
  checkLiked() {
    let activeUser = this.currentUser;
    if (this.likes.find((like) => like.user == activeUser)) {
      this.isLiked = true;
    } else {
      this.isLiked = false;
    }
    return this.isLiked;
  }
  /*
  like() {
    let like: Like = {
      id: "teste",
      user: this.currentUser,
      postId: this.postId,
    };

    if (!this.checkLiked("batman")) {
      console.log("Batman curtiu");
    } else {
      console.log("batman não curtiu");
    }
  }
*/
  getProfilePic(user) {
    return this.movServ.getProfilePic(user);
  }

  getLikesTitle = () => {
    this.likesAposInput = this.likes;
    if (this.likesExb) {
      this.likesExb = "";
    }
    let likesUsers = [];
    for (let like of this.likesAposInput) {
      likesUsers.push(like.user);
    }
    likesUsers.sort();
    this.likesExb = likesUsers.join("\n");
  };
}
