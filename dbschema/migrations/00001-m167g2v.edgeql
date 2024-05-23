CREATE MIGRATION m167g2vtz5q6gjp6tndcwaewi5x5gigot57azb6ukgi3ksqfh5bokq
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
  CREATE TYPE default::Users {
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE PROPERTY fname: std::str;
      CREATE PROPERTY img: std::str;
      CREATE PROPERTY lname: std::str;
      CREATE REQUIRED PROPERTY password: std::str;
      CREATE REQUIRED PROPERTY username: std::str;
  };
  CREATE TYPE default::Stories {
      CREATE MULTI LINK characters: default::Characters;
      CREATE MULTI LINK storypoints: default::Storypoints;
      CREATE REQUIRED LINK user: default::Users;
      CREATE REQUIRED PROPERTY title: std::str;
  };
  CREATE TYPE default::UserBooks {
      CREATE REQUIRED PROPERTY storyId: std::str;
      CREATE REQUIRED PROPERTY userId: std::str;
  };
};
