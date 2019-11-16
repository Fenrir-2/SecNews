# SEC'NEWS Project

---

A small, scalable IT-Sec threat intel web application

> A cyber security news platform designed to be displayed on multiple screens in a school entrance
> also providing a web facing service on which users can subscribe to one or more categories

# Roadmap

## Front End

- [ ]  Website blueprint (HTML)
- [ ]  Responsive (HTML, CSS, JS)
- [ ]  Data display (JS)
- [ ]  Good looking and lightweight (CSS)

## Back End

- [x]  Data fetching (PHP)
- [ ]  Agregation (PHP)
- [x]  Organisation and storage (PHP, MariaDB)
- [ ]  Pre-display processing (PHP)

## Integration

- [ ]  Communication between front and back
- [ ]  Debugging and adjusting


Back-end

At the moment the Back end is handled through several scripts.

the go_db manages the Database, which relies on mysql. We chose mariadb as a RDBMS (mostly since open source and easy to use and to install with the LAMP stack ) and you might see the name in the comments, feel free to use what you find convenient, as long as it uses mysql.
It handles the users tables
 
the feeds_reader will reed the RSS streams to fetch the datas we need, mostly refreshing the RSS streams periodically and storing the articles we don't have while sorting them by categories.

The other script will hold the other functionnalities, as such reponsing to the client side asking for infos and calling the other functions located in the other scripts.

The sources we took in feeds.txt are totally subjectives, we do not endorse any of the sources or whatever they can post. They are just chosen for the quality we found in what has been posted when we checked, and is merely our opinion.

