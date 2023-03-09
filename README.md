<h1 align="center">Voter Registration Project Abstract</h1>

<br />

The goal of our project is to create an improved voter registration DBMS that will help simplify and streamline the voting process for everyone. While modern-day voter registration database management systems are efficient and get the job done, they lack many features which would increase the usability of these systems such as providing meaningful information about election candidates and the policies that they support. Our newly proposed voter registration DBMS will allow citizens to easily sign themselves up to vote, view all potential candidates as well as their stances on controversial topics, favorite candidates they would like to view again later, and keep track of ongoing elections. Our group’s motivation for choosing this project is to expand and build on the capabilities of modern-day voter registration database management systems because of their significance and the large scale impact that voting as a whole has on our daily lives.

<br />

We plan to build a database that consists of six major tables that will help describe and show all the necessary relations required for an effective voter registration DBMS. The six tables being: <ins>**a voter table**</ins> (voter ID, first name, last name, SSN, birthday, email, phone, party ID, favorites, district, and state), <ins>**a candidate table**</ins> (candidate ID, first name, last name, SSN, birthday, email, phone, party ID, district, state, current office, opinion, and next election ID), <ins>**an election table**</ins> (election ID, office, date, and ballot), <ins>**a ballot table**</ins> (election ID, candidates, and votes), <ins>**an opinion table**</ins> (candidate ID, abortion, guns, immigration, lgbt, environment, etc.), and <ins>**a party table**</ins> (party ID, party name, and members).
  
<br />

<h1 align="center">Arrogant Goats Team Roles</h1>

<br />

<ins>**Team Leader:**</ins> Katherine Perez

<br />

<ins>**Frontend Developers:**</ins> Adam Elkhanoufi, Gabriel Medina, and Kendall Comeaux

<br />

<ins>**Backend Developers:**</ins> Abdel Rahman Mansour, George Adler Buras, and John Hudnall

<br /><br />

<h1 align="center">Technologies</h1>

<p align="center">
  <img src="https://user-images.githubusercontent.com/65471490/219513432-924c9cf4-a67f-40bc-9b51-04a1fe1713dc.png" width="240" height="150">
  &nbsp;
  &nbsp;
  <img src="https://user-images.githubusercontent.com/65471490/219519776-879c778e-186a-4f60-9786-ee8e40ea0040.png" width="167" height="150">
  <img src="https://user-images.githubusercontent.com/65471490/219512690-7bceb9de-c84b-47a2-b1fa-2ec8f78412c9.png" width="240" height="150">
  <br></br>
  <img src="https://user-images.githubusercontent.com/103407697/220855537-2f005080-964e-4c31-b451-b84f37c85a38.png" width="340" height="70">
</p>


<br />

<h1 align="center">Launch Project</h1>

<br />

1) You have to download node.js, so that you can launch the projects and use a command called npm: you can find the download link here: https://nodejs.org/en/download/

2) You then download visual studio code and on the left bar there's this tab called extensions, download npm from there, you can find visual studio code here: https://code.visualstudio.com/download

3) Then either by directly downloading the code or using github desktop, you pull the repository onto your computer

4) Once you have visual studio code and npm downloaded, you then want to open the project folder in vs code

5) You should now have all the code available on visual studio code, you then want to open the sql-relational-databse folder which has the sql query that you need to populate the initial database, you just copy paste that into MySQL and run it

6) Before we actually launch the app, we have to initialize the code to interface with your local MySQL databse, open the "node-rest-api" folder then open the "src" folder, within "src" there should be a file called "database-connection.js", the only thing you need to change in that file is on line 7 put the password for your MySQL, you might have to do that every time you pull from GitHub because we'll probably overwrite each other's changes

7) You then want to open two terminals within vs code, just right click on the node-rest-api folder and click on "Open in integrated terminal" and do the same thing for the react-website-design folder

8) Starting with the node-rest-api terminal, you want to type in "npm install" which will download all the required dependencies for the project which are specified in the package.json and package-lock.json, then type in "npm start" which should start the server for you on port 8080

9) Then for the react-website-design terminal, you want to also type in "npm install" and "npm start", but for this one the react app will launch in your browser on port 3000

10) Everything should be set up now and you should be able to start coding and see the changes in real time