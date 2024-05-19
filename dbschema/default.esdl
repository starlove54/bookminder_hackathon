module default {
type Users {
      required email: str ;
      required username: str;
      required password: str;
      fname:str;
      lname:str;
      img:str;
}

type Stories {
    required title: str;
    multi characters: Characters;
    multi storypoints:Storypoints;
}

type Characters {
      required title:str;
      description:str;
}

type Storypoints {
      required title:str;
      description:str;
}
}
