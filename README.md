# Udacity FEND Project 6-1 - Neighborhood Map Project

## Overview

This project provides the user with the locations and information about businesses close to Binghamton University in New York, USA.

The project can be accessed at `https://jscott10.github.io/UdacityProject6-1/dist/`

## Usage

Loading the project will present a Google map centered on Binghamton University in New York, USA.

Click the `Locations` button in the left side of the title bar to open the Search Locations panel. The Search Locations panel contains a weather information banner (Binghamton, NY local weather provided by Yahoo!), a drop-down menu of Location Types and a List Filter text box. If a Location Type is selected, a list of found locations appears below the List Filter.

To display locations, select a Location type from the drop-downFrom the Search Locations panel you can select a list of Google Location Types to display. When you select a Location Type a list of found locations will appear and corresponding markers will drop onto the map display. If you have previously visited the page, your last selected Location Type is automatically be selected.

To filter the list, enter a search string into the List Filter box. The list found locations and map markers will automatically reflect the filter you enter displaying only the items that contain the string entered into the filter box.

To view additional information about a location either click on the item in the list or click on the map marker. The map marker will turn green and bounce briefly to indicate it has been selected. An pop-up window will appear that contains the following information:

* From Google Place Details:
 * Name of location
 * Associated photo (if available)
 * Formatted Address
 * Formatted Phone number
 * Up to four Google reviews sorted newest to oldest (if available)
* From Foursquare:
 * Up to four Foursquare Tips, sorted newest to oldest (if the location is found on Foursquare and tips are available).

### To build the project

The project uses the following directory structure:

```
src\
    css\
    img\
    js\

dist\
    css\
    img\
    js\
```

All code and images are minified and served from the `dist\` folder. The css file is created using the Sass css preprocessor.

Grunt is used to automate the build process. To configure the Grunt environment you need the following packages:

```
grunt-contrib-watch
grunt-contrib-imagemin
grunt-contrib-uglify
grunt-contrib-sass
grunt-contrib-htmlmin
grunt-pagespeed
```

Running the grunt-contrib-watch process will run imagemin, uglify, sass or htmlmin when a file is change.
