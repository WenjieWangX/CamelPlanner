const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const axios = require("axios");
const qs = require("qs");
const cherrio = require("cheerio");
var unirest = require("unirest");

const http = require("http");
const helmet = require("helmet");
const compression = require("compression");
const config = require("./config");
const { param } = require("jquery");

const { port, allowedDomains } = config;
app.use(cors({ origin: allowedDomains }));

app.use(helmet());
app.use(compression());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.use(cors());
app.use(express.json());

//Connect database
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  port: "3306",
  password: "password",
  database: "userSystem",
});

// const db = mysql.createConnection({
//   user: "wenjiedi_root",
//   host: "localhost",
//   port: "3306",
//   password: "zukqef-jEkhuh-fuhfo1",
//   database: "wenjiedi_cc_academic_planner_db",
// });

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// const getClasses = async () => {
//   try {
//     var req = unirest(
//       "POST",
//       "https://ssbprod.conncoll.edu/CONN/bwckschd.p_get_crse_unsec"
//     );

//     req.headers({
//       "postman-token": "337bcee7-1084-4fde-fc47-f79dd5b0acb5",
//       "cache-control": "no-cache",
//       "content-type": "application/x-www-form-urlencoded",
//     });

//     req.form({
//       term_in: "202290",
//       begin_ap: "a",
//       begin_hh: "0",
//       begin_mi: "0",
//       end_ap: "a",
//       end_hh: "0",
//       end_mi: "0",
//       sel_attr: ["dummy", "%"],
//       sel_camp: "dummy",
//       sel_crse: "",
//       sel_day: "dummy",
//       sel_from_cred: "",
//       sel_insm: "dummy",
//       sel_instr: ["dummy", "%"],
//       sel_levl: "dummy",
//       sel_ptrm: "dummy",
//       sel_schd: "dummy",
//       sel_sess: "dummy",
//       sel_subj: [
//         "dummy",
//         "ACC",
//         "AFR",
//         "ASL",
//         "AMS",
//         "ANT",
//         "ARA",
//         "ARC",
//         "ART",
//         "AHI",
//         "AT",
//         "AST",
//         "BIO",
//         "BOT",
//         "CHM",
//         "CHI",
//         "CLA",
//         "COM",
//         "CRE",
//         "DAN",
//         "EAS",
//         "ECO",
//         "EDU",
//         "ENG",
//         "ES",
//         "FLM",
//         "FYS",
//         "FRH",
//         "GWS",
//         "GEO",
//         "GER",
//         "GIS",
//         "GOV",
//         "GRK",
//         "HBR",
//         "SPA",
//         "HIS",
//         "HMD",
//         "IS",
//         "CRT",
//         "DAT",
//         "ENT",
//         "FDP",
//         "GC",
//         "MRC",
//         "PAX",
//         "PKP",
//         "PBH",
//         "SJS",
//         "ITL",
//         "JPN",
//         "JS",
//         "LAT",
//         "LA",
//         "LIN",
//         "MAT",
//         "MSM",
//         "MUS",
//         "NEU",
//         "PHI",
//         "PHE",
//         "PHY",
//         "PSY",
//         "RUS",
//         "SLA",
//         "SOC",
//         "STA",
//         "THE",
//       ],
//       sel_title: "",
//       sel_to_cred: "",
//     });

//     req.end(function (res) {
//       if (res.error) throw new Error(res.error);

//       console.log(res.body);
//     });
//   } catch (err) {
//     return err;
//   }
// };

