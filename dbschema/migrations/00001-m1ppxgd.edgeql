CREATE MIGRATION m1ppxgd2mrjx7rklv64rr2hxhbpkoq5sq2qbkfsvjf2i5o4mwjg2rq
    ONTO initial
{
  CREATE TYPE default::Characters {
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
  };
  CREATE TYPE default::Storypoints {
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
  };
  CREATE TYPE default::Stories {
      CREATE MULTI LINK characters: default::Characters;
      CREATE MULTI LINK storypoints: default::Storypoints;
      CREATE REQUIRED PROPERTY title: std::str;
  };
  CREATE TYPE default::Users {
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE PROPERTY fname: std::str;
      CREATE PROPERTY img: std::str;
      CREATE PROPERTY lname: std::str;
      CREATE REQUIRED PROPERTY password: std::str;
      CREATE REQUIRED PROPERTY username: std::str;
  };
};