// get every courses in conncoll with name, credits, and subjectcode+number
app.get("/connCourses", async (req, res) => {
  // const url =
  //   "http://smartcatalog.co/apis/customcourseapi?path=/sitecore/content/Catalogs/Connecticut-College/2020-2021/Catalog";
  // let result = {};
  // await axios(url).then((res) => {
  //   const html_data = res.data;
  //   const $ = cherrio.load(html_data);
  //   // $("courses").map((i, ele) => {
  //   //   console.log($(ele).find("creditHoursMinimum").text());
  //   //   console.log($(ele).find("courseName").text());
  //   // });

  //   $("courses").each(function () {
  //     let credits = $(this).find("creditHoursMinimum");
  //     let coursesName = $(this).find("courseName");
  //     let coursesNumber = $(this).find("courseNumber");
  //     let subjectsCode = $(this).find("subjectCode");
  //     for (let i = 0; i < credits.length; i++) {
  //       let courseInit = $(subjectsCode[i]).text() + $(coursesNumber[i]).text();
  //       result[`${courseInit}`] = {
  //         courseName: $(coursesName[i]).text(),
  //         courseInit: courseInit,
  //         credit: $(credits[i]).text(),
  //       };
  //     }
  //   });
  // });
  // fs.writeFile("connCourses.json", JSON.stringify(result), (err) => {
  //   if (err) throw err;
  //   console.log("data written to file");
  // });
  fs.readFile("connCourses.json", "utf8", (err, data) => {
    res.send(data);
  });
});
//get the courses from json
app.get("/courses", async (req, res) => {
  fs.readFile("classes2.json", "utf8", (err, data) => {
    res.send(data);
  });
});

// app.get("/testCourses", async (req, res) => {
//   const classes = await getClasses();
//   res.send(classes);
// });

// get user information
app.get("/user", (req, res) => {
  const name = req.query.name;
  db.query("SELECT * FROM users WHERE name = ?", [name], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//get user courses that is on calendar
app.get("/usercourses", (req, res) => {
  const userId = req.query.id;
  db.query(
    "SELECT id, courseInit, CRN FROM userCourses WHERE userId = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//get user majors and advisors
app.get("/advisors", (req, res) => {
  const userId = req.query.id;
  db.query(
    "SELECT * FROM advisor WHERE userId = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// get a list of completed courses
app.get("/takenCourses", (req, res) => {
  const userId = req.query.id;
  db.query(
    "SELECT id, course, status FROM takenCourse WHERE userId = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// create a first time user to our users database
app.post("/addUser", (req, res) => {
  const name = req.body.name;
  const status = req.body.status;
  db.query(
    "INSERT INTO users (name, status) VALUES (?,?)",
    [name, status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// add course to a calendar
app.post("/add", (req, res) => {
  const userId = req.body.userId;
  const courseInit = req.body.courseInit;
  const CRN = req.body.CRN;

  db.query(
    "INSERT INTO userCourses (userId, courseInit, CRN) VALUES (?,?,?)",
    [userId, courseInit, CRN],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addUserMajorAdvisor", (req, res) => {
  const userId = req.body.userId;
  const major = req.body.major;
  const advisor = req.body.advisor;

  let params = [];
  for (let i = 0; i < major.length; i++) {
    params.push([userId, advisor[i].value, major[i].major]);
  }

  db.query(
    "INSERT INTO advisor (userId, advisor, major) VALUES ?",
    [params],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addUserCourse", (req, res) => {
  const userId = req.body.userId;
  const courses = req.body.courses;
  const status = req.body.status;

  let params = [];
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i].split(":")[0];
    params.push([userId, course, status]);
  }

  db.query(
    "INSERT INTO takenCourse (userId, course, status) VALUES ?",
    [params],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// delete a course from the course on calendar
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM userCourses WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//delete major
app.delete("/deleteMajor/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM advisor WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//update collect user information status
app.put("/updateUserStatus/:id", (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  let sql = "UPDATE users SET status = ? WHERE (id = ?)";
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//update collect user information status
app.put("/updateCourseStatus/:id", (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  let sql = "UPDATE takenCourse SET status = ? WHERE (id = ?)";
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//update collect user information status
app.put("/updateAdvisor/:id", (req, res) => {
  const id = req.params.id;
  const advisor = req.body.advisor;
  let sql = "UPDATE advisor SET advisor = ? WHERE (id = ?)";
  db.query(sql, [advisor, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
